"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

export default function LoginPage() {
  const router = useRouter();
  const [mode, setMode] = React.useState<"login" | "signup" | "forgot">("login");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [name, setName] = React.useState("");
  const [confirm, setConfirm] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [message, setMessage] = React.useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // If Supabase is configured, use it for auth. Otherwise fall back to the
    // simple localStorage-based dev stub implemented below.
    try {
      if (isSupabaseConfigured) {
        if (mode === "login") {
          if (!email || !password) {
            setMessage("Please enter email and password");
            setLoading(false);
            return;
          }

          const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
          });
          if (error) {
            setMessage(error.message || "Sign in failed");
            setLoading(false);
            return;
          }

          // Keep the local dev checks working by setting simple flags too.
          localStorage.setItem("ps_user_email", email);
          localStorage.setItem("ps_logged_in", "1");
          setMessage(null);
          router.push("/home");
          return;
        }

        if (mode === "signup") {
          if (!email || !password) {
            setMessage("Email and password are required");
            setLoading(false);
            return;
          }

          const { data, error } = await supabase.auth.signUp({ email, password });
          if (error) {
            setMessage(error.message || "Sign up failed");
            setLoading(false);
            return;
          }

          setMessage("Sign up successful. Check your email to confirm (if required). Please sign in.");
          setMode("login");
          setPassword("");
          setConfirm("");
          setLoading(false);
          return;
        }

        if (mode === "forgot") {
          if (!email) {
            setMessage("Enter your email to reset password");
            setLoading(false);
            return;
          }
          const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: `${window.location.origin}/login`,
          });
          if (error) {
            setMessage(error.message || "Failed to send reset email");
            setLoading(false);
            return;
          }
          setMessage("Check your email for password reset instructions.");
          setLoading(false);
          return;
        }
      }

      // --- Local dev-only fallback (keeps existing behavior when Supabase not configured)
      const usersRaw = localStorage.getItem("ps_users") || "{}";
      const users: Record<string, { name?: string; password: string }> = JSON.parse(usersRaw);

      if (mode === "login") {
        if (!email || !password) {
          setMessage("Please enter email and password");
          setLoading(false);
          return;
        }

        const entry = users[email.toLowerCase()];
        if (!entry) {
          setMessage("No account found. Please sign up first.");
          setLoading(false);
          return;
        }

        if (entry.password !== password) {
          setMessage("Invalid credentials");
          setLoading(false);
          return;
        }

        // Persist login state locally
        localStorage.setItem("ps_user_email", email);
        localStorage.setItem("ps_logged_in", "1");
        setMessage(null);
        router.push("/home");
        return;
      }

      if (mode === "signup") {
        // Basic validation
        if (!email || !password) {
          setMessage("Email and password are required");
          setLoading(false);
          return;
        }
        if (password !== confirm) {
          setMessage("Passwords do not match");
          setLoading(false);
          return;
        }

        const key = email.toLowerCase();
        if (users[key]) {
          setMessage("An account with this email already exists. Sign in instead.");
          setLoading(false);
          return;
        }

        users[key] = { name: name || undefined, password };
        localStorage.setItem("ps_users", JSON.stringify(users));
        setMessage("Account created. You can now sign in.");
        setMode("login");
        setPassword("");
        setConfirm("");
        setLoading(false);
        return;
      }

      if (mode === "forgot") {
        if (!email) {
          setMessage("Enter your email to reset password");
          setLoading(false);
          return;
        }
        const key = email.toLowerCase();
        const entry = users[key];
        if (!entry) {
          setMessage("No account found for that email");
          setLoading(false);
          return;
        }

        // Simple dev-only reset token stored in localStorage
        const token = Math.random().toString(36).slice(2, 10);
        localStorage.setItem(`ps_reset_${key}`, token);
        setMessage(`Password reset token (dev): ${token} — use Signup to create a new password or pretend this is an email link.`);
        setLoading(false);
        return;
      }
    } catch (err) {
      console.error(err);
      setMessage("An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-md p-6 rounded-lg border border-border bg-card">
        <div className="flex items-center gap-3 mb-4">
          <button
            onClick={() => { setMode("login"); setMessage(null); }}
            className={`px-3 py-1 rounded ${mode === "login" ? "bg-primary text-primary-foreground" : "bg-muted/30"}`}
          >
            Sign in
          </button>
          <button
            onClick={() => { setMode("signup"); setMessage(null); }}
            className={`px-3 py-1 rounded ${mode === "signup" ? "bg-primary text-primary-foreground" : "bg-muted/30"}`}
          >
            Sign up
          </button>
          <button
            onClick={() => { setMode("forgot"); setMessage(null); }}
            className={`px-3 py-1 rounded ${mode === "forgot" ? "bg-primary text-primary-foreground" : "bg-muted/30"}`}
          >
            Forgot
          </button>
        </div>

        {message && <div className="mb-3 text-sm text-yellow-300">{message}</div>}

        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="text-xs text-muted-foreground">Email</label>
            <input
              className="w-full mt-1 px-3 py-2 rounded border border-border bg-transparent"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@gmail.com"
              required
            />
          </div>

          {mode === "signup" && (
            <div>
              <label className="text-xs text-muted-foreground">Full name</label>
              <input
                className="w-full mt-1 px-3 py-2 rounded border border-border bg-transparent"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
              />
            </div>
          )}

          {mode !== "forgot" && (
            <div>
              <label className="text-xs text-muted-foreground">Password</label>
              <input
                className="w-full mt-1 px-3 py-2 rounded border border-border bg-transparent"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Your password"
                required={mode === "login" || mode === "signup"}
              />
            </div>
          )}

          {mode === "signup" && (
            <div>
              <label className="text-xs text-muted-foreground">Confirm password</label>
              <input
                className="w-full mt-1 px-3 py-2 rounded border border-border bg-transparent"
                type="password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                placeholder="Confirm password"
                required
              />
            </div>
          )}

          <div className="flex items-center justify-between">
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Working..." : mode === "login" ? "Sign in" : mode === "signup" ? "Create account" : "Send reset"}
            </Button>
          </div>
        </form>

        <div className="mt-4 text-center text-sm text-muted-foreground">
          <p>
            Go <Link href="/">Back</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
