import Anthropic from "@anthropic-ai/sdk";

export async function POST(req) {
    const { prompt } = await req.json();

    const client = new Anthropic(); // reads ANTHROPIC_API_KEY from .env automatically

    const message = await client.messages.create({
        model: "claude-sonnet-4-20250514",
        max_tokens: 1024,
        messages: [{ role: "user", content: prompt }],
    });

    const raw = message.content.find((b) => b.type === "text")?.text ?? "";
    const clean = raw.replace(/```json|```/g, "").trim();
    const parsed = JSON.parse(clean);

    return Response.json(parsed);
}