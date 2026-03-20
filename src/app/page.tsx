"use client";

import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { motion } from "framer-motion";
import {
  ArrowRight,
  FileText,
  Layers,
  Download,
  Sparkles,
  Zap,
  Shield,
  Eye,
  Pencil,
  ChevronRight,
} from "lucide-react";

const features = [
  {
    icon: Sparkles,
    title: "Live Split-Screen Editor",
    description:
      "Watch your resume transform in real-time. Every keystroke instantly reflected in a pixel-perfect preview.",
  },
  {
    icon: Layers,
    title: "4 Pro Templates",
    description:
      "Minimal, Modern, Creative & Professional layouts — each engineered to pass ATS scanners effortlessly.",
  },
  {
    icon: Download,
    title: "PDF & DOCX Export",
    description:
      "Download pixel-perfect PDFs or fully editable DOCX files. Your formatting stays pristine, always.",
  },
];

const steps = [
  {
    icon: Pencil,
    num: "01",
    title: "Enter Your Details",
    description:
      "Fill in your experience, education, skills & projects using our structured form panels.",
  },
  {
    icon: Eye,
    num: "02",
    title: "Preview & Customize",
    description:
      "Switch between 4 templates and watch your resume render live in the split-screen editor.",
  },
  {
    icon: Download,
    num: "03",
    title: "Export & Apply",
    description:
      "Download as PDF or DOCX in one click. Your resume is ready to send to employers.",
  },
];

const templates = [
  {
    name: "Minimal",
    description: "Clean, distraction-free layout optimized for ATS parsing.",
  },
  {
    name: "Modern",
    description: "Sidebar layout with accent colors and a structured timeline.",
  },
  {
    name: "Creative",
    description:
      "Bold headers with modern typography and vibrant color accents.",
  },
  {
    name: "Professional",
    description: "Corporate style with clean hierarchy and refined spacing.",
  },
];

