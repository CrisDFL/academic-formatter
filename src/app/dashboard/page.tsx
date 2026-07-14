import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { SignOutButton } from "./sign-out-button";
import { ThemeToggle } from "@/components/theme-toggle";

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  return (
    <div className="flex min-h-screen flex-col">
      <header className="flex h-16 items-center justify-between border-b border-border/60 px-6">
        <span className="text-sm font-semibold tracking-tight">
          Academic Formatter <span className="text-muted-foreground">AI</span>
        </span>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <SignOutButton />
        </div>
      </header>
      <main className="flex flex-1 flex-col items-center justify-center gap-2 px-6 text-center">
        <p className="text-sm text-muted-foreground">Sesión iniciada como</p>
        <p className="text-lg font-medium">{user.email}</p>
        <p className="mt-6 max-w-md text-sm text-muted-foreground">
          Este dashboard vacío confirma que la autenticación funciona de extremo
          a extremo. El editor real llega en el Módulo 2.
        </p>
      </main>
    </div>
  );
}
