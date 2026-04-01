import { NextRequest, NextResponse } from "next/server";
import { getChatResponseStream } from "@/lib/gemini";
import { Message } from "@/types/chat";

export async function POST(req: NextRequest) {
  try {
    // ✅ Log environment variables
    console.log("🔍 API Route Environment Check:");
    console.log("- GEMINI_API_KEY exists:", !!process.env.GEMINI_API_KEY);
    console.log("- GEMINI_API_KEY length:", process.env.GEMINI_API_KEY?.length || 0);
    console.log("- Node ENV:", process.env.NODE_ENV);
    
    const body = await req.json();
    const { messages } = body as { messages: Message[] };

    console.log("📩 Received messages:", messages.length);

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: "Messages array is required" },
        { status: 400 }
      );
    }

    if (!process.env.GEMINI_API_KEY) {
      console.error("❌ GEMINI_API_KEY is not set in environment!");
      console.error("Available env vars:", Object.keys(process.env).filter(k => k.includes('GEM')));
      
      return NextResponse.json(
        { error: "API key not configured. Please add GEMINI_API_KEY to environment variables." },
        { status: 500 }
      );
    }

    // Get streaming response
    const stream = await getChatResponseStream(messages);

    // Create a ReadableStream for the response
    const encoder = new TextEncoder();
    const readableStream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of stream) {
            const text = chunk.text();
            controller.enqueue(encoder.encode(text));
          }
          controller.close();
        } catch (error) {
          console.error("❌ Stream error:", error);
          controller.error(error);
        }
      },
    });

    return new Response(readableStream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Transfer-Encoding": "chunked",
      },
    });
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