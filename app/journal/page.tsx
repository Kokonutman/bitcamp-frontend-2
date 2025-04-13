"use client";

import { Card } from "@/components/ui/card";
import { PenLine, Heart, Mic } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function JournalPage() {
  const journalSections = [
    {
      title: "Gratitude Log",
      description: "Record daily moments of gratitude",
      icon: Heart,
      href: "/journal/gratitude",
      color: "text-primary"
    },
    {
      title: "Recovery Letters",
      description: "Write letters to your past and future self",
      icon: PenLine,
      href: "/journal/letters",
      color: "text-accent"
    },
    {
      title: "Voice Journal",
      description: "Record spoken reflections",
      icon: Mic,
      href: "/journal/voice",
      color: "text-primary"
    }
  ];

  return (
    <main className="min-h-screen relative">
      {/* Nature Background - Light Mode */}
      <div 
        className="fixed inset-0 bg-cover bg-center bg-no-repeat opacity-10 dark:opacity-0 transition-opacity duration-300"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1501854140801-50d01698950b?q=80&w=2000&auto=format&fit=crop")',
          zIndex: -1
        }}
      />
      
      {/* Nature Background - Dark Mode */}
      <div 
        className="fixed inset-0 bg-cover bg-center bg-no-repeat opacity-0 dark:opacity-20 transition-opacity duration-300"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1502657877623-f66bf489d236?q=80&w=2000&auto=format&fit=crop")',
          zIndex: -1
        }}
      />
      
      <div className="relative px-6 py-12">
        <div className="mx-auto max-w-7xl space-y-12">
          <header className="text-center animate-fade-in">
            <h1 className="text-4xl font-bold text-foreground/90 mb-2 font-heading">Recovery Journal</h1>
            <p className="text-lg text-muted-foreground">Choose your journaling method</p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {journalSections.map((section, index) => {
              const Icon = section.icon;
              return (
                <Link href={section.href} key={section.href}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 h-[200px] flex flex-col justify-center">
                      <div className="flex flex-col items-center text-center space-y-4">
                        <div className={`p-3 rounded-full bg-secondary/20 ${section.color}`}>
                          <Icon className="w-8 h-8" />
                        </div>
                        <h2 className="text-xl font-semibold">{section.title}</h2>
                        <p className="text-muted-foreground text-sm">{section.description}</p>
                      </div>
                    </Card>
                  </motion.div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </main>
  );
}