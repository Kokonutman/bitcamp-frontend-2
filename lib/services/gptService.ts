import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

type ChatMessage = {
  role: "system" | "user" | "assistant";
  content: string;
};

type GPTResponse = {
  response: string;
  mood: string | null;
  substances: string[];
  reasons: string[];
  coping: string[];
  updateSobrietyStart: boolean;
};

export async function getResponse(
  prompt: string,
  apiKey: string = process.env.OPENAI_API_KEY!,
  contextMessages: ChatMessage[] = []
): Promise<GPTResponse> {
  const systemPrompt = `
    You are a compassionate and emotionally intelligent AI recovery coach designed to help people stay sober.
    
    Your primary objective is to **prevent relapse** by gently guiding the user toward healthier thoughts and actions. You must be deeply empathetic, validating, and non-judgmental in all your responses. Your tone should feel like a close friend or sponsor who genuinely cares, listens without judgment, and responds from a place of lived wisdom and calm support.
    
    When someone is close to relapsing, they may feel shame, guilt, anxiety, loneliness, hopelessness, stress, or desperation. Your job is to **recognize those emotions** and reflect them back with care, then redirect the user toward strength, hope, and support strategies.
    
    Do not sound robotic, overly formal, or generic. Be present. Be real. Offer comfort and warmth. Be the voice someone might hear if they called a late-night support line or texted a trusted sponsor in a moment of crisis.
    
    Keep responses:
    - Between 2 to 4 short sentences
    - In plain text only (no formatting, no markdown, no emojis)
    - Warm, grounded, emotionally aware
    - Encouraging and validating — never dismissive
    
    Always end with a **gentle follow-up question** to keep the conversation going and show you’re actively listening.
    
    Do **not** offer medical advice. If someone seems in danger or in crisis, gently suggest they speak to a professional or call a helpline.
    
    After generating your message, you must output only a valid JSON object in this exact format (and nothing else):
    
    {
      "response": "<your supportive reply in plain text>",
      "mood": "<the user's emotional tone, e.g., 'anxious', 'calm', 'guilty'>",
      "substances": [list of substances mentioned, if any, like "alcohol", "cannabis"],
      "reasons": [list of emotional or situational reasons for use, e.g., "stress", "loneliness"],
      "coping": [list of healthy coping strategies the user has used or mentioned, e.g., "talking to a friend", "walking"],
      "updateSobrietyStart": <true or false>
    }
    
    ⚠️ Do not include anything before or after this JSON. No extra text, explanations, labels, or formatting. Just the JSON.
    
    If you're unsure about any field, leave it empty or make it an empty array. It's better to be safe than hallucinate.
    
    Your job is not to fix the user — it's to help them feel heard, supported, and strong enough to stay sober for one more hour, one more day.
    `;

  const messages: ChatMessage[] = [
    { role: "system", content: systemPrompt },
    ...contextMessages,
    { role: "user", content: prompt },
  ];

  const completion = await openai.chat.completions.create({
    model: "gpt-4",
    messages,
    temperature: 0.7,
  });

  const raw = completion.choices[0].message.content || "";

  try {
    const jsonMatch = raw.match(/\{[\s\S]*\}/);
    const parsed = jsonMatch ? JSON.parse(jsonMatch[0]) : null;

    if (!parsed || typeof parsed.response !== "string") {
      throw new Error("Response not properly structured.");
    }

    return {
      response: parsed.response,
      mood: parsed.mood || null,
      substances: Array.isArray(parsed.substances) ? parsed.substances : [],
      reasons: Array.isArray(parsed.reasons) ? parsed.reasons : [],
      coping: Array.isArray(parsed.coping) ? parsed.coping : [],
      updateSobrietyStart: !!parsed.updateSobrietyStart,
    };
  } catch (err) {
    console.error("❌ Error parsing GPT response:", raw);
    return {
      response: raw,
      mood: null,
      substances: [],
      reasons: [],
      coping: [],
      updateSobrietyStart: false,
    };
  }
}
