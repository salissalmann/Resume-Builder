import { ResumeData } from "@/types/resume";

export function Modern({ data }: { data: ResumeData }) {
  const { personalInfo, workExperience, education, skills, projects } = data;

  return (
    <div className="flex h-full bg-slate-50 text-slate-800 font-sans text-sm rounded-lg overflow-hidden shadow-md">
      {/* Sidebar */}
      <div className="w-1/3 bg-slate-800 text-slate-100 p-6 flex flex-col">
        <div className="mb-8">
          <h1 className="text-2xl font-bold tracking-tight">{personalInfo.fullName}</h1>
          {personalInfo.title && <p className="text-secondary text-sm mt-1">{personalInfo.title}</p>}
        </div>

        <div className="space-y-6 flex-1">
          {/* Contact */}
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 border-b border-slate-700 pb-1">Contact</h2>
            <div className="space-y-1.5 text-xs text-slate-300">
              {personalInfo.email && <div className="truncate">{personalInfo.email}</div>}
              {personalInfo.phone && <div>{personalInfo.phone}</div>}
              {personalInfo.location && <div>{personalInfo.location}</div>}
              {personalInfo.website && <div className="truncate">{personalInfo.website}</div>}
            </div>
          </div>

          {/* Skills */}
          {skills && skills.length > 0 && (
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 border-b border-slate-700 pb-1">Skills</h2>
              <div className="flex flex-wrap gap-1.5">
                {skills.map((skill) => (
                  <span key={skill.id} className="bg-slate-700 text-slate-200 px-2 py-0.5 rounded text-xs">
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="w-2/3 p-6 bg-white flex flex-col space-y-6">
        {/* Summary */}
        {personalInfo.summary && (
          <section>
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-700 border-b-2 border-slate-200 pb-1 mb-2">About Me</h2>
            <p className="text-slate-600 leading-relaxed text-justify">{personalInfo.summary}</p>
          </section>
        )}

        {/* Experience */}
        {workExperience && workExperience.length > 0 && (
          <section>
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-700 border-b-2 border-slate-200 pb-1 mb-3">Experience</h2>
            <div className="space-y-4">
              {workExperience.map((work) => (
                <div key={work.id} className="relative pl-4 border-l-2 border-slate-200">
                  <div className="absolute w-2 h-2 bg-slate-400 rounded-full -left-[5px] top-1.5" />
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-bold text-slate-800">{work.position}</h3>
                    <span className="text-xs text-slate-400">{work.startDate} – {work.endDate}</span>
                  </div>
                  <div className="text-xs font-semibold text-slate-600 mb-1">{work.company}, {work.location}</div>
                  <p className="text-slate-600 text-xs mt-1">{work.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {education && education.length > 0 && (
          <section>
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-700 border-b-2 border-slate-200 pb-1 mb-2">Education</h2>
            <div className="space-y-3">
              {education.map((edu) => (
                <div key={edu.id}>
                  <div className="flex justify-between items-baseline">
                    <h4 className="font-bold text-slate-800 text-xs">{edu.degree}</h4>
                    <span className="text-xs text-slate-400">{edu.startDate} – {edu.endDate}</span>
                  </div>
                  <div className="text-xs text-slate-600">{edu.school}, {edu.fieldOfStudy}</div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects */}
        {projects && projects.length > 0 && (
          <section>
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-700 border-b-2 border-slate-200 pb-1 mb-2">Projects</h2>
            <div className="space-y-3">
              {projects.map((project) => (
                <div key={project.id}>
                  <div className="font-bold text-slate-800 text-xs">{project.name}</div>
                  <p className="text-slate-600 text-xs">{project.description}</p>
                  {project.technologies && project.technologies.length > 0 && (
                    <div className="text-slate-400 text-xs mt-0.5">Tech: {project.technologies.join(", ")}</div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
