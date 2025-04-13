"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mic, Send, MessageCircle, Loader2 } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { sendMessage } from "@/lib/gemini";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export function RecoveryChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hi, I'm your recovery coach. How can I support you today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setMessages(prev => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await sendMessage(userMessage);
      setMessages(prev => [...prev, { role: "assistant", content: response }]);
    } catch (error) {
      console.error("Error getting response:", error);
      setMessages(prev => [...prev, {
        role: "assistant",
        content: "I apologize, but I'm having trouble responding right now. If you need immediate support, please don't hesitate to use our emergency helpline."
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVoiceInput = () => {
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      
      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    }
  };

  return (
    <Card className="relative overflow-hidden">
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      />
      
      <div className="relative p-8 md:p-12 h-[600px] flex flex-col">
        <div className="flex items-center gap-4 mb-8">
          <div className="p-3 rounded-full bg-primary/20">
            <MessageCircle className="h-6 w-6 text-primary" />
          </div>
          <h2 className="text-2xl font-semibold text-foreground/90 font-heading">
            Recovery Coach
          </h2>
        </div>

        <div className="flex-1 overflow-y-auto space-y-6 mb-6">
          <AnimatePresence>
            {messages.map((message, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] p-4 rounded-2xl ${
                    message.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary/50 text-secondary-foreground"
                  }`}
                >
                  <p className="text-lg whitespace-pre-wrap">{message.content}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-start"
            >
              <div className="bg-secondary/50 text-secondary-foreground p-4 rounded-2xl">
                <Loader2 className="h-6 w-6 animate-spin" />
              </div>
            </motion.div>
          )}
        </div>

        <div className="flex gap-3">
          <Button
            variant="outline"
            size="icon"
            onClick={handleVoiceInput}
            className={`${isListening ? "text-primary" : ""}`}
          >
            <Mic className="h-5 w-5" />
          </Button>
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
            className="bg-secondary/20"
            disabled={isLoading}
          />
          <Button 
            onClick={handleSend} 
            className="px-6"
            disabled={!input.trim() || isLoading}
          >
            {isLoading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <Send className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>
    </Card>
  );
}