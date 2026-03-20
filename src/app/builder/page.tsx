"use client";

import Link from "next/link";
import { FormPanel } from "@/components/FormPanel";
import { PreviewPanel } from "@/components/PreviewPanel";
import { useResumeStore } from "@/store/useResumeStore";
import { TemplateId } from "@/types/resume";
import { downloadPDF, downloadDOCX } from "@/lib/exportUtils";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ArrowLeft,
  Download,
  FileText,
  FileDown,
  Loader2,
} from "lucide-react";
import { useState } from "react";

const templates: { id: TemplateId; name: string }[] = [
  { id: "minimal", name: "Minimal" },
  { id: "modern", name: "Modern" },
  { id: "creative", name: "Creative" },
  { id: "professional", name: "Professional" },
];

export default function BuilderPage() {
  const { activeTemplate, setActiveTemplate, resumeData } = useResumeStore();
  const [exportingPDF, setExportingPDF] = useState(false);
  const [exportingDOCX, setExportingDOCX] = useState(false);

  const handleExportPDF = async () => {
    setExportingPDF(true);
    const filename = `${resumeData.personalInfo.fullName.replace(/\s+/g, "_")}_Resume`;
    await downloadPDF("resume-preview", filename);
    setExportingPDF(false);
  };

  const handleExportDOCX = async () => {
    setExportingDOCX(true);
    const filename = `${resumeData.personalInfo.fullName.replace(/\s+/g, "_")}_Resume`;
    await downloadDOCX(resumeData, filename, activeTemplate);
    setExportingDOCX(false);
  };

  return (
    <div className="flex h-screen flex-col overflow-hidden">
      {/* Top Bar */}
      <header className="flex h-14 shrink-0 items-center justify-between border-b border-border bg-card/80 px-4 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <Link href="/">
            <Button variant="ghost" size="icon" className="h-8 w-8 cursor-pointer">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary">
              <FileText className="h-3.5 w-3.5 text-primary-foreground" />
            </div>
            <span className="text-sm font-semibold font-[family-name:var(--font-poppins)]">
              ResumeKit
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Select
            value={activeTemplate}
            onValueChange={(v) => setActiveTemplate(v as TemplateId)}
          >
            <SelectTrigger className="h-8 w-[140px] text-xs capitalize">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {templates.map((t) => (
                <SelectItem key={t.id} value={t.id} className="capitalize">
                  {t.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button
            variant="outline"
            size="sm"
            className="gap-1.5 text-xs cursor-pointer"
            onClick={handleExportPDF}
            disabled={exportingPDF}
          >
            {exportingPDF ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <Download className="h-3.5 w-3.5" />
            )}
            PDF
          </Button>

          <Button
            variant="outline"
            size="sm"
            className="gap-1.5 text-xs cursor-pointer"
            onClick={handleExportDOCX}
            disabled={exportingDOCX}
          >
            {exportingDOCX ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <FileDown className="h-3.5 w-3.5" />
            )}
            DOCX
          </Button>
        </div>
      </header>

      {/* Split Screen */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left: Form (scrollable) */}
        <div className="w-full lg:w-1/2 overflow-y-auto border-r border-border bg-background">
          <FormPanel />
        </div>

        {/* Right: Preview (fixed) */}
        <div className="hidden lg:flex lg:w-1/2 items-start justify-center overflow-y-auto bg-secondary/40 p-6">
          <div className="w-full max-w-[595px]">
            <PreviewPanel />
          </div>
        </div>
      </div>
    </div>
  );
}
