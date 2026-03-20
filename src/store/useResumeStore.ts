import { create } from "zustand";
import { ResumeData, TemplateId, WorkExperience, Education, Skill, Project } from "@/types/resume";

interface ResumeState {
  resumeData: ResumeData;
  activeTemplate: TemplateId;

  setResumeData: (data: ResumeData) => void;
  setActiveTemplate: (template: TemplateId) => void;
  updatePersonalInfo: (info: Partial<ResumeData["personalInfo"]>) => void;

  addWorkExperience: () => void;
  updateWorkExperience: (id: string, data: Partial<WorkExperience>) => void;
  removeWorkExperience: (id: string) => void;

  addEducation: () => void;
  updateEducation: (id: string, data: Partial<Education>) => void;
  removeEducation: (id: string) => void;

  addSkill: () => void;
  updateSkill: (id: string, data: Partial<Skill>) => void;
  removeSkill: (id: string) => void;

  addProject: () => void;
  updateProject: (id: string, data: Partial<Project>) => void;
  removeProject: (id: string) => void;
}

const initialResumeData: ResumeData = {
  personalInfo: {
    fullName: "Sarah Mitchell",
    email: "sarah.mitchell@email.com",
    phone: "+1 (415) 892-3047",
    location: "San Francisco, CA",
    title: "Senior Full-Stack Engineer",
    summary:
      "Results-driven Full-Stack Engineer with 6+ years of experience designing, building, and scaling high-performance web applications. Proven ability to lead cross-functional teams, architect microservice systems, and deliver user-centric products that drive measurable business outcomes. Passionate about clean code, developer experience, and mentoring junior engineers.",
    website: "sarahmitchell.dev",
  },
  workExperience: [
    {
      id: "1",
      company: "Stripe",
      position: "Senior Software Engineer",
      location: "San Francisco, CA",
      startDate: "Mar 2022",
      endDate: "Present",
      current: true,
      description:
        "Lead engineer on the Payments Dashboard team, responsible for the merchant-facing analytics platform serving 500K+ businesses. Architected a real-time data pipeline reducing dashboard load times by 40%. Mentored 4 junior engineers and established team coding standards.",
      highlights: [
        "Redesigned checkout flow increasing conversion rates by 12%",
        "Built internal tooling that reduced deploy times from 25min to 8min",
        "Led migration from REST to GraphQL for 15+ API endpoints",
      ],
    },
    {
      id: "2",
      company: "Airbnb",
      position: "Software Engineer",
      location: "San Francisco, CA",
      startDate: "Jun 2019",
      endDate: "Feb 2022",
      current: false,
      description:
        "Full-stack development on the Search & Discovery team. Built and maintained React components for the listing search experience used by 150M+ users. Implemented A/B testing framework and contributed to the design system.",
      highlights: [
        "Improved search relevance scoring, boosting booking rate by 8%",
        "Developed reusable component library adopted across 6 teams",
      ],
    },
    {
      id: "3",
      company: "Figma",
      position: "Junior Developer",
      location: "Remote",
      startDate: "Jan 2018",
      endDate: "May 2019",
      current: false,
      description:
        "Contributed to the collaborative design platform's plugin ecosystem and real-time rendering engine. Built REST API integrations and wrote comprehensive unit and integration tests.",
      highlights: [],
    },
  ],
  education: [
    {
      id: "1",
      school: "University of California, Berkeley",
      degree: "Bachelor of Science",
      fieldOfStudy: "Computer Science",
      location: "Berkeley, CA",
      startDate: "Aug 2014",
      endDate: "May 2018",
    },
  ],
  skills: [
    { id: "1", name: "React" },
    { id: "2", name: "Next.js" },
    { id: "3", name: "TypeScript" },
    { id: "4", name: "Node.js" },
    { id: "5", name: "Python" },
    { id: "6", name: "PostgreSQL" },
    { id: "7", name: "GraphQL" },
    { id: "8", name: "AWS" },
    { id: "9", name: "Docker" },
    { id: "10", name: "Tailwind CSS" },
  ],
  projects: [
    {
      id: "1",
      name: "DevMetrics",
      description:
        "Open-source developer productivity dashboard that integrates with GitHub, Jira, and Slack to visualize team velocity, PR cycle times, and deployment frequency. 2.4K stars on GitHub.",
      technologies: ["Next.js", "Python", "PostgreSQL", "Docker"],
    },
    {
      id: "2",
      name: "QuickForm",
      description:
        "Drag-and-drop form builder SaaS with conditional logic, file uploads, and webhook integrations. Handles 50K+ form submissions per month across 200+ active users.",
      technologies: ["React", "Node.js", "MongoDB", "Stripe"],
    },
  ],
};

