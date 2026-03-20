"use client";

import { useResumeStore } from "@/store/useResumeStore";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Plus,
  Trash2,
  User,
  Briefcase,
  GraduationCap,
  Wrench,
  FolderOpen,
} from "lucide-react";

function FieldGroup({ children }: { children: React.ReactNode }) {
  return <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">{children}</div>;
}

function Field({
  label,
  children,
  full,
}: {
  label: string;
  children: React.ReactNode;
  full?: boolean;
}) {
  return (
    <div className={full ? "sm:col-span-2" : ""}>
      <Label className="mb-1.5 text-xs font-medium text-muted-foreground">
        {label}
      </Label>
      {children}
    </div>
  );
}

function EntryCard({
  children,
  onRemove,
}: {
  children: React.ReactNode;
  onRemove: () => void;
}) {
  return (
    <div className="relative rounded-lg border border-border bg-card p-4 transition-colors hover:border-border/80">
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-2 top-2 h-7 w-7 text-muted-foreground hover:text-destructive cursor-pointer"
        onClick={onRemove}
      >
        <Trash2 className="h-3.5 w-3.5" />
      </Button>
      <div className="pr-8">{children}</div>
    </div>
  );
}

function AddButton({ onClick, label }: { onClick: () => void; label: string }) {
  return (
    <Button
      variant="outline"
      className="w-full border-dashed text-muted-foreground hover:text-primary hover:border-primary/40 cursor-pointer"
      onClick={onClick}
    >
      <Plus className="mr-2 h-4 w-4" />
      {label}
    </Button>
  );
}

