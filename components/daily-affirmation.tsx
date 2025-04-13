"use client";

import { Button } from "@/components/ui/button";
import { RefreshCw, Quote } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function DailyAffirmation() {
  const [affirmation, setAffirmation] = useState(
    "Every day, I grow stronger in my recovery. My journey is worth celebrating."
  );

  const handleRefresh = () => {
    const affirmations = [
      "I am worthy of a healthy, sober life.",
      "Every moment of sobriety is a victory worth celebrating.",
      "I choose recovery because I deserve peace and healing.",
      "My strength grows with each passing day.",
      "I am creating a new story of hope and resilience.",
    ];
    setAffirmation(affirmations[Math.floor(Math.random() * affirmations.length)]);
  };

  return (
    <div className="section-container">
      <h2 className="text-2xl font-semibold mb-8 text-foreground/90 font-heading flex items-center gap-3">
        <Quote className="h-6 w-6 text-primary" />
        Daily Affirmation
      </h2>

      <AnimatePresence mode="wait">
        <motion.div
          key={affirmation}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="mb-8"
        >
          <p className="text-2xl text-foreground/80 leading-relaxed font-heading">
            {affirmation}
          </p>
        </motion.div>
      </AnimatePresence>

      <div className="flex justify-end">
        <Button
          variant="outline"
          size="lg"
          onClick={handleRefresh}
          className="button-secondary px-6"
        >
          <RefreshCw className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}