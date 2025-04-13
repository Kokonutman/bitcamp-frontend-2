"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { RefreshCw, Save } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function ReflectionPrompts() {
  const [prompt, setPrompt] = useState("What's something I'm proud of this week?");
  const [response, setResponse] = useState("");
  const [isSaved, setIsSaved] = useState(false);

  const prompts = [
    "What's something I'm proud of this week?",
    "How did I handle stress today?",
    "What's one thing I've learned about myself in recovery?",
    "What small victory can I celebrate today?",
    "Who am I grateful for in my recovery journey?",
    "What healthy coping mechanism worked well for me recently?",
  ];

  const handleNewPrompt = () => {
    const newPrompt = prompts[Math.floor(Math.random() * prompts.length)];
    setPrompt(newPrompt);
    setResponse("");
    setIsSaved(false);
  };

  const handleSave = () => {
    // TODO: Implement saving to database
    setIsSaved(true);
  };

  return (
    <Card className="p-6 glass-card animate-fade-in">
      <h2 className="text-2xl font-semibold mb-4 text-foreground/90">Daily Reflection</h2>
      <div className="space-y-4">
        <motion.div
          key={prompt}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 rounded-lg bg-secondary/20"
        >
          <p className="text-lg text-foreground/80">{prompt}</p>
        </motion.div>

        <Textarea
          value={response}
          onChange={(e) => setResponse(e.target.value)}
          placeholder="Write your thoughts here..."
          className="min-h-[120px] bg-secondary/20"
        />

        <div className="flex justify-end gap-2">
          <Button variant="outline" size="icon" onClick={handleNewPrompt}>
            <RefreshCw className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={handleSave}
            disabled={!response.trim() || isSaved}
            className={isSaved ? "text-primary" : ""}
          >
            <Save className={`h-4 w-4 ${isSaved ? "fill-current" : ""}`} />
          </Button>
        </div>
      </div>
    </Card>
  );
}