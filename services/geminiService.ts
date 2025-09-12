import type { RegexResponse } from '../types';

export const generateComponent = async (
    prompt: string,
    onChunk: (chunk: string) => void
): Promise<void> => {
    try {
        const response = await fetch('/.netlify/functions/generate-component', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ prompt }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Failed to generate component from server.');
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
        throw new Error("Failed to generate component. Please check your network connection.");
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