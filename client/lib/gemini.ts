import { GoogleGenerativeAI } from "@google/generative-ai";
import { Message } from "@/types/chat";

// ✅ Check for API key with detailed logging
const API_KEY = process.env.GEMINI_API_KEY;

console.log("🔑 Checking Gemini API Key...");
console.log("API Key exists:", !!API_KEY);
console.log("API Key length:", API_KEY?.length || 0);
console.log("API Key starts with 'AIza':", API_KEY?.startsWith("AIza") || false);

if (!API_KEY) {
  console.error("❌ GEMINI_API_KEY environment variable is not set!");
  console.error("Available env vars:", Object.keys(process.env).filter(k => k.includes('GEMINI')));
}

const genAI = new GoogleGenerativeAI(API_KEY || "");

export async function getChatResponse(messages: Message[]): Promise<string> {
  try {
    if (!API_KEY) {
      throw new Error("GEMINI_API_KEY is not configured in environment variables. Please add it to your hosting platform settings.");
    }

    const model = genAI.getGenerativeModel({ 
      model: "gemini-2.5-flash",
    });

    const contents = messages.map((msg) => ({
      role: msg.role === "assistant" ? "model" : "user",
      parts: [{ text: msg.content }],
    }));

    if (messages.length === 1) {
      const result = await model.generateContent(messages[0].content);
      const response = await result.response;
      return response.text();
    }

    const history = contents.slice(0, -1);
    const lastMessage = messages[messages.length - 1].content;

    const chat = model.startChat({
      history: history,
      generationConfig: {
        maxOutputTokens: 2048,
        temperature: 0.9,
      },
    });

    const result = await chat.sendMessage(lastMessage);
    const response = await result.response;
    return response.text();

  } catch (error: any) {
    console.error("❌ Gemini API Error:", error);
    
    if (error.message?.includes("API_KEY_INVALID")) {
      throw new Error("Invalid API key. Please check your GEMINI_API_KEY");
    }
    if (error.message?.includes("PERMISSION_DENIED")) {
      throw new Error("API key doesn't have permission. Please enable Gemini API");
    }
    
    throw new Error(error.message || "Failed to get response from AI");
  }
}

export async function getChatResponseStream(messages: Message[]) {
  try {
    if (!API_KEY) {
      throw new Error("GEMINI_API_KEY is not configured in environment variables");
    }

    const model = genAI.getGenerativeModel({ 
      model: "gemini-2.5-flash",
    });

    const contents = messages.map((msg) => ({
      role: msg.role === "assistant" ? "model" : "user",
      parts: [{ text: msg.content }],
    }));

    if (messages.length === 1) {
      const result = await model.generateContentStream(messages[0].content);
      return result.stream;
    }

    const history = contents.slice(0, -1);
    const lastMessage = messages[messages.length - 1].content;

    const chat = model.startChat({
      history: history,
      generationConfig: {
        maxOutputTokens: 2048,
        temperature: 0.9,
      },
    });

    const result = await chat.sendMessageStream(lastMessage);
    return result.stream;

  } catch (error: any) {
    console.error("❌ Gemini Streaming Error:", error);
    throw error;
  }
}