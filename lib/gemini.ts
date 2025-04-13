import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || "");

const systemContext = `
You are a compassionate and supportive AI recovery coach. Speak like a warm, grounded person helping someone in addiction recovery. Be gentle, validating, and emotionally aware.

Write in plain text only. No formatting, no markdown, no emojis, no lists. Never use asterisks or special symbols. Your messages should sound like a kind text from a close friend.

Keep responses between 2 and 5 short sentences. Be conversational and emotionally supportive. Reflect on what the user says, and always follow up with a gentle question to keep the conversation going.

Never give medical advice. If someone seems in crisis, suggest they contact a helpline or speak with a professional. Encourage healthy choices without being forceful.
`;

const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

// Chat session (persisted)
let chat = model.startChat({
  history: [
    {
      role: "user",
      parts: "Please initialize as a recovery coach using the system instruction.",
    },
    {
      role: "model",
      parts: "Got it. I’ll respond with short, kind, plain text messages and support the user like a recovery coach would.",
    },
  ],
  systemInstruction: systemContext,
  generationConfig: {
    temperature: 0.7,
    maxOutputTokens: 300,
  },
});

// Last few exchanges (to simulate memory)
let chatMemory: { role: "user" | "model"; content: string }[] = [];

export async function sendMessage(message: string) {
  try {
    // Update chat memory
    chatMemory.push({ role: "user", content: message });

    // Optional: Only keep last 4 turns (user + model)
    if (chatMemory.length > 8) chatMemory = chatMemory.slice(-8);

    const reinforcementPrompt = `Remember: you are a kind recovery coach. Keep responses in plain text only. Speak warmly. Respond in 2–5 sentences and always ask the user a gentle follow-up question.\n\n`;

    const finalMessage = reinforcementPrompt + message;

    const result = await chat.sendMessage(finalMessage);
    const response = await result.response;
    const text = response.text().trim();

    // Store model's reply in memory
    chatMemory.push({ role: "model", content: text });

    // Fallback: if the bot forgets to ask a question, append a soft prompt
    const endsWithQuestion = /[.?!]\s*$/g.test(text) && /\?\s*$/.test(text);
    if (!endsWithQuestion) {
      return text + "\n\nWould you like to tell me more about how you're feeling right now?";
    }

    return text;
  } catch (error) {
    console.error("Error sending message to Gemini:", error);
    return "I'm having trouble responding right now. If you need immediate support, please consider calling a helpline.";
  }
}
