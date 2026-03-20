import type { Metadata } from "next";
import { Poppins, Geist } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist-sans" });

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "ResumeKit — Build Professional Resumes",
  description:
    "Create stunning, ATS-friendly resumes in minutes. Choose from 4 professional templates, export as PDF or DOCX.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("h-full antialiased", geist.variable, poppins.variable)}>
      <body className="min-h-full bg-background text-foreground">{children}</body>
    </html>
  );
}
