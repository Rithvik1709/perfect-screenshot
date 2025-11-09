"use client";

import * as React from "react";
import Link from "next/link";
// logo removed; render text brand instead of image
import { SidebarTrigger } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

interface EditorHeaderProps {
  className?: string;
}

export function EditorHeader({ className }: EditorHeaderProps) {
  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full border-b border-border/50 bg-background/95 backdrop-blur-xl",
        "supports-backdrop-filter:bg-background/90",
        className
      )}
    >
      <div className="container mx-auto px-4 sm:px-5 lg:px-6">
        <div className="flex h-14 sm:h-16 items-center gap-3 sm:gap-4">
          <SidebarTrigger className="transition-opacity hover:opacity-80 touch-manipulation rounded-lg" />
          
          <Link href="/" className="flex items-center transition-opacity hover:opacity-80 rounded-lg p-1">
            <span className="font-semibold text-sm">Stage</span>
          </Link>

          <div className="flex-1" />

          {/* GitHub link removed as requested */}
        </div>
      </div>
    </header>
  );
}

