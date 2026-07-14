import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ThemeToggle } from "@/components/theme-toggle";
import { CheckCircle2, FileText, Sparkles } from "lucide-react";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b border-border/60 px-6 backdrop-blur-md">
        <span className="text-sm font-semibold tracking-tight">
          Academic Formatter <span className="text-muted-foreground">AI</span>
        </span>
        <ThemeToggle />
      </header>

      <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col items-center justify-center gap-8 px-6 py-24 text-center">
        <span className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground">
          Módulo 0 — Setup completo
        </span>

        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
          Tu trabajo académico,
          <br className="hidden sm:block" /> perfecto en segundos.
        </h1>

        <p className="max-w-xl text-muted-foreground">
          Este es el esqueleto base del producto: Next.js + TypeScript + Tailwind +
          componentes estilo shadcn/ui, listo para construir el editor, el motor de
          normas y la exportación en los siguientes módulos.
        </p>

        <div className="flex gap-3">
          <Button size="lg">Empezar ahora</Button>
          <Button size="lg" variant="outline">
            Ver cómo funciona
          </Button>
        </div>

        <div className="glass mt-8 grid w-full grid-cols-1 gap-4 rounded-xl p-6 text-left sm:grid-cols-3">
          <Card className="border-0 bg-transparent shadow-none">
            <CardHeader className="p-0">
              <FileText className="mb-2 size-5" />
              <CardTitle className="text-sm">Múltiples formatos</CardTitle>
              <CardDescription>APA, IEEE, ICONTEC, MLA, Chicago, Harvard.</CardDescription>
            </CardHeader>
          </Card>
          <Card className="border-0 bg-transparent shadow-none">
            <CardHeader className="p-0">
              <Sparkles className="mb-2 size-5" />
              <CardTitle className="text-sm">Editor con IA</CardTitle>
              <CardDescription>Redacción, corrección y referencias automáticas.</CardDescription>
            </CardHeader>
          </Card>
          <Card className="border-0 bg-transparent shadow-none">
            <CardHeader className="p-0">
              <CheckCircle2 className="mb-2 size-5" />
              <CardTitle className="text-sm">Revisión en vivo</CardTitle>
              <CardDescription>Checklist automático de cumplimiento de norma.</CardDescription>
            </CardHeader>
          </Card>
        </div>
      </main>

      <footer className="border-t border-border/60 px-6 py-6 text-center text-xs text-muted-foreground">
        Academic Formatter AI — MVP en construcción (Módulo 0/10)
      </footer>
    </div>
  );
}
