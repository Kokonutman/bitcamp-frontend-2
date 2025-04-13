"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Heart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function GratitudeLog() {
  const [entries, setEntries] = useState<string[]>([]);
  const [newEntry, setNewEntry] = useState("");

  const handleAddEntry = () => {
    if (newEntry.trim() && entries.length < 3) {
      setEntries([...entries, newEntry.trim()]);
      setNewEntry("");
    }
  };

  return (
    <Card className="p-6 glass-card animate-fade-in">
      <h2 className="text-2xl font-semibold mb-4 text-foreground/90">
        Daily Gratitude
      </h2>
      <div className="space-y-4">
        <div className="flex gap-2">
          <Input
            value={newEntry}
            onChange={(e) => setNewEntry(e.target.value)}
            placeholder="What are you grateful for today?"
            className="bg-secondary/20"
            maxLength={100}
            onKeyPress={(e) => e.key === "Enter" && handleAddEntry()}
          />
          <Button
            onClick={handleAddEntry}
            disabled={entries.length >= 3 || !newEntry.trim()}
            variant="outline"
            size="icon"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        <AnimatePresence>
          {entries.map((entry, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex items-center gap-2 p-3 rounded-lg bg-secondary/30"
            >
              <Heart className="h-4 w-4 text-accent" />
              <p className="text-foreground/80">{entry}</p>
            </motion.div>
          ))}
        </AnimatePresence>

        {entries.length === 0 && (
          <p className="text-center text-muted-foreground">
            Add up to three things you&apos;re grateful for today
          </p>
        )}
      </div>
    </Card>
  );
}
