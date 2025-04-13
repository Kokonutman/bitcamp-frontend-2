import { VoiceJournal } from "@/components/voice-journal";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function VoicePage() {
  return (
    <main className="min-h-screen relative flex items-center">
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
      
      <div className="relative px-6 py-12 w-full">
        <Link href="/journal" className="fixed top-24 left-8">
          <Button variant="ghost" size="lg" className="h-12 w-12 rounded-full p-0">
            <ArrowLeft className="h-6 w-6" />
          </Button>
        </Link>

        <div className="mx-auto max-w-2xl space-y-12">
          <header className="text-center animate-fade-in">
            <h1 className="text-4xl font-bold text-foreground/90 mb-2 font-heading">Voice Journal</h1>
            <p className="text-lg text-muted-foreground">Record your thoughts and reflections</p>
          </header>

          <VoiceJournal />
        </div>
      </div>
    </main>
  );
}