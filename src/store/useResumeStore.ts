import { create } from "zustand";
import { ResumeData, TemplateId, WorkExperience, Education, Skill, Project } from "@/types/resume";

interface ResumeState {
  resumeData: ResumeData;
  activeTemplate: TemplateId;
  
  // Actions
  setResumeData: (data: ResumeData) => void;
  setActiveTemplate: (template: TemplateId) => void;
  
  // Section Updates
  updatePersonalInfo: (info: Partial<ResumeData["personalInfo"]>) => void;
  
  // Work Experience
  addWorkExperience: () => void;
  updateWorkExperience: (id: string, data: Partial<WorkExperience>) => void;
  removeWorkExperience: (id: string) => void;
  
  // Education
  addEducation: () => void;
  updateEducation: (id: string, data: Partial<Education>) => void;
  removeEducation: (id: string) => void;
  
  // Skills
  addSkill: () => void;
  updateSkill: (id: string, data: Partial<Skill>) => void;
  removeSkill: (id: string) => void;
  
  // Projects
  addProject: () => void;
  updateProject: (id: string, data: Partial<Project>) => void;
  removeProject: (id: string) => void;
}

const initialResumeData: ResumeData = {
  personalInfo: {
    fullName: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    location: "New York, USA",
    title: "Software Engineer",
    summary: "Dedicated and efficient Software Engineer with 4+ years of experience in building scalable web applications.",
    website: "johndoe.dev",
  },
  workExperience: [
    {
      id: "1",
      company: "Tech Corp",
      position: "Frontend Developer",
      location: "San Francisco, CA",
      startDate: "Jan 2022",
      endDate: "Present",
      current: true,
      description: "Working on modern React applications and improving performance.",
      highlights: [
        "Led the migration to Next.js reducing load times by 30%",
        "Mentored 2 junior developers",
      ],
    },
  ],
  education: [
    {
      id: "1",
      school: "University of Technology",
      degree: "Bachelor of Science",
      fieldOfStudy: "Computer Science",
      location: "Boston, MA",
      startDate: "Sep 2018",
      endDate: "May 2022",
    },
  ],
  skills: [
    { id: "1", name: "React" },
    { id: "2", name: "TypeScript" },
    { id: "3", name: "Tailwind CSS" },
  ],
  projects: [
    {
      id: "1",
      name: "Portfolio Tracker",
      description: "A dashboard to track stock portfolio and dividends.",
      technologies: ["Next.js", "Zustand", "Recharts"],
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
            highlights: [""],
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
