import { ResumeData } from "@/types/resume";

export function Creative({ data }: { data: ResumeData }) {
  const { personalInfo, workExperience, education, skills, projects } = data;

  return (
    <div className="h-full bg-white text-slate-800 font-sans text-sm rounded-lg overflow-hidden shadow-md border-t-8 border-rose-500">
      <div className="p-6">
        {/* Header */}
        <header className="mb-6 flex justify-between items-start">
          <div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tighter">{personalInfo.fullName}</h1>
            {personalInfo.title && <p className="text-rose-500 font-bold uppercase tracking-wider text-xs mt-1">{personalInfo.title}</p>}
          </div>
          <div className="text-right text-xs text-slate-500 space-y-0.5">
            {personalInfo.email && <div>{personalInfo.email}</div>}
            {personalInfo.phone && <div>{personalInfo.phone}</div>}
            {personalInfo.location && <div>{personalInfo.location}</div>}
            {personalInfo.website && <div>{personalInfo.website}</div>}
          </div>
        </header>

        {/* Grid Layout */}
        <div className="grid grid-cols-3 gap-6 mt-4">
          {/* Main Area (Col 1 & 2) */}
          <div className="col-span-2 space-y-6">
            {/* Summary */}
            {personalInfo.summary && (
              <section className="bg-rose-50/50 p-4 rounded-xl border border-rose-100">
                <h2 className="text-sm font-black uppercase text-rose-600 mb-2">Profile</h2>
                <p className="text-slate-600 leading-relaxed">{personalInfo.summary}</p>
              </section>
            )}

            {/* Experience */}
            {workExperience && workExperience.length > 0 && (
              <section>
                <h2 className="text-sm font-black uppercase text-rose-600 mb-3 border-b border-rose-100 pb-1">Experience</h2>
                <div className="space-y-4">
                  {workExperience.map((work) => (
                    <div key={work.id}>
                      <div className="flex justify-between items-baseline">
                        <h3 className="font-bold text-slate-800">{work.position}</h3>
                        <span className="text-xs text-slate-400 font-semibold">{work.startDate} – {work.endDate}</span>
                      </div>
                      <div className="text-xs font-bold text-rose-400 mb-1">{work.company}</div>
                      <p className="text-slate-600 text-xs mt-1">{work.description}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar Area (Col 3) */}
          <div className="space-y-6">
            {/* Skills */}
            {skills && skills.length > 0 && (
              <section>
                <h2 className="text-sm font-black uppercase text-rose-600 mb-2 border-b border-rose-100 pb-1">Skills</h2>
                <div className="flex flex-col space-y-1.5">
                  {skills.map((skill) => (
                    <div key={skill.id} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-rose-500 rounded-full" />
                      <span className="text-xs text-slate-700 font-medium">{skill.name}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Education */}
            {education && education.length > 0 && (
              <section>
                <h2 className="text-sm font-black uppercase text-rose-600 mb-2 border-b border-rose-100 pb-1">Education</h2>
                <div className="space-y-3">
                  {education.map((edu) => (
                    <div key={edu.id}>
                      <h4 className="font-bold text-slate-800 text-xs">{edu.degree}</h4>
                      <p className="text-xs text-slate-600">{edu.school}</p>
                      <p className="text-xs text-slate-400">{edu.startDate} – {edu.endDate}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Projects */}
            {projects && projects.length > 0 && (
              <section>
                <h2 className="text-sm font-black uppercase text-rose-600 mb-2 border-b border-rose-100 pb-1">Projects</h2>
                <div className="space-y-2">
                  {projects.map((project) => (
                    <div key={project.id}>
                      <div className="font-bold text-slate-800 text-xs hover:text-rose-500 cursor-pointer">{project.name}</div>
                      <p className="text-slate-600 text-[11px] leading-tight">{project.description}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
