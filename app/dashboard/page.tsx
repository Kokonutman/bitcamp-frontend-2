"use client";

import { DailySobrietyCounter } from "@/components/daily-sobriety-counter";
import { DailyAffirmation } from "@/components/daily-affirmation";
import { MilestoneTracker } from "@/components/milestone-tracker";
import { motion } from "framer-motion";

export default function DashboardPage() {
  return (
    <main className="min-h-screen relative">
      {/* Nature Background - Light Mode */}
      <div 
        className="fixed inset-0 bg-cover bg-center bg-no-repeat opacity-10 dark:opacity-0 transition-opacity duration-300"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=2000&auto=format&fit=crop")',
          zIndex: -1
        }}
      />
      
      {/* Nature Background - Dark Mode */}
      <div 
        className="fixed inset-0 bg-cover bg-center bg-no-repeat opacity-0 dark:opacity-20 transition-opacity duration-300"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1507041957456-9c397ce39c97?q=80&w=2000&auto=format&fit=crop")',
          zIndex: -1
        }}
      />

      <div className="relative mx-auto max-w-7xl px-6 py-12 space-y-24">
        <motion.section 
          className="grid grid-cols-1 md:grid-cols-2 gap-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <DailySobrietyCounter />
          <DailyAffirmation />
        </motion.section>

        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <MilestoneTracker />
        </motion.section>
      </div>

      {/* Decorative Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      </div>
    </main>
  );
}