"use client";

import { CopingPlan } from "@/components/coping-plan";
import { motion } from "framer-motion";

export default function StrategiesPage() {
  return (
    <main className="min-h-screen relative">
      {/* Nature Background - Light Mode */}
      <div 
        className="fixed inset-0 bg-cover bg-center bg-no-repeat opacity-10 dark:opacity-0 transition-opacity duration-300"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2000&auto=format&fit=crop")',
          zIndex: -1
        }}
      />

      {/* Nature Background - Dark Mode */}
      <div 
        className="fixed inset-0 bg-cover bg-center bg-no-repeat opacity-0 dark:opacity-20 transition-opacity duration-300"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1516166328576-82e16a127024?q=80&w=2000&auto=format&fit=crop")',
          zIndex: -1
        }}
      />

      <div className="relative px-6 py-12">
        <div className="mx-auto max-w-2xl space-y-12">
          <motion.header 
            className="text-center animate-fade-in"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl font-bold text-foreground/90 mb-2 font-heading">Recovery Strategies</h1>
            <p className="text-lg text-muted-foreground">Create and manage your personal action plan</p>
          </motion.header>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <CopingPlan />
          </motion.div>
        </div>
      </div>
    </main>
  );
}