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

// Using a type for the event helps with clarity. The body is a string that needs to be parsed.
interface NetlifyEvent {
    body: string;
    // Fix: Add httpMethod to the NetlifyEvent type to match Netlify's function event shape.
    httpMethod: string;
}

export const handler = async (event: NetlifyEvent) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  if (!process.env.API_KEY) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Server configuration error. Could not connect to the AI service." }),
    };
  }
  
  try {
    const { prompt } = JSON.parse(event.body);
    if (!prompt) {
        return { statusCode: 400, body: JSON.stringify({ error: "Prompt is required." }) };
    }

    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        // Fix: Simplified contents to be a direct string as per Gemini API guidelines for single text prompts.
        contents: prompt,
        config: {
            systemInstruction: componentGeneratorSystemInstruction,
            temperature: 0.2,
        }
    });

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code: response.text }),
    };
  } catch (error: any) {
    console.error("Error in generate-component function:", error);
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: "Failed to generate component.", details: error.message }),
    };
  }
};