import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({
  apiKey: process.env.CLAUDE_API_KEY,
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { messages } = body;

    const response = await client.messages.create({
      model: "claude-3-5-sonnet-20241022",
      max_tokens: 1024,
      messages: messages,
    });

    return Response.json({
      content: response.content[0].type === "text" ? response.content[0].text : "",
    });
  } catch (error) {
    console.error("Chat API error:", error);
    return Response.json(
      { error: "Failed to process request" },
      { status: 500 }
    );
  }
}
