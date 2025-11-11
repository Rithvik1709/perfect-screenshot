"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
// logo removed; render text brand instead of image
// Sidebar trigger removed
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
      <div className="w-full px-0">
        <div className="relative h-14 sm:h-16 flex items-center">
          {/* Brand - pinned to the far left */}
          <Link href="/" className="absolute left-0 top-0 h-full flex items-center px-3">
            <span className="font-semibold text-sm"> Perfect Screenshot</span>
          </Link>

          {/* Sidebar trigger removed to simplify header on home page */}

          {/* Logout - pinned to the far right */}
          <div className="absolute right-0 top-0 h-full flex items-center px-3">
            <Button size="sm" variant="ghost" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}

