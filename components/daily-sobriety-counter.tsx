"use client";

import { useState, useEffect } from "react";
import CountUp from 'react-countup';
import { Calendar, Award, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export function DailySobrietyCounter() {
  const [days, setDays] = useState(0);
  
  useEffect(() => {
    // Set to 30 days ago
    const startDate = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - startDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    setDays(diffDays);
  }, []);

  return (
    <div className="section-container">
      <motion.div
        className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      <div className="relative">
        <h2 className="text-2xl font-semibold mb-8 text-foreground/90 font-heading flex items-center gap-3">
          <Calendar className="h-6 w-6 text-primary" />
          Your Progress
        </h2>

        <div className="flex items-center justify-between mb-8">
          <div className="space-y-2">
            <p className="text-7xl font-bold text-primary tracking-tight font-heading">
              <CountUp end={days} duration={2} />
            </p>
            <p className="text-xl text-muted-foreground">Days Sober</p>
          </div>
          <motion.div
            className="floating-element"
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <Award className="h-20 w-20 text-primary/20" />
          </motion.div>
        </div>

        <div className="p-6 rounded-2xl bg-secondary/10 border border-secondary/20">
          <div className="flex items-center gap-3 text-muted-foreground text-lg">
            <Sparkles className="h-5 w-5 text-primary" />
            <p>Every day is a victory worth celebrating</p>
          </div>
        </div>
      </div>
    </div>
  );
}