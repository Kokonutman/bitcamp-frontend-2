"use client";

import { RecoveryChat } from "@/components/recovery-chat";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";

export default function SupportPage() {
  return (
    <main className="min-h-screen relative">
      {/* Nature Background - Light Mode */}
      <div 
        className="fixed inset-0 bg-cover bg-center bg-no-repeat opacity-10 dark:opacity-0 transition-opacity duration-300"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2000&auto=format&fit=crop")',
          zIndex: -1
        }}
      />
      
      {/* Nature Background - Dark Mode */}
      <div 
        className="fixed inset-0 bg-cover bg-center bg-no-repeat opacity-0 dark:opacity-20 transition-opacity duration-300"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1532767153582-b1a0e5145009?q=80&w=2000&auto=format&fit=crop")',
          zIndex: -1
        }}
      />
      
      <div className="relative px-6 py-12">
        <div className="mx-auto max-w-5xl space-y-12">
          <motion.header 
            className="text-center animate-fade-in"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl font-bold text-foreground/90 mb-4 font-heading">
              Chat Support
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Need someone to talk to? Our AI recovery coach is here to listen and support you.
            </p>
            <Link href="/emergency" className="inline-block mt-6">
              <Button variant="outline" className="gap-2">
                <Phone className="h-4 w-4" />
                Need immediate help? Click here
              </Button>
            </Link>
          </motion.header>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <RecoveryChat />
          </motion.div>
        </div>

        {/* Decorative Elements */}
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
        </div>
      </div>
    </main>
  );
}