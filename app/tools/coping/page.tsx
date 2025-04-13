"use client";

import { CopingPlan } from "@/components/coping-plan";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function CopingPage() {
  return (
    <main className="min-h-screen relative flex items-center">
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

      <div className="relative px-6 py-12 w-full">
        <Link href="/tools" className="fixed top-24 left-8">
          <Button variant="ghost" size="lg" className="h-12 w-12 rounded-full p-0">
            <ArrowLeft className="h-6 w-6" />
          </Button>
        </Link>

        <div className="mx-auto max-w-2xl space-y-12">
          <header className="text-center animate-fade-in">
            <h1 className="text-4xl font-bold text-foreground/90 mb-2 font-heading">Coping Plan</h1>
            <p className="text-lg text-muted-foreground">Create and manage your coping strategies</p>
          </header>

          <CopingPlan />
        </div>
      </div>
    </main>
  );
}