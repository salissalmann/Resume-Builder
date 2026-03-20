"use client";

import { useResumeStore } from "@/store/useResumeStore";
import { Plus, Trash2, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function FormPanel() {
  const {
    resumeData,
    updatePersonalInfo,
    addWorkExperience,
    updateWorkExperience,
    removeWorkExperience,
    addEducation,
    updateEducation,
    removeEducation,
    addSkill,
    updateSkill,
    removeSkill,
    addProject,
    updateProject,
    removeProject,
  } = useResumeStore();

  const [expandedSection, setExpandedSection] = useState<string | null>("personal");

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const SectionWrapper = ({
    id,
    title,
    children,
  }: {
    id: string;
    title: string;
    children: React.ReactNode;
  }) => {
    const isExpanded = expandedSection === id;
    return (
      <div className="border border-border rounded-xl bg-card overflow-hidden shadow-sm transition-all hover:shadow-md">
        <button
          onClick={() => toggleSection(id)}
          className="w-full px-6 py-4 flex items-center justify-between font-semibold text-foreground bg-secondary/5 hover:bg-secondary/10 transition-colors"
        >
          <span>{title}</span>
          {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="px-6 py-4 space-y-4"
            >
              {children}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  return (
    <div className="space-y-4 p-4 max-w-2xl mx-auto lg:max-w-full">
      <h2 className="text-2xl font-bold mb-6 text-foreground">Resume Details</h2>

      {/* Personal Information */}
      <SectionWrapper id="personal" title="Personal Information">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Full Name</label>
            <input
              type="text"
              value={resumeData.personalInfo.fullName}
              onChange={(e) => updatePersonalInfo({ fullName: e.target.value })}
              className="w-full p-2 border border-border rounded-lg bg-background"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <input
              type="text"
              value={resumeData.personalInfo.title}
              onChange={(e) => updatePersonalInfo({ title: e.target.value })}
              className="w-full p-2 border border-border rounded-lg bg-background"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              value={resumeData.personalInfo.email}
              onChange={(e) => updatePersonalInfo({ email: e.target.value })}
              className="w-full p-2 border border-border rounded-lg bg-background"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Phone</label>
            <input
              type="text"
              value={resumeData.personalInfo.phone}
              onChange={(e) => updatePersonalInfo({ phone: e.target.value })}
              className="w-full p-2 border border-border rounded-lg bg-background"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Location</label>
            <input
              type="text"
              value={resumeData.personalInfo.location}
              onChange={(e) => updatePersonalInfo({ location: e.target.value })}
              className="w-full p-2 border border-border rounded-lg bg-background"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Website</label>
            <input
              type="text"
              value={resumeData.personalInfo.website}
              onChange={(e) => updatePersonalInfo({ website: e.target.value })}
              className="w-full p-2 border border-border rounded-lg bg-background"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1">Summary</label>
            <textarea
              value={resumeData.personalInfo.summary}
              onChange={(e) => updatePersonalInfo({ summary: e.target.value })}
              className="w-full p-2 border border-border rounded-lg bg-background h-24"
            />
          </div>
        </div>
      </SectionWrapper>

      {/* Work Experience */}
      <SectionWrapper id="work" title="Work Experience">
        <div className="space-y-4">
          {resumeData.workExperience.map((work, index) => (
            <div key={work.id} className="p-4 border border-border rounded-lg bg-background/50 relative">
              <button
                onClick={() => removeWorkExperience(work.id)}
                className="absolute top-4 right-4 text-destructive hover:text-destructive/80"
              >
                <Trash2 size={18} />
              </button>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium">Company</label>
                  <input
                    type="text"
                    value={work.company}
                    onChange={(e) => updateWorkExperience(work.id, { company: e.target.value })}
                    className="w-full p-1.5 border border-border rounded-md mt-1"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">Position</label>
                  <input
                    type="text"
                    value={work.position}
                    onChange={(e) => updateWorkExperience(work.id, { position: e.target.value })}
                    className="w-full p-1.5 border border-border rounded-md mt-1"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">Start Date</label>
                  <input
                    type="text"
                    value={work.startDate}
                    onChange={(e) => updateWorkExperience(work.id, { startDate: e.target.value })}
                    className="w-full p-1.5 border border-border rounded-md mt-1"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">End Date</label>
                  <input
                    type="text"
                    value={work.endDate}
                    onChange={(e) => updateWorkExperience(work.id, { endDate: e.target.value })}
                    className="w-full p-1.5 border border-border rounded-md mt-1"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium">Description</label>
                  <textarea
                    value={work.description}
                    onChange={(e) => updateWorkExperience(work.id, { description: e.target.value })}
                    className="w-full p-1.5 border border-border rounded-md mt-1 h-20"
                  />
                </div>
              </div>
            </div>
          ))}
          <button
            onClick={addWorkExperience}
            className="w-full py-2 border border-dashed border-primary/40 rounded-lg text-primary hover:bg-primary/5 flex items-center justify-center gap-2 transition-colors"
          >
            <Plus size={18} /> Add Work Experience
          </button>
        </div>
      </SectionWrapper>

      {/* Education */}
      <SectionWrapper id="education" title="Education">
        <div className="space-y-4">
          {resumeData.education.map((edu) => (
            <div key={edu.id} className="p-4 border border-border rounded-lg bg-background/50 relative">
              <button
                onClick={() => removeEducation(edu.id)}
                className="absolute top-4 right-4 text-destructive hover:text-destructive/80"
              >
                <Trash2 size={18} />
              </button>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium">School</label>
                  <input
                    type="text"
                    value={edu.school}
                    onChange={(e) => updateEducation(edu.id, { school: e.target.value })}
                    className="w-full p-1.5 border border-border rounded-md mt-1"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">Degree</label>
                  <input
                    type="text"
                    value={edu.degree}
                    onChange={(e) => updateEducation(edu.id, { degree: e.target.value })}
                    className="w-full p-1.5 border border-border rounded-md mt-1"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">Field of Study</label>
                  <input
                    type="text"
                    value={edu.fieldOfStudy}
                    onChange={(e) => updateEducation(edu.id, { fieldOfStudy: e.target.value })}
                    className="w-full p-1.5 border border-border rounded-md mt-1"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">Location</label>
                  <input
                    type="text"
                    value={edu.location}
                    onChange={(e) => updateEducation(edu.id, { location: e.target.value })}
                    className="w-full p-1.5 border border-border rounded-md mt-1"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">Start Date</label>
                  <input
                    type="text"
                    value={edu.startDate}
                    onChange={(e) => updateEducation(edu.id, { startDate: e.target.value })}
                    className="w-full p-1.5 border border-border rounded-md mt-1"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">End Date</label>
                  <input
                    type="text"
                    value={edu.endDate}
                    onChange={(e) => updateEducation(edu.id, { endDate: e.target.value })}
                    className="w-full p-1.5 border border-border rounded-md mt-1"
                  />
                </div>
              </div>
            </div>
          ))}
          <button
            onClick={addEducation}
            className="w-full py-2 border border-dashed border-primary/40 rounded-lg text-primary hover:bg-primary/5 flex items-center justify-center gap-2 transition-colors"
          >
            <Plus size={18} /> Add Education
          </button>
        </div>
      </SectionWrapper>

      {/* Skills */}
      <SectionWrapper id="skills" title="Skills">
        <div className="space-y-3">
          <div className="flex flex-wrap gap-2">
            {resumeData.skills.map((skill) => (
              <div key={skill.id} className="flex items-center gap-1 bg-secondary/10 px-3 py-1.5 rounded-full border border-border">
                <input
                  type="text"
                  value={skill.name}
                  onChange={(e) => updateSkill(skill.id, { name: e.target.value })}
                  className="bg-transparent border-none outline-none text-sm w-24"
                />
                <button
                  onClick={() => removeSkill(skill.id)}
                  className="text-destructive hover:text-destructive/80 ml-1"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
          </div>
          <button
            onClick={addSkill}
            className="w-full mt-2 py-1.5 border border-dashed border-primary/40 rounded-lg text-primary hover:bg-primary/5 flex items-center justify-center gap-1 text-sm transition-colors"
          >
            <Plus size={16} /> Add Skill
          </button>
        </div>
      </SectionWrapper>

      {/* Projects */}
      <SectionWrapper id="projects" title="Projects">
        <div className="space-y-4">
          {resumeData.projects.map((project) => (
            <div key={project.id} className="p-4 border border-border rounded-lg bg-background/50 relative">
              <button
                onClick={() => removeProject(project.id)}
                className="absolute top-4 right-4 text-destructive hover:text-destructive/80"
              >
                <Trash2 size={18} />
              </button>
              <div className="grid grid-cols-1 gap-3">
                <div>
                  <label className="block text-sm font-medium">Project Name</label>
                  <input
                    type="text"
                    value={project.name}
                    onChange={(e) => updateProject(project.id, { name: e.target.value })}
                    className="w-full p-1.5 border border-border rounded-md mt-1"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">Description</label>
                  <textarea
                    value={project.description}
                    onChange={(e) => updateProject(project.id, { description: e.target.value })}
                    className="w-full p-1.5 border border-border rounded-md mt-1 h-16"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">Technologies (comma separated)</label>
                  <input
                    type="text"
                    value={project.technologies.join(", ")}
                    onChange={(e) => updateProject(project.id, { technologies: e.target.value.split(",").map(t => t.trim()) })}
                    className="w-full p-1.5 border border-border rounded-md mt-1"
                  />
                </div>
              </div>
            </div>
          ))}
          <button
            onClick={addProject}
            className="w-full py-2 border border-dashed border-primary/40 rounded-lg text-primary hover:bg-primary/5 flex items-center justify-center gap-2 transition-colors"
          >
            <Plus size={18} /> Add Project
          </button>
        </div>
      </SectionWrapper>
    </div>
  );
}
