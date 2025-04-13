"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Save, Shield } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface CopingStrategy {
  trigger: string;
  response: string;
}

export function CopingPlan() {
  const [strategies, setStrategies] = useState<CopingStrategy[]>([]);
  const [newTrigger, setNewTrigger] = useState("");
  const [newResponse, setNewResponse] = useState("");
  const [isSaved, setIsSaved] = useState(false);

  const handleAddStrategy = () => {
    if (newTrigger.trim() && newResponse.trim()) {
      setStrategies([...strategies, { trigger: newTrigger, response: newResponse }]);
      setNewTrigger("");
      setNewResponse("");
      setIsSaved(false);
    }
  };

  const handleSave = () => {
    // TODO: Implement saving to database
    setIsSaved(true);
  };

  return (
    <Card className="p-6 glass-card animate-fade-in">
      <h2 className="text-2xl font-semibold mb-4 text-foreground/90">Coping Plan</h2>
      
      <div className="space-y-6">
        <div className="space-y-4">
          <Input
            value={newTrigger}
            onChange={(e) => setNewTrigger(e.target.value)}
            placeholder="What triggers you? (e.g., stress at work)"
            className="bg-secondary/20"
          />
          <Textarea
            value={newResponse}
            onChange={(e) => setNewResponse(e.target.value)}
            placeholder="How will you respond? (e.g., deep breathing, call sponsor)"
            className="bg-secondary/20"
          />
          <Button
            onClick={handleAddStrategy}
            disabled={!newTrigger.trim() || !newResponse.trim()}
            className="w-full"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Strategy
          </Button>
        </div>

        <AnimatePresence>
          {strategies.map((strategy, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="p-4 rounded-lg bg-secondary/20 space-y-2"
            >
              <p className="font-medium text-foreground/90">Trigger:</p>
              <p className="text-muted-foreground ml-4">{strategy.trigger}</p>
              <p className="font-medium text-foreground/90">Response:</p>
              <p className="text-muted-foreground ml-4">{strategy.response}</p>
            </motion.div>
          ))}
        </AnimatePresence>

        {strategies.length > 0 && (
          <Button
            onClick={handleSave}
            disabled={isSaved}
            className="w-full"
            variant="outline"
          >
            <Shield className="mr-2 h-4 w-4" />
            Save Plan
          </Button>
        )}
      </div>
    </Card>
  );
}