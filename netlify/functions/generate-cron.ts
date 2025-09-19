import { GoogleGenAI, Type } from "@google/genai";

const cronResponseSchema = {
    type: Type.OBJECT,
    properties: {
        cronString: {
            type: Type.STRING,
            description: "The generated cron expression string, e.g., '*/5 * * * *'.",
        },
        explanation: {
            type: Type.STRING,
            description: "A step-by-step explanation of what the cron expression means and when it will run.",
        },
    },
    required: ["cronString", "explanation"],
};

export default async (req: Request) => {
  if (req.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 });
  }

  if (!process.env.API_KEY) {
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

    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: `Generate a standard 5-field cron expression for this description: "${prompt}"`,
        config: {
            responseMimeType: "application/json",
            responseSchema: cronResponseSchema,
            temperature: 0.1,
        }
    });
    
    return new Response(response.text, {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error: any) {
    console.error("Error in generate-cron function:", error);
    return new Response(JSON.stringify({ error: "Failed to generate cron expression.", details: error.message }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
    });
  }
};