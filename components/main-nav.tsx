"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ChartLine, Book, Shield, MessageCircle, Phone } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

const routes = [
  {
    href: "/dashboard",
    label: "Progress",
    icon: ChartLine
  },
  {
    href: "/journal",
    label: "Journal",
    icon: Book
  },
  {
    href: "/tools",
    label: "Strategies",
    icon: Shield
  },
  {
    href: "/support",
    label: "Chat",
    icon: MessageCircle
  },
  {
    href: "/emergency",
    label: "Help",
    icon: Phone
  }
];

export function MainNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background/80 backdrop-blur-lg md:top-0 md:bottom-auto">
      <div className="mx-auto max-w-screen-xl px-4">
        <div className="flex h-16 items-center md:justify-between">
          <div className="hidden md:flex items-center gap-8">
            <Link href="/dashboard" className="flex items-center gap-4">
              <div className="relative w-12 h-12">
                <Image
                  src="/logo.png"
                  alt="SoberSide Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <span className="text-2xl font-heading font-semibold text-primary">SoberSide</span>
            </Link>
            <ThemeToggle />
          </div>
          <div className="flex items-center justify-around md:justify-end md:gap-8 w-full md:w-auto">
            {routes.map((route) => {
              const Icon = route.icon;
              return (
                <Link
                  key={route.href}
                  href={route.href}
                  className={cn(
                    "group flex flex-col items-center gap-1 transition-colors hover:text-primary md:flex-row md:gap-2",
                    pathname === route.href ? "text-primary" : "text-muted-foreground"
                  )}
                >
                  <Icon className="h-5 w-5" />
                  <span className="text-xs font-medium md:text-sm">{route.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}