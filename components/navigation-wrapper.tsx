"use client";

import { usePathname } from "next/navigation";
import { MainNav } from "@/components/main-nav";
import { LandingNav } from "@/components/landing-nav";

export function NavigationWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLandingPage = pathname === "/";

  return (
    <>
      {isLandingPage ? <LandingNav /> : <MainNav />}
      <div className={!isLandingPage ? "pb-16 md:pb-0 md:pt-16" : "pt-16"}>
        {children}
      </div>
    </>
  );
}