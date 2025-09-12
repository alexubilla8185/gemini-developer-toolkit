import type { RegexResponse } from '../types';

export const generateComponent = async (prompt: string): Promise<string> => {
    try {
        const response = await fetch('/.netlify/functions/generate-component', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ prompt }),
        });

        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.error || 'Failed to generate component from server.');
        }

        return data.code;
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
