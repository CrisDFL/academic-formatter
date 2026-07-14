"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState<string | null>(null);
  const supabase = createClient();

  async function signInWithProvider(provider: "google" | "github") {
    setLoading(provider);
    await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
  }

  async function signInWithEmail(e: React.FormEvent) {
    e.preventDefault();
    setLoading("email");
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    setLoading(null);
    if (!error) setSent(true);
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-6">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Inicia sesión</CardTitle>
          <CardDescription>
            Accede a Academic Formatter AI para empezar a formatear tus trabajos.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          <Button
            variant="outline"
            disabled={!!loading}
            onClick={() => signInWithProvider("google")}
          >
            Continuar con Google
          </Button>
          <Button
            variant="outline"
            disabled={!!loading}
            onClick={() => signInWithProvider("github")}
          >
            Continuar con GitHub
          </Button>

          <div className="my-2 flex items-center gap-2 text-xs text-muted-foreground">
            <div className="h-px flex-1 bg-border" />
            o con correo
            <div className="h-px flex-1 bg-border" />
          </div>

          {sent ? (
            <p className="text-center text-sm text-muted-foreground">
              Te enviamos un enlace de acceso a <strong>{email}</strong>. Revisa tu bandeja.
            </p>
          ) : (
            <form onSubmit={signInWithEmail} className="flex flex-col gap-2">
              <input
                type="email"
                required
                placeholder="tucorreo@ejemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-10 rounded-md border border-input bg-transparent px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
              />
              <Button type="submit" disabled={!!loading}>
                <Mail className="size-4" />
                Enviar enlace mágico
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
