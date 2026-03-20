"use client";

import { FormPanel } from "@/components/FormPanel";
import { PreviewPanel } from "@/components/PreviewPanel";
import { useResumeStore } from "@/store/useResumeStore";
import { TemplateId } from "@/types/resume";
import { downloadPDF, downloadDOCX } from "@/lib/exportUtils";
import { Download, FileText } from "lucide-react";

export default function Home() {
  const { activeTemplate, setActiveTemplate, resumeData } = useResumeStore();

  const templates: { id: TemplateId; name: string }[] = [
    { id: "minimal", name: "Minimal" },
    { id: "modern", name: "Modern" },
    { id: "creative", name: "Creative" },
    { id: "professional", name: "Professional" },
  ];

  const handleExportPDF = () => {
    const filename = `${resumeData.personalInfo.fullName.replace(/\s+/g, "_")}_Resume`;
    downloadPDF("resume-preview", filename);
  };

  const handleExportDOCX = () => {
    const filename = `${resumeData.personalInfo.fullName.replace(/\s+/g, "_")}_Resume`;
    downloadDOCX(resumeData, filename);
  };

  return (
    <main className="flex flex-col lg:flex-row h-screen overflow-hidden">
      {/* Left sidebar / Form Panel */}
      <div className="w-full lg:w-1/2 h-full overflow-y-auto bg-background/50 border-r border-border backdrop-blur-sm">
        <div className="p-4 border-b border-border flex justify-between items-center bg-card/80 sticky top-0 z-10">
          <h1 className="text-xl font-bold text-foreground">Resume Builder</h1>
          <div className="flex items-center gap-2">
            {/* Template Selector */}
            <select
              value={activeTemplate}
              onChange={(e) => setActiveTemplate(e.target.value as TemplateId)}
              className="p-1.5 border border-border rounded-lg bg-background text-sm font-medium"
            >
              {templates.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name}
                </option>
              ))}
            </select>

            {/* Export Buttons */}
            <button
              onClick={handleExportPDF}
              className="px-3 py-1.5 bg-primary text-primary-foreground rounded-lg text-sm font-medium flex items-center gap-1.5 shadow-sm hover:bg-primary/90 transition-colors"
            >
              <Download size={16} /> PDF
            </button>
            <button
              onClick={handleExportDOCX}
              className="px-3 py-1.5 bg-secondary text-secondary-foreground rounded-lg text-sm font-medium flex items-center gap-1.5 shadow-sm hover:bg-secondary/90 transition-colors"
            >
              <FileText size={16} /> DOCX
            </button>
          </div>
        </div>
        <FormPanel />
      </div>

      {/* Right Side / Preview Panel */}
      <div className="w-full lg:w-1/2 h-full bg-slate-100 dark:bg-zinc-950 flex items-center justify-center p-6 overflow-y-auto">
        <div className="w-full max-w-[210mm]">
          <PreviewPanel />
        </div>
      </div>
    </main>
  );
}