const stats = [
  { value: "4", label: "Pro Templates" },
  { value: "2", label: "Export Formats" },
  { value: "0", label: "Sign-up Required" },
  { value: "∞", label: "Resumes Free" },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden selection:bg-primary/20">
      <Navbar />

      {/* ═══════════ HERO ═══════════ */}
      <section className="relative min-h-screen flex items-center justify-center px-6">
        {/* Background effects */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Grid pattern */}
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(253,88,0,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(253,88,0,0.4) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />
          {/* Gradient orbs */}
          <div className="absolute top-1/4 -left-32 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[150px] animate-[float_8s_ease-in-out_infinite]" />
          <div className="absolute bottom-1/4 -right-32 w-[500px] h-[500px] bg-orange-400/10 rounded-full blur-[150px] animate-[float_10s_ease-in-out_infinite_2s]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-amber-500/5 rounded-full blur-[200px]" />
        </div>

        {/* Hero content */}
        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-5 py-2 text-xs font-medium text-primary backdrop-blur-sm shadow-[0_0_15px_rgba(253,88,0,0.06)]"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            NEXT-GEN RESUME BUILDER
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-[family-name:var(--font-poppins)] text-5xl sm:text-7xl lg:text-8xl font-extrabold leading-[0.95] tracking-tight"
          >
            <span className="text-foreground">Craft Resumes</span>
            <br />
            <span className="bg-gradient-to-r from-primary via-orange-500 to-amber-500 bg-clip-text text-transparent">
              That Break Through
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mx-auto max-w-2xl text-lg sm:text-xl text-muted-foreground leading-relaxed"
          >
            Build ATS-optimized resumes in minutes. Choose from 4 professional
            templates, customize live, and export instantly — no sign-up needed.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
          >
            <Link href="/builder">
              <button className="group relative h-14 px-10 rounded-2xl bg-primary text-primary-foreground font-semibold text-base shadow-[0_0_30px_rgba(253,88,0,0.2)] hover:shadow-[0_0_50px_rgba(253,88,0,0.35)] transition-all duration-300 cursor-pointer flex items-center gap-2 overflow-hidden">
                <span className="relative z-10">Launch Builder</span>
                <ArrowRight className="relative z-10 h-4 w-4 transition-transform group-hover:translate-x-1" />
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              </button>
            </Link>
            <a href="#templates">
              <button className="h-14 px-10 rounded-2xl border border-border text-muted-foreground font-semibold text-base hover:bg-secondary hover:text-foreground transition-all duration-300 cursor-pointer backdrop-blur-sm">
                See Templates
              </button>
            </a>
          </motion.div>
        </div>

        {/* Bottom stats bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="absolute bottom-12 left-0 right-0 z-10"
        >
          <div className="mx-auto max-w-3xl px-6">
            <div className="flex items-center justify-center gap-8 sm:gap-16">
              {stats.map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="text-2xl sm:text-3xl font-extrabold text-foreground font-[family-name:var(--font-poppins)]">
                    {stat.value}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* ═══════════ FEATURES ═══════════ */}
      <section id="features" className="relative py-32 px-6">
        {/* Section divider */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <span className="text-primary text-xs font-semibold tracking-[0.2em] uppercase">
              Features
            </span>
            <h2 className="font-[family-name:var(--font-poppins)] text-4xl sm:text-5xl font-extrabold mt-4 text-foreground">
              Built for{" "}
              <span className="text-primary">Precision</span>
            </h2>
            <p className="mt-4 text-muted-foreground max-w-lg mx-auto">
              Every feature designed to help you create the perfect resume,
              faster.
            </p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-3">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative rounded-2xl border border-border hover:border-primary/30 bg-card transition-all duration-500 hover:shadow-[0_8px_30px_rgba(253,88,0,0.08)]"
              >
                <div className="relative rounded-2xl p-8 h-full flex flex-col">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary mb-6 shadow-lg">
                    <feature.icon className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Secondary features strip */}
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {[
              { icon: Zap, text: "Zero sign-up friction" },
              { icon: Shield, text: "ATS-friendly optimization" },
              { icon: Sparkles, text: "Instant real-time rendering" },
            ].map((item, i) => (
              <motion.div
                key={item.text}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="flex items-center gap-3 rounded-xl border border-border bg-secondary/50 px-5 py-4"
              >
                <item.icon className="h-4 w-4 text-primary shrink-0" />
                <span className="text-sm text-muted-foreground">
                  {item.text}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ HOW IT WORKS ═══════════ */}
      <section id="how-it-works" className="relative py-32 px-6">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[1px] bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <span className="text-primary text-xs font-semibold tracking-[0.2em] uppercase">
              Process
            </span>
            <h2 className="font-[family-name:var(--font-poppins)] text-4xl sm:text-5xl font-extrabold mt-4 text-foreground">
              Three Steps to{" "}
              <span className="text-primary">Launch</span>
            </h2>
            <p className="mt-4 text-muted-foreground max-w-lg mx-auto">
              From blank page to job-ready resume in under 10 minutes.
            </p>
          </motion.div>

          <div className="relative grid gap-8 md:grid-cols-3">
            {/* Connecting line (desktop only) */}
            <div className="hidden md:block absolute top-10 left-[calc(16.67%+24px)] right-[calc(16.67%+24px)] h-[1px] bg-gradient-to-r from-primary/30 via-orange-400/30 to-primary/30" />

            {steps.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="relative text-center md:text-left"
              >
                <div className="relative inline-flex h-20 w-20 items-center justify-center rounded-2xl border border-border bg-secondary/50 mb-6 mx-auto md:mx-0">
                  <step.icon className="h-8 w-8 text-primary" />
                  <span className="absolute -top-2 -right-2 flex h-7 w-7 items-center justify-center rounded-lg bg-primary text-[10px] font-bold text-primary-foreground shadow-[0_0_15px_rgba(253,88,0,0.3)]">
                    {step.num}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ TEMPLATES ═══════════ */}
      <section id="templates" className="relative py-32 px-6">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <span className="text-primary text-xs font-semibold tracking-[0.2em] uppercase">
              Templates
            </span>
            <h2 className="font-[family-name:var(--font-poppins)] text-4xl sm:text-5xl font-extrabold mt-4 text-foreground">
              Choose Your{" "}
              <span className="text-primary">Layout</span>
            </h2>
            <p className="mt-4 text-muted-foreground max-w-lg mx-auto">
              Four professionally designed templates. Each one ATS-tested and
              ready to impress.
            </p>
          </motion.div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {templates.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative"
              >
                <div className="relative rounded-2xl border border-border bg-card hover:border-primary/30 p-6 h-full flex flex-col min-h-[220px] transition-all duration-500 hover:shadow-[0_8px_30px_rgba(253,88,0,0.08)]">
                  <span className="text-5xl font-black font-[family-name:var(--font-poppins)] text-primary/15 group-hover:text-primary/30 transition-colors">
                    0{i + 1}
                  </span>
                  <div className="mt-auto">
                    <h3 className="text-base font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
                      {t.name}
                    </h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {t.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 text-center"
          >
            <Link href="/builder">
              <button className="group relative h-14 px-12 rounded-2xl bg-primary text-primary-foreground font-semibold text-base shadow-[0_0_30px_rgba(253,88,0,0.2)] hover:shadow-[0_0_50px_rgba(253,88,0,0.35)] transition-all duration-300 cursor-pointer inline-flex items-center gap-2 mx-auto overflow-hidden">
                <span className="relative z-10">Try All Templates</span>
                <ArrowRight className="relative z-10 h-4 w-4 transition-transform group-hover:translate-x-1" />
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              </button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ═══════════ CTA ═══════════ */}
      <section className="relative py-32 px-6">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.03] to-transparent" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[1px] bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative z-10 max-w-3xl mx-auto text-center space-y-8"
        >
          <h2 className="font-[family-name:var(--font-poppins)] text-4xl sm:text-5xl font-extrabold text-foreground">
            Ready to Build Your
            <br />
            <span className="bg-gradient-to-r from-primary via-orange-500 to-amber-500 bg-clip-text text-transparent">
              Future?
            </span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Join thousands of job seekers who craft stunning resumes with
            ResumeKit. No account. No cost. Just results.
          </p>
          <div>
            <Link href="/builder">
              <button className="group relative h-16 px-14 rounded-2xl bg-primary text-primary-foreground font-bold text-lg shadow-[0_0_40px_rgba(253,88,0,0.25)] hover:shadow-[0_0_60px_rgba(253,88,0,0.4)] transition-all duration-300 cursor-pointer inline-flex items-center gap-3 mx-auto mt-4 overflow-hidden">
                <span className="relative z-10">Start Building Now</span>
                <ChevronRight className="relative z-10 h-5 w-5 transition-transform group-hover:translate-x-1" />
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              </button>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* ═══════════ FOOTER ═══════════ */}
      <footer className="relative border-t border-border py-8 px-6">
        <div className="mx-auto max-w-6xl flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-lg bg-primary flex items-center justify-center shadow-[0_0_10px_rgba(253,88,0,0.15)]">
              <FileText className="h-3.5 w-3.5 text-primary-foreground" />
            </div>
            <span className="font-bold text-foreground">ResumeKit</span>
          </div>
          <p>© 2026 ResumeKit. Crafted for the future.</p>
        </div>
      </footer>
    </div>
  );
}
