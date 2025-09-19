import { GoogleGenAI } from "@google/genai";

type Framework = 'react' | 'vue' | 'svelte' | 'html';

const systemInstructions: Record<Framework, string> = {
  react: `You are an expert React and Tailwind CSS developer. Your task is to generate the TSX for a single, self-contained React functional component.
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
};`,
  vue: `You are an expert Vue and Tailwind CSS developer. Your task is to generate the code for a single, self-contained Vue 3 Single File Component (SFC) using the Composition API (<script setup>).
The code should use TypeScript.
Do not add any explanation or comments.
Just provide the raw SFC code, starting with '<template>'.
The component should be functional and aesthetically pleasing.`,
  svelte: `You are an expert Svelte and Tailwind CSS developer. Your task is to generate the code for a single, self-contained Svelte component.
The code should use a <script lang="ts"> block for any logic.
Do not add any explanation or comments.
Just provide the raw .svelte file code.
The component should be functional and aesthetically pleasing.`,
  html: `You are an expert HTML and Tailwind CSS developer. Your task is to generate a single, self-contained HTML snippet.
The code should only contain HTML elements with Tailwind CSS classes.
Do not include <!DOCTYPE>, <html>, <head>, or <body> tags.
Do not include any <script> or <style> tags unless absolutely necessary for the component's interactivity (like a simple dropdown).
Just provide the raw HTML code. The component should be functional and aesthetically pleasing.`,
};

interface RequestBody {
    prompt: string;
    framework: Framework;
}

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
    const { prompt, framework } = (await req.json()) as RequestBody;
    if (!prompt) {
        return new Response(JSON.stringify({ error: "Prompt is required." }), { 
            status: 400,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    const systemInstruction = systemInstructions[framework] || systemInstructions.react;
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    const responseStream = await ai.models.generateContentStream({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
            systemInstruction: systemInstruction,
            temperature: 0.2,
        }
    });

    const stream = new ReadableStream({
      async start(controller) {
        const encoder = new TextEncoder();
        for await (const chunk of responseStream) {
          const text = chunk.text;
          if (text) {
            controller.enqueue(encoder.encode(text));
          }
        }
        controller.close();
      },
    });

    return new Response(stream, {
      status: 200,
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'X-Content-Type-Options': 'nosniff',
      },
    });

  } catch (error: any) {
    console.error("Error in generate-component function:", error);
    return new Response(JSON.stringify({ error: "Failed to generate component.", details: error.message }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
    });
  }
};