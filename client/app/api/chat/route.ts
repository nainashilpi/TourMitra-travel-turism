import { NextRequest, NextResponse } from "next/server";
import { getChatResponse } from "@/lib/gemini";
import { Message } from "@/types/chat";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { messages } = body as { messages: Message[] };

    console.log("📩 Received messages:", messages.length);
    console.log("🔑 API Key exists:", !!process.env.GEMINI_API_KEY);

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: "Messages array is required" },
        { status: 400 }
      );
    }

    if (!process.env.GEMINI_API_KEY) {
      console.error("❌ GEMINI_API_KEY is not set!");
      return NextResponse.json(
        { error: "API key not configured" },
        { status: 500 }
      );
    }

    // Get simple response (non-streaming for testing)
    const response = await getChatResponse(messages);
    
    console.log("✅ Got response:", response.substring(0, 50) + "...");

    return NextResponse.json({ message: response });

  } catch (error) {
    console.error("❌ Chat API Error:", error);
    
    const errorMessage = error instanceof Error ? error.message : "Internal server error";
    console.error("Error message:", errorMessage);
    
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}