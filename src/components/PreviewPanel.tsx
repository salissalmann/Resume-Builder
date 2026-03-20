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
    <div id="resume-preview" className="shadow-2xl rounded-xl overflow-hidden aspect-[1/1.414] w-full bg-white print:shadow-none print:rounded-none">
      {renderTemplate()}
    </div>
  );
}
