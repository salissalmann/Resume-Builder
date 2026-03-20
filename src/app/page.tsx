import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import {
  ArrowRight,
  FileText,
  Layers,
  Download,
  Sparkles,
  CheckCircle2,
} from "lucide-react";

const features = [
  {
    icon: Layers,
    title: "4 Pro Templates",
    description:
      "Minimal, Modern, Creative, and Professional designs — switch instantly with live preview.",
  },
  {
    icon: Download,
    title: "PDF & DOCX Export",
    description:
      "Download your resume in print-ready PDF or editable DOCX format with one click.",
  },
  {
    icon: Sparkles,
    title: "Real-time Preview",
    description:
      "See every change reflected instantly in a split-screen editor with live rendering.",
  },
];

const bullets = [
  "ATS-friendly formatting",
  "Add unlimited entries",
  "No sign-up required",
  "Saves to local storage",
  "Export as JSON backup",
  "Mobile responsive",
];

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      {/* Hero */}
      <section className="flex flex-1 flex-col items-center justify-center px-6 pt-20 pb-16">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-secondary/60 px-4 py-1.5 text-sm text-muted-foreground">
            <FileText className="h-3.5 w-3.5 text-primary" />
            Free & open source resume builder
          </div>

          <h1 className="font-[family-name:var(--font-poppins)] text-5xl font-bold leading-[1.1] tracking-tight sm:text-6xl lg:text-7xl">
            Build a resume that
            <span className="text-primary"> stands out</span>
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
            Create professional, ATS-friendly resumes in minutes. Choose a
            template, fill in your details, and export — it&apos;s that simple.
          </p>

          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link href="/builder">
              <Button size="lg" className="gap-2 text-base px-8 cursor-pointer">
                Start Building
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="#features">
              <Button
                variant="outline"
                size="lg"
                className="text-base px-8 cursor-pointer"
              >
                See Features
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="border-t border-border bg-card/50 px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <div className="mb-12 text-center">
            <h2 className="font-[family-name:var(--font-poppins)] text-3xl font-bold tracking-tight sm:text-4xl">
              Everything you need
            </h2>
            <p className="mt-3 text-muted-foreground">
              No bloat. No accounts. Just a clean, fast resume builder.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-3">
            {features.map((f) => (
              <div
                key={f.title}
                className="group rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/30 hover:shadow-sm"
              >
                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <f.icon className="h-5 w-5" />
                </div>
                <h3 className="mb-2 font-semibold">{f.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {f.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bullets */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-3xl">
          <div className="rounded-xl border border-border bg-card p-8">
            <h3 className="mb-6 text-center font-[family-name:var(--font-poppins)] text-xl font-semibold">
              Also included
            </h3>
            <div className="grid gap-3 sm:grid-cols-2">
              {bullets.map((b) => (
                <div key={b} className="flex items-center gap-3 text-sm">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" />
                  <span>{b}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border px-6 py-8">
        <div className="mx-auto flex max-w-6xl items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded bg-primary">
              <FileText className="h-3 w-3 text-primary-foreground" />
            </div>
            <span className="font-medium text-foreground">ResumeKit</span>
          </div>
          <span>Built with Next.js & Tailwind CSS</span>
        </div>
      </footer>
    </div>
  );
}
