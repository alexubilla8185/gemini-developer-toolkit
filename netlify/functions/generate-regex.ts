import { GoogleGenAI, Type } from "@google/genai";

// FIX: Removed 'declare global' for Netlify to resolve "Cannot redeclare block-scoped variable" error.
// Netlify function environment variables are also available on process.env.

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

export default async (req: Request) => {
  if (req.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 });
  }
  
  // FIX: Switched from Netlify.env.get("API_KEY") to process.env.API_KEY.
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    return new Response(JSON.stringify({ error: "Server configuration error. Could not connect to the AI service." }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const { prompt } = await req.json();
    if (!prompt) {
        return new Response(JSON.stringify({ error: "Prompt is required." }), { 
            status: 400,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: `Generate a regular expression for this description: "${prompt}"`,
        config: {
            responseMimeType: "application/json",
            responseSchema: regexResponseSchema,
        }
    });
    
    return new Response(response.text, {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error: any) {
    console.error("Error in generate-regex function:", error);
    return new Response(JSON.stringify({ error: "Failed to generate regex.", details: error.message }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
    });
  }
};