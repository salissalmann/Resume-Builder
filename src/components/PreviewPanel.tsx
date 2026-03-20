"use client";

import { useResumeStore } from "@/store/useResumeStore";
import { Minimal } from "./templates/Minimal";
import { Modern } from "./templates/Modern";
import { Creative } from "./templates/Creative";
import { Professional } from "./templates/Professional";

export function PreviewPanel() {
  const { resumeData, activeTemplate } = useResumeStore();

  const renderTemplate = () => {
    switch (activeTemplate) {
      case "minimal":
        return <Minimal data={resumeData} />;
      case "modern":
        return <Modern data={resumeData} />;
      case "creative":
        return <Creative data={resumeData} />;
      case "professional":
        return <Professional data={resumeData} />;
      default:
        return <Minimal data={resumeData} />;
    }
  };

  return (
    <div
      id="resume-preview"
      className="w-full min-h-0 aspect-[1/1.414] rounded-lg bg-white shadow-lg ring-1 ring-black/5 print:shadow-none print:rounded-none print:ring-0"
    >
      {renderTemplate()}
    </div>
  );
}
