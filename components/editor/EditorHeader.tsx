"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
// logo removed; render text brand instead of image
import { SidebarTrigger } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

interface EditorHeaderProps {
  className?: string;
}

export function EditorHeader({ className }: EditorHeaderProps) {
  const router = useRouter();

  async function handleLogout() {
    try {
      if (isSupabaseConfigured) {
        await supabase.auth.signOut();
      }
    } catch (err) {
      // ignore errors but log for debugging
      // eslint-disable-next-line no-console
      console.error("Logout error:", err);
    }

    // Clear the local dev flags used by the app
    try {
      localStorage.removeItem("ps_user_email");
      localStorage.removeItem("ps_logged_in");
    } catch (e) {
      // ignore
    }

  // Replace history so user cannot navigate back to the editor after logout
  router.replace("/");
  }
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
            <span className="font-semibold text-sm">Apply Perfect</span>
          </Link>

          <div className="flex-1" />

          <div className="flex items-center gap-2">
            <Button size="sm" variant="ghost" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}

