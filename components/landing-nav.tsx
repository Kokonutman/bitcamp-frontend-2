"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export function LandingNav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-20 bg-background/5 backdrop-blur-lg">
      <div className="mx-auto max-w-screen-xl px-4">
        <div className="flex h-20 items-center justify-between">
          <Link href="/" className="flex items-center gap-4">
            <div className="relative w-12 h-12">
              <Image
                src="/logo.png"
                alt="SoberSide Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
            <span className="text-2xl font-heading font-semibold text-white">SoberSide</span>
          </Link>
          <Link href="/dashboard">
            <Button variant="outline" className="px-8 py-6 text-lg bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white border-white/20">
              Log in
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}