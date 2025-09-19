import { GoogleGenAI } from "@google/genai";

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

// This interface is for the incoming request from the Netlify frontend.
interface RequestBody {
    prompt: string;
}

// Netlify's modern handler for streaming responses uses Request and Response objects.
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
    const { prompt } = (await req.json()) as RequestBody;
    if (!prompt) {
        return new Response(JSON.stringify({ error: "Prompt is required." }), { 
            status: 400,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    // Use the streaming model
    const responseStream = await ai.models.generateContentStream({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
            systemInstruction: componentGeneratorSystemInstruction,
            temperature: 0.2,
        }
    });

    // Create a new stream to pipe the results to the client
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
