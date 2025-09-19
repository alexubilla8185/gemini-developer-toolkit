import type { RegexResponse, Framework, CronResponse } from '../types';

export const generateComponent = async (
    prompt: string,
    framework: Framework,
    onChunk: (chunk: string) => void
): Promise<void> => {
    try {
        const response = await fetch('/.netlify/functions/generate-component', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ prompt, framework }),
        });

        if (!response.ok) {
            const errorText = await response.text();
            let errorMessage = `Server responded with status ${response.status}`;
            try {
                // Try to parse as JSON for structured errors from our function
                const errorJson = JSON.parse(errorText);
                errorMessage = errorJson.error || errorMessage;
            } catch (e) {
                // If parsing fails, it's likely an HTML error page (e.g., from Netlify)
                errorMessage = `Failed to generate component. The server returned an unexpected response.`;
                console.error("Non-JSON response from server:", errorText);
            }
            throw new Error(errorMessage);
        }

        if (!response.body) {
            throw new Error("Response body is empty.");
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder();

        while (true) {
            const { done, value } = await reader.read();
            if (done) {
                break;
            }
            onChunk(decoder.decode(value, { stream: true }));
        }

    } catch (error) {
        console.error("Error calling generate-component function:", error);
        throw error; // Re-throw the original or newly constructed error
    }
};

export const generateRegex = async (prompt: string): Promise<RegexResponse> => {
    try {
        const response = await fetch('/.netlify/functions/generate-regex', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ prompt }),
        });
        
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Failed to generate regex from server.');
        }
        
        if (typeof data.pattern === 'string' && typeof data.explanation === 'string') {
            return data;
        } else {
            throw new Error("Invalid response format from server.");
        }
    } catch (error) {
        console.error("Error calling generate-regex function:", error);
        if (error instanceof SyntaxError) {
             throw new Error("Failed to parse the response from the server. The format was unexpected.");
        }
        throw new Error("Failed to generate regex. Please check your network connection.");
    }
};

export const generateCron = async (prompt: string): Promise<CronResponse> => {
    try {
        const response = await fetch('/.netlify/functions/generate-cron', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ prompt }),
        });
        
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Failed to generate cron from server.');
        }
        
        if (typeof data.cronString === 'string' && typeof data.explanation === 'string') {
            return data;
        } else {
            throw new Error("Invalid response format from server.");
        }
    } catch (error) {
        console.error("Error calling generate-cron function:", error);
        if (error instanceof SyntaxError) {
             throw new Error("Failed to parse the response from the server. The format was unexpected.");
        }
        throw new Error("Failed to generate cron expression. Please check your network connection.");
    }
};