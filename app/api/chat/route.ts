import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({
  apiKey: process.env.CLAUDE_API_KEY,
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { message, systemPrompt, conversationHistory } = body;

    if (!message || !systemPrompt) {
      return Response.json(
        { error: "Missing required fields: message and systemPrompt" },
        { status: 400 }
      );
    }

    // Build messages array from conversation history
    const messages: Array<{ role: "user" | "assistant"; content: string }> = [];

    if (conversationHistory && Array.isArray(conversationHistory)) {
      for (const msg of conversationHistory) {
        if (msg.role === "user" || msg.role === "assistant") {
          messages.push({
            role: msg.role as "user" | "assistant",
            content: msg.content,
          });
        }
      }
    }

    // Add the current message
    messages.push({
      role: "user",
      content: message,
    });

    const response = await client.messages.create({
      model: "claude-3-5-sonnet-latest",
      max_tokens: 1024,
      system: systemPrompt,
      messages: messages,
    });

    return Response.json({
      response: response.content[0].type === "text" ? response.content[0].text : "",
    });
  } catch (error) {
    console.error("Chat API error:", error);
    return Response.json(
      { error: "Failed to process request" },
      { status: 500 }
    );
  }
}
