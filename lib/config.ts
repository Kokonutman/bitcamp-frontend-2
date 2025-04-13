export const config = {
  port: process.env.PORT || "3000",

  twilio: {
    accountSid: process.env.TWILIO_ACCOUNT_SID!,
    authToken: process.env.TWILIO_AUTH_TOKEN!,
    phoneNumber: process.env.TWILIO_PHONE_NUMBER!,
  },

  openaiApiKey: process.env.OPENAI_API_KEY!,
  sttApiKey: process.env.STT_API_KEY!,
  ttsApiKey: process.env.TTS_API_KEY!,
};
