import { GoogleGenerativeAI } from "@google/generative-ai";
import { Message } from "@/types/chat";

if (!process.env.GEMINI_API_KEY) {
  console.error("⚠️ GEMINI_API_KEY is not defined!");
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function getChatResponse(messages: Message[]): Promise<string> {
  try {
    if (!process.env.GEMINI_API_KEY) {
      throw new Error("API key is not configured");
    }

    // ✅ CHANGED TO MATCH YOUR API KEY'S ALLOWED MODELS
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
    console.error("Gemini API Error:", error);
    throw new Error(error.message || "Failed to get response from AI");
  }
}

export async function getChatResponseStream(messages: Message[]) {
  try {
    if (!process.env.GEMINI_API_KEY) {
      throw new Error("API key is not configured");
    }

    // ✅ CHANGED TO MATCH YOUR API KEY'S ALLOWED MODELS
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
    console.error("Gemini Streaming Error:", error);
    throw error;
  }
}