"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Save, Mail } from "lucide-react";
import { motion } from "framer-motion";

export function LetterTool() {
  const [pastLetter, setPastLetter] = useState("");
  const [futureLetter, setFutureLetter] = useState("");
  const [activeTab, setActiveTab] = useState("past");
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = () => {
    // TODO: Implement saving to database
    setIsSaved(true);
  };

  return (
    <Card className="p-6 glass-card animate-fade-in">
      <h2 className="text-2xl font-semibold mb-4 text-foreground/90">Recovery Letters</h2>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2 mb-4">
          <TabsTrigger value="past">Letter to Past Self</TabsTrigger>
          <TabsTrigger value="future">Letter from Future Self</TabsTrigger>
        </TabsList>

        <TabsContent value="past" className="space-y-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-4"
          >
            <p className="text-muted-foreground">
              Write a compassionate letter to who you were before recovery. What would you like them to know?
            </p>
            <Textarea
              value={pastLetter}
              onChange={(e) => setPastLetter(e.target.value)}
              placeholder="Dear past self..."
              className="min-h-[200px] bg-secondary/20"
            />
          </motion.div>
        </TabsContent>

        <TabsContent value="future" className="space-y-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-4"
          >
            <p className="text-muted-foreground">
              Imagine yourself in the future, looking back at today. What words of encouragement would you share?
            </p>
            <Textarea
              value={futureLetter}
              onChange={(e) => setFutureLetter(e.target.value)}
              placeholder="Dear present self..."
              className="min-h-[200px] bg-secondary/20"
            />
          </motion.div>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end mt-4">
        <Button
          onClick={handleSave}
          disabled={!(activeTab === "past" ? pastLetter : futureLetter).trim() || isSaved}
          className={isSaved ? "text-primary" : ""}
        >
          <Save className="mr-2 h-4 w-4" />
          Save Letter
        </Button>
      </div>
    </Card>
  );
}