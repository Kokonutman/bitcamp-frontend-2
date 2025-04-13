"use client";

import { EmergencySupport } from "@/components/emergency-support";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";

export default function EmergencyPage() {
  return (
    <main className="min-h-screen relative">
      {/* Calming Background Image */}
      <div 
        className="fixed inset-0 bg-cover bg-center bg-no-repeat opacity-10 dark:opacity-5"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2000&auto=format&fit=crop")',
          zIndex: -1
        }}
      />
      
      {/* Content */}
      <div className="relative px-6 py-12">
        <div className="mx-auto max-w-5xl space-y-12">
          <motion.header 
            className="text-center animate-fade-in"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl font-bold text-foreground/90 mb-4 font-heading">
              AI Crisis Support
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Get immediate support from our advanced AI system, designed to provide instant, 
              empathetic assistance 24/7. Our AI is here to listen, understand, and help you 
              through difficult moments.
            </p>
            <Link href="/support" className="inline-block mt-6">
              <Button variant="outline" className="gap-2">
                <MessageCircle className="h-4 w-4" />
                Looking for chat support instead?
              </Button>
            </Link>
          </motion.header>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <EmergencySupport />
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