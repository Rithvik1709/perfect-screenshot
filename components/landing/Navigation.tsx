"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SiX } from "react-icons/si";
import { motion, useSpring, useTransform } from "motion/react";

interface NavigationProps {
  ctaLabel?: string;
  ctaHref?: string;
}

function AnimatedCounter({ value }: { value: number }) {
  const spring = useSpring(0, {
    damping: 30,
    stiffness: 100,
  });

  useEffect(() => {
    spring.set(value);
  }, [spring, value]);

  const display = useTransform(spring, (current) =>
    Math.round(current).toLocaleString()
  );

  return <motion.span>{display}</motion.span>;
}

export function Navigation({
  ctaLabel = "Editor",
  ctaHref = "/login"
}: NavigationProps) {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/95 backdrop-blur-xl supports-backdrop-filter:bg-background/90">
      <div className="container mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <span className="font-semibold text-sm">Perfect-Screenshot</span>
        </Link>
        <div className="flex items-center gap-2 sm:gap-3">
          {/* GitHub link removed as requested */}
          <Link
            href="https://x.com/Bngrithvik"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-2 py-1.5 hover:bg-accent rounded-lg transition-colors touch-manipulation text-muted-foreground hover:text-foreground group"
            aria-label="X (Twitter) profile"
          >
            <SiX className="h-5 w-5 text-current" />
          </Link>
          <Link href={ctaHref} className="flex items-center">
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90 text-sm px-3 sm:px-4 py-2 touch-manipulation">
              {ctaLabel}
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}