function SectionIcon({ icon: Icon }: { icon: React.ElementType }) {
  return (
    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded bg-primary/10 text-primary">
      <Icon className="h-3.5 w-3.5" />
    </div>
  );
}

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

  return (
    <div className="p-5">
      <div className="mb-5">
        <h2 className="font-[family-name:var(--font-poppins)] text-lg font-semibold">
          Resume Details
        </h2>
        <p className="text-sm text-muted-foreground">
          Fill in your information below
        </p>
      </div>

      <Accordion
        multiple
        defaultValue={["personal"]}
        className="space-y-3"
      >
        {/* Personal Information */}
        <AccordionItem value="personal" className="rounded-lg border border-border bg-card px-4">
          <AccordionTrigger className="py-3 text-sm font-medium hover:no-underline [&>svg]:h-4 [&>svg]:w-4">
            <div className="flex items-center gap-2.5">
              <SectionIcon icon={User} />
              Personal Information
            </div>
          </AccordionTrigger>
          <AccordionContent className="pb-4">
            <FieldGroup>
              <Field label="Full Name">
                <Input
                  value={resumeData.personalInfo.fullName}
                  onChange={(e) => updatePersonalInfo({ fullName: e.target.value })}
                  placeholder="John Doe"
                />
              </Field>
              <Field label="Job Title">
                <Input
                  value={resumeData.personalInfo.title || ""}
                  onChange={(e) => updatePersonalInfo({ title: e.target.value })}
                  placeholder="Software Engineer"
                />
              </Field>
              <Field label="Email">
                <Input
                  type="email"
                  value={resumeData.personalInfo.email}
                  onChange={(e) => updatePersonalInfo({ email: e.target.value })}
                  placeholder="john@example.com"
                />
              </Field>
              <Field label="Phone">
                <Input
                  value={resumeData.personalInfo.phone}
                  onChange={(e) => updatePersonalInfo({ phone: e.target.value })}
                  placeholder="+1 (555) 123-4567"
                />
              </Field>
              <Field label="Location">
                <Input
                  value={resumeData.personalInfo.location}
                  onChange={(e) => updatePersonalInfo({ location: e.target.value })}
                  placeholder="New York, USA"
                />
              </Field>
              <Field label="Website">
                <Input
                  value={resumeData.personalInfo.website || ""}
                  onChange={(e) => updatePersonalInfo({ website: e.target.value })}
                  placeholder="johndoe.dev"
                />
              </Field>
              <Field label="Professional Summary" full>
                <Textarea
                  value={resumeData.personalInfo.summary}
                  onChange={(e) => updatePersonalInfo({ summary: e.target.value })}
                  placeholder="Brief overview of your experience and strengths..."
                  className="min-h-[80px] resize-none"
                />
              </Field>
            </FieldGroup>
          </AccordionContent>
        </AccordionItem>

        {/* Work Experience */}
        <AccordionItem value="work" className="rounded-lg border border-border bg-card px-4">
          <AccordionTrigger className="py-3 text-sm font-medium hover:no-underline [&>svg]:h-4 [&>svg]:w-4">
            <div className="flex items-center gap-2.5">
              <SectionIcon icon={Briefcase} />
              Work Experience
              <Badge variant="secondary" className="ml-1 text-[10px] px-1.5 py-0">
                {resumeData.workExperience.length}
              </Badge>
            </div>
          </AccordionTrigger>
          <AccordionContent className="pb-4">
            <div className="space-y-3">
              {resumeData.workExperience.map((work) => (
                <EntryCard key={work.id} onRemove={() => removeWorkExperience(work.id)}>
                  <FieldGroup>
                    <Field label="Company">
                      <Input
                        value={work.company}
                        onChange={(e) =>
                          updateWorkExperience(work.id, { company: e.target.value })
                        }
                        placeholder="Company name"
                      />
                    </Field>
                    <Field label="Position">
                      <Input
                        value={work.position}
                        onChange={(e) =>
                          updateWorkExperience(work.id, { position: e.target.value })
                        }
                        placeholder="Job title"
                      />
                    </Field>
                    <Field label="Start Date">
                      <Input
                        value={work.startDate}
                        onChange={(e) =>
                          updateWorkExperience(work.id, { startDate: e.target.value })
                        }
                        placeholder="Jan 2022"
                      />
                    </Field>
                    <Field label="End Date">
                      <Input
                        value={work.endDate}
                        onChange={(e) =>
                          updateWorkExperience(work.id, { endDate: e.target.value })
                        }
                        placeholder="Present"
                      />
                    </Field>
                    <Field label="Location" full>
                      <Input
                        value={work.location}
                        onChange={(e) =>
                          updateWorkExperience(work.id, { location: e.target.value })
                        }
                        placeholder="San Francisco, CA"
                      />
                    </Field>
                    <Field label="Description" full>
                      <Textarea
                        value={work.description}
                        onChange={(e) =>
                          updateWorkExperience(work.id, { description: e.target.value })
                        }
                        placeholder="What did you do in this role?"
                        className="min-h-[60px] resize-none"
                      />
                    </Field>
                  </FieldGroup>
                </EntryCard>
              ))}
              <AddButton onClick={addWorkExperience} label="Add Experience" />
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Education */}
        <AccordionItem value="education" className="rounded-lg border border-border bg-card px-4">
          <AccordionTrigger className="py-3 text-sm font-medium hover:no-underline [&>svg]:h-4 [&>svg]:w-4">
            <div className="flex items-center gap-2.5">
              <SectionIcon icon={GraduationCap} />
              Education
              <Badge variant="secondary" className="ml-1 text-[10px] px-1.5 py-0">
                {resumeData.education.length}
              </Badge>
            </div>
          </AccordionTrigger>
          <AccordionContent className="pb-4">
            <div className="space-y-3">
              {resumeData.education.map((edu) => (
                <EntryCard key={edu.id} onRemove={() => removeEducation(edu.id)}>
                  <FieldGroup>
                    <Field label="School">
                      <Input
                        value={edu.school}
                        onChange={(e) =>
                          updateEducation(edu.id, { school: e.target.value })
                        }
                        placeholder="University of Technology"
                      />
                    </Field>
                    <Field label="Degree">
                      <Input
                        value={edu.degree}
                        onChange={(e) =>
                          updateEducation(edu.id, { degree: e.target.value })
                        }
                        placeholder="Bachelor of Science"
                      />
                    </Field>
                    <Field label="Field of Study">
                      <Input
                        value={edu.fieldOfStudy}
                        onChange={(e) =>
                          updateEducation(edu.id, { fieldOfStudy: e.target.value })
                        }
                        placeholder="Computer Science"
                      />
                    </Field>
                    <Field label="Location">
                      <Input
                        value={edu.location}
                        onChange={(e) =>
                          updateEducation(edu.id, { location: e.target.value })
                        }
                        placeholder="Boston, MA"
                      />
                    </Field>
                    <Field label="Start Date">
                      <Input
                        value={edu.startDate}
                        onChange={(e) =>
                          updateEducation(edu.id, { startDate: e.target.value })
                        }
                        placeholder="Sep 2018"
                      />
                    </Field>
                    <Field label="End Date">
                      <Input
                        value={edu.endDate}
                        onChange={(e) =>
                          updateEducation(edu.id, { endDate: e.target.value })
                        }
                        placeholder="May 2022"
                      />
                    </Field>
                  </FieldGroup>
                </EntryCard>
              ))}
              <AddButton onClick={addEducation} label="Add Education" />
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Skills */}
        <AccordionItem value="skills" className="rounded-lg border border-border bg-card px-4">
          <AccordionTrigger className="py-3 text-sm font-medium hover:no-underline [&>svg]:h-4 [&>svg]:w-4">
            <div className="flex items-center gap-2.5">
              <SectionIcon icon={Wrench} />
              Skills
              <Badge variant="secondary" className="ml-1 text-[10px] px-1.5 py-0">
                {resumeData.skills.length}
              </Badge>
            </div>
          </AccordionTrigger>
          <AccordionContent className="pb-4">
            <div className="space-y-3">
              <div className="flex flex-wrap gap-2">
                {resumeData.skills.map((skill) => (
                  <div
                    key={skill.id}
                    className="group flex items-center gap-1.5 rounded-full border border-border bg-secondary/50 py-1 pl-3 pr-1.5 transition-colors hover:border-primary/30"
                  >
                    <input
                      type="text"
                      value={skill.name}
                      onChange={(e) =>
                        updateSkill(skill.id, { name: e.target.value })
                      }
                      className="w-20 bg-transparent text-xs outline-none placeholder:text-muted-foreground"
                      placeholder="Skill"
                    />
                    <button
                      onClick={() => removeSkill(skill.id)}
                      className="flex h-5 w-5 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive cursor-pointer"
                    >
                      <Trash2 className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
              <AddButton onClick={addSkill} label="Add Skill" />
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Projects */}
        <AccordionItem value="projects" className="rounded-lg border border-border bg-card px-4">
          <AccordionTrigger className="py-3 text-sm font-medium hover:no-underline [&>svg]:h-4 [&>svg]:w-4">
            <div className="flex items-center gap-2.5">
              <SectionIcon icon={FolderOpen} />
              Projects
              <Badge variant="secondary" className="ml-1 text-[10px] px-1.5 py-0">
                {resumeData.projects.length}
              </Badge>
            </div>
          </AccordionTrigger>
          <AccordionContent className="pb-4">
            <div className="space-y-3">
              {resumeData.projects.map((project) => (
                <EntryCard
                  key={project.id}
                  onRemove={() => removeProject(project.id)}
                >
                  <div className="space-y-4">
                    <Field label="Project Name">
                      <Input
                        value={project.name}
                        onChange={(e) =>
                          updateProject(project.id, { name: e.target.value })
                        }
                        placeholder="Portfolio Tracker"
                      />
                    </Field>
                    <Field label="Description">
                      <Textarea
                        value={project.description}
                        onChange={(e) =>
                          updateProject(project.id, {
                            description: e.target.value,
                          })
                        }
                        placeholder="What does this project do?"
                        className="min-h-[60px] resize-none"
                      />
                    </Field>
                    <Field label="Technologies (comma separated)">
                      <Input
                        value={project.technologies.join(", ")}
                        onChange={(e) =>
                          updateProject(project.id, {
                            technologies: e.target.value
                              .split(",")
                              .map((t) => t.trim()),
                          })
                        }
                        placeholder="React, TypeScript, Tailwind"
                      />
                    </Field>
                  </div>
                </EntryCard>
              ))}
              <AddButton onClick={addProject} label="Add Project" />
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <Separator className="my-6" />

      <p className="text-center text-xs text-muted-foreground pb-4">
        Your data is stored locally and never sent to any server.
      </p>
    </div>
  );
}
