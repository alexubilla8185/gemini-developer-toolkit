
import { GoogleGenAI, Type } from "@google/genai";
import type { RegexResponse } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const componentGeneratorSystemInstruction = `You are an expert React and Tailwind CSS developer. Your task is to generate the TSX for a single, self-contained React functional component.
The code should use TypeScript and Tailwind CSS. The component MUST be named 'GeneratedComponent'.
Do not add any explanation, comments, imports, or 'export default'.
Just provide the raw component code, starting with 'const GeneratedComponent ...'.
The component should be functional and aesthetically pleasing, ready to be rendered.
Ensure all HTML tags are properly closed.
For example, if asked for a login form, you should return:
const GeneratedComponent = () => {
  return (
    <div className="p-4 bg-white rounded shadow-md">
      <h2 className="text-xl font-bold mb-4">Login</h2>
      <input type="email" placeholder="Email" className="w-full p-2 mb-2 border rounded" />
      <input type="password" placeholder="Password" className="w-full p-2 mb-2 border rounded" />
      <button className="w-full bg-blue-500 text-white p-2 rounded">Log In</button>
    </div>
  );
};
`;

const regexResponseSchema = {
    type: Type.OBJECT,
    properties: {
        pattern: {
            type: Type.STRING,
            description: "The generated regular expression pattern as a string.",
        },
        explanation: {
            type: Type.STRING,
            description: "A step-by-step explanation of how the regular expression works, formatted for clarity.",
        },
    },
    required: ["pattern", "explanation"],
};

export const generateComponent = async (prompt: string): Promise<string> => {
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: { parts: [{ text: prompt }] },
            config: {
                systemInstruction: componentGeneratorSystemInstruction,
                temperature: 0.2,
            }
        });
        return response.text;
    } catch (error) {
        console.error("Error generating component:", error);
        throw new Error("Failed to generate component. Please check your API key and network connection.");
    }
};

export const generateRegex = async (prompt: string): Promise<RegexResponse> => {
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: { parts: [{ text: `Generate a regular expression for this description: "${prompt}"` }] },
            config: {
                responseMimeType: "application/json",
                responseSchema: regexResponseSchema,
            }
        });
        
        const jsonText = response.text.trim();
        const parsedResponse = JSON.parse(jsonText);

        if (typeof parsedResponse.pattern === 'string' && typeof parsedResponse.explanation === 'string') {
            return parsedResponse;
        } else {
            throw new Error("Invalid response format from API.");
        }

    } catch (error) {
        console.error("Error generating regex:", error);
        if (error instanceof SyntaxError) {
             throw new Error("Failed to parse the response from the AI. The format was unexpected.");
        }
        throw new Error("Failed to generate regex. Please check your API key and network connection.");
    }
};