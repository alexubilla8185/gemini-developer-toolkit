import { GoogleGenAI } from "@google/genai";

const siteAuditorSystemInstruction = `You are a world-class web performance and SEO expert. I will provide you with a JSON object from a Google Lighthouse audit. Your task is to analyze it and return a user-friendly summary. Focus on the most critical issues in Performance, Accessibility, and SEO. For each issue, provide a simple explanation of why it matters and a concise, actionable recommendation to fix it. Present the output in a clean, well-structured format using markdown-like headers (e.g., ### Performance Score) but no code blocks. Be concise and prioritize the most impactful changes.`;

export default async (req: Request) => {
    if (req.method !== 'POST') {
        return new Response(JSON.stringify({ error: 'Method Not Allowed' }), { status: 405, headers: { 'Content-Type': 'application/json' } });
    }

    try {
        const { url } = await req.json();
        if (!url) {
            return new Response(JSON.stringify({ error: 'URL is required' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
        }

        const pagespeedApiKey = process.env.PAGESPEED_API_KEY;
        const geminiApiKey = process.env.API_KEY;

        if (!pagespeedApiKey || !geminiApiKey) {
            console.error("API keys are not configured on the server.");
            return new Response(JSON.stringify({ error: 'Server configuration error.' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
        }

        // Step 1: Call PageSpeed Insights API
        const apiEndpoint = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(url)}&key=${pagespeedApiKey}&category=PERFORMANCE&category=ACCESSIBILITY&category=SEO&strategy=MOBILE`;
        const pagespeedResponse = await fetch(apiEndpoint);
        
        if (!pagespeedResponse.ok) {
            const errorData = await pagespeedResponse.json();
            console.error("PageSpeed API Error:", errorData);
            const errorMessage = errorData?.error?.message || 'Failed to fetch audit data from Google PageSpeed.';
            return new Response(JSON.stringify({ error: errorMessage }), { status: pagespeedResponse.status, headers: { 'Content-Type': 'application/json' } });
        }
        
        const pagespeedData = await pagespeedResponse.json();
        const lighthouseResult = pagespeedData.lighthouseResult;

        // Step 2: Send Lighthouse result to Gemini for analysis
        const ai = new GoogleGenAI({ apiKey: geminiApiKey });
        const geminiResponse = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: `Analyze this Lighthouse JSON for ${url}: ${JSON.stringify(lighthouseResult)}`,
            config: {
                systemInstruction: siteAuditorSystemInstruction,
                temperature: 0.3,
            }
        });

        // Step 3: Return Gemini's summary to the frontend
        return new Response(JSON.stringify({ summary: geminiResponse.text }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });

    } catch (error: any) {
        console.error("Internal Server Error:", error);
        return new Response(JSON.stringify({ error: 'An internal error occurred while processing the audit.' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
    }
};
