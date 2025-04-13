'use client'

import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center relative">
      {/* Ocean Background - Light/Dark Mode */}
      <div 
        className="fixed inset-0 bg-cover bg-center bg-no-repeat opacity-70 transition-opacity duration-300 z-0"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2000&auto=format&fit=crop")',
          filter: 'brightness(0.7)'
        }}
      />
      <div 
        className="fixed inset-0 bg-cover bg-center bg-no-repeat opacity-0 dark:opacity-80 transition-opacity duration-300 z-0"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1478359844494-1092259d93e4?q=80&w=2000&auto=format&fit=crop")',
          filter: 'brightness(0.4)'
        }}
      />
      
      {/* Content */}
      <div className="container max-w-4xl text-center space-y-8 relative z-10">
        <h1 className="text-5xl font-bold tracking-tighter sm:text-7xl text-white">
          Welcome to Your Recovery Journey
        </h1>
        <p className="mx-auto max-w-2xl text-white/90 text-lg sm:text-xl">
          Your path to wellness starts here. We provide tools and support to help you maintain sobriety and build a healthier life.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/dashboard">
            <Button size="lg" className="w-full sm:w-auto text-lg px-8">
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          <Link href="/emergency">
            <Button variant="outline" size="lg" className="w-full sm:w-auto text-lg px-8 bg-white/10 backdrop-blur-sm hover:bg-white/20">
              Emergency Support
            </Button>
          </Link>
        </div>
      </div>
    </main>
  )
}