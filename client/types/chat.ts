export interface Message {
  role: "user" | "assistant";
  content: string;
}

export interface ChatResponse {
  message: string;
  error?: string;
}

export interface GeminiMessage {
  role: "user" | "model";
  parts: { text: string }[];
}