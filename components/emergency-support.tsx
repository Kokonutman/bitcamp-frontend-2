"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Phone, Bot } from "lucide-react";
import { motion } from "framer-motion";

export function EmergencySupport() {
  const handleCall = () => {
    window.location.href = "tel:1-800-662-4357";
  };

  return (
    <Card className="relative overflow-hidden">
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      />

      <div className="relative p-8 md:p-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-full bg-accent/20">
              <Bot className="h-6 w-6 text-accent" />
            </div>
            <h2 className="text-2xl font-semibold text-foreground/90 font-heading">
              24/7 AI Crisis Support
            </h2>
          </div>

          <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
            Need immediate support? Our advanced AI crisis support system is
            available 24/7 to provide instant, empathetic assistance. Our AI is
            specifically trained to help during difficult moments and can
            provide immediate coping strategies and support.
          </p>

          <div className="space-y-4">
            <Button
              size="lg"
              onClick={handleCall}
              className="w-full md:w-auto px-8 bg-accent hover:bg-accent/90"
            >
              <Phone className="mr-2 h-5 w-5" />
              Connect Now (1-800-662-4357)
            </Button>

            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-center gap-2">
                • Instant AI-powered support available 24/7
              </li>
              <li className="flex items-center gap-2">
                • Advanced emotional understanding and response
              </li>
              <li className="flex items-center gap-2">
                • Personalized coping strategies
              </li>
            </ul>
          </div>

          <p className="text-sm text-muted-foreground">
            Our AI support system uses advanced natural language processing to
            provide immediate, personalized support. While it&apos;s not a
            replacement for professional medical care, it offers instant help
            when you need someone to talk to.
          </p>
        </motion.div>
      </div>
    </Card>
  );
}