export const useResumeStore = create<ResumeState>((set) => ({
  resumeData: initialResumeData,
  activeTemplate: "minimal",

  setResumeData: (data) => set({ resumeData: data }),
  setActiveTemplate: (template) => set({ activeTemplate: template }),

  updatePersonalInfo: (info) =>
    set((state) => ({
      resumeData: {
        ...state.resumeData,
        personalInfo: { ...state.resumeData.personalInfo, ...info },
      },
    })),

  addWorkExperience: () =>
    set((state) => ({
      resumeData: {
        ...state.resumeData,
        workExperience: [
          ...state.resumeData.workExperience,
          {
            id: crypto.randomUUID(),
            company: "",
            position: "",
            location: "",
            startDate: "",
            endDate: "",
            current: false,
            description: "",
            highlights: [],
          },
        ],
      },
    })),

  updateWorkExperience: (id, data) =>
    set((state) => ({
      resumeData: {
        ...state.resumeData,
        workExperience: state.resumeData.workExperience.map((item) =>
          item.id === id ? { ...item, ...data } : item
        ),
      },
    })),

  removeWorkExperience: (id) =>
    set((state) => ({
      resumeData: {
        ...state.resumeData,
        workExperience: state.resumeData.workExperience.filter((item) => item.id !== id),
      },
    })),

  addEducation: () =>
    set((state) => ({
      resumeData: {
        ...state.resumeData,
        education: [
          ...state.resumeData.education,
          {
            id: crypto.randomUUID(),
            school: "",
            degree: "",
            fieldOfStudy: "",
            location: "",
            startDate: "",
            endDate: "",
          },
        ],
      },
    })),

  updateEducation: (id, data) =>
    set((state) => ({
      resumeData: {
        ...state.resumeData,
        education: state.resumeData.education.map((item) =>
          item.id === id ? { ...item, ...data } : item
        ),
      },
    })),

  removeEducation: (id) =>
    set((state) => ({
      resumeData: {
        ...state.resumeData,
        education: state.resumeData.education.filter((item) => item.id !== id),
      },
    })),

  addSkill: () =>
    set((state) => ({
      resumeData: {
        ...state.resumeData,
        skills: [...state.resumeData.skills, { id: crypto.randomUUID(), name: "" }],
      },
    })),

  updateSkill: (id, data) =>
    set((state) => ({
      resumeData: {
        ...state.resumeData,
        skills: state.resumeData.skills.map((item) =>
          item.id === id ? { ...item, ...data } : item
        ),
      },
    })),

  removeSkill: (id) =>
    set((state) => ({
      resumeData: {
        ...state.resumeData,
        skills: state.resumeData.skills.filter((item) => item.id !== id),
      },
    })),

  addProject: () =>
    set((state) => ({
      resumeData: {
        ...state.resumeData,
        projects: [
          ...state.resumeData.projects,
          {
            id: crypto.randomUUID(),
            name: "",
            description: "",
            technologies: [],
          },
        ],
      },
    })),

  updateProject: (id, data) =>
    set((state) => ({
      resumeData: {
        ...state.resumeData,
        projects: state.resumeData.projects.map((item) =>
          item.id === id ? { ...item, ...data } : item
        ),
      },
    })),

  removeProject: (id) =>
    set((state) => ({
      resumeData: {
        ...state.resumeData,
        projects: state.resumeData.projects.filter((item) => item.id !== id),
      },
    })),
}));
