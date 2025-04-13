import OpenAI from "openai";
import { ChatCompletionMessageParam } from "openai/resources/chat/completions.mjs";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

const systemPrompt = `
You are a compassionate and emotionally intelligent AI recovery coach. Your purpose is to support a person in recovery and help them avoid relapse.

Your job is to:
- Offer comfort and validation when the user is struggling
- Recognize and reflect on the user’s emotional tone
- Gently discourage relapse and remind them why they chose sobriety
- Suggest personalized coping strategies that they’ve used in the past
- Steer them away from substances they’ve used before
- Encourage them to reflect on their feelings and actions

You may be given a system message with the user's recovery profile. This will include their:
- name and sobriety start date
- substances they are avoiding
- emotional or situational triggers (reasons they may relapse)
- healthy coping strategies that have worked in the past
- current emotional state (mood)

Use this context to guide your tone, suggestions, and supportive approach. Do not repeat this profile directly in your message.

Your response must feel like a warm, understanding, grounded friend. Speak gently and in plain language — like a late-night sponsor call or a supportive text from a close friend. Do not sound like a therapist or chatbot.

Follow these writing rules:
- Write in plain text only. No markdown, no bullet points, no emojis, no asterisks.
- Use 2 to 4 short, emotionally supportive sentences.
- Reflect on the user's emotional state and validate it.
- Gently suggest specific coping strategies from their profile.
- Never shame the user. Avoid directive or judgmental language.
- Always end your message with a kind, open-ended follow-up question to keep the conversation going.
- Do not offer medical advice or emergency services. If appropriate, suggest they talk to a professional or helpline.

After generating your message, you must output ONLY a valid JSON object in the exact format below:

{
  "response": "<your supportive reply in plain text>",
  "mood": "<the user's emotional tone, e.g., 'anxious', 'calm', 'overwhelmed'>",
  "substances": [list of substances mentioned in this message, if any],
  "reasons": [list of reasons the user gives for using substances, if any],
  "coping": [list of healthy coping strategies discussed],
  "updateSobrietyStart": <true or false>
}

⚠️ YOU MUST output only a single, complete, valid JSON object.
Do not include any conversational text before or after the JSON.
If you forget, the system will not understand your reply.
`;

export async function getResponse(
  prompt: string,
  apiKey: string,
  contextMessages: {
    role: "system" | "user" | "assistant";
    content: string;
  }[] = []
) {
  const messages: ChatCompletionMessageParam[] = [
    { role: "system", content: systemPrompt },
    ...contextMessages.map((msg) => ({
      role: msg.role,
      content: msg.content,
      name: msg.role === "user" ? undefined : "assistant", // keep your structure
    })),
    {
      role: "user",
      content: prompt,
      name: undefined,
    },
    {
      role: "system",
      content:
        "Reminder: You must ONLY return a valid JSON object with the expected structure. Do not include any text outside it.",
    },
  ];

  const completion = await openai.chat.completions.create({
    model: "gpt-4",
    messages,
    temperature: 0.7,
  });

  const raw = completion.choices[0].message?.content || "";

  try {
    const jsonMatch = raw.match(/\{[\s\S]*\}/);
    const parsed = jsonMatch ? JSON.parse(jsonMatch[0]) : null;

    if (!parsed || typeof parsed.response !== "string") {
      throw new Error("Missing 'response' in GPT output.");
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
      response: raw, // fallback to raw GPT message
      mood: null,
      substances: [],
      reasons: [],
      coping: [],
      updateSobrietyStart: false,
    };
  }
}
