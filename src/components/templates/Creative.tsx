import { ResumeData } from "@/types/resume";

export function Creative({ data }: { data: ResumeData }) {
  const { personalInfo, workExperience, education, skills, projects } = data;

  return (
    <div className="h-full bg-white text-gray-800 font-sans text-[11px] overflow-hidden">
      {/* Orange accent bar */}
      <div className="h-1.5 bg-[#fd5800]" />

      <div className="p-5">
        {/* Header */}
        <header className="mb-4 flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-black text-gray-900 tracking-tight leading-tight">
              {personalInfo.fullName}
            </h1>
            {personalInfo.title && (
              <p className="text-[#fd5800] font-bold uppercase tracking-wider text-[10px] mt-0.5">
                {personalInfo.title}
              </p>
            )}
          </div>
          <div className="text-right text-[10px] text-gray-500 space-y-0.5">
            {personalInfo.email && <div>{personalInfo.email}</div>}
            {personalInfo.phone && <div>{personalInfo.phone}</div>}
            {personalInfo.location && <div>{personalInfo.location}</div>}
            {personalInfo.website && <div>{personalInfo.website}</div>}
          </div>
        </header>

        {/* Grid Layout */}
        <div className="grid grid-cols-3 gap-5">
          {/* Main Area */}
          <div className="col-span-2 space-y-4">
            {/* Summary */}
            {personalInfo.summary && (
              <section className="bg-[#fd5800]/5 p-3 rounded-lg border border-[#fd5800]/10">
                <h2 className="text-[10px] font-black uppercase text-[#fd5800] mb-1">
                  Profile
                </h2>
                <p className="text-gray-600 leading-relaxed">{personalInfo.summary}</p>
              </section>
            )}

            {/* Experience */}
            {workExperience.length > 0 && (
              <section>
                <h2 className="text-[10px] font-black uppercase text-[#fd5800] mb-2 border-b border-[#fd5800]/15 pb-0.5">
                  Experience
                </h2>
                <div className="space-y-3">
                  {workExperience.map((work) => (
                    <div key={work.id}>
                      <div className="flex justify-between items-baseline">
                        <h3 className="font-bold text-gray-800">{work.position}</h3>
                        <span className="text-[9px] text-gray-400 font-medium">
                          {work.startDate} – {work.endDate}
                        </span>
                      </div>
                      <p className="text-[10px] font-bold text-[#fd5800]/60 mb-0.5">
                        {work.company}
                      </p>
                      {work.description && (
                        <p className="text-gray-600 text-[10px]">{work.description}</p>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Skills */}
            {skills.length > 0 && (
              <section>
                <h2 className="text-[10px] font-black uppercase text-[#fd5800] mb-1.5 border-b border-[#fd5800]/15 pb-0.5">
                  Skills
                </h2>
                <div className="flex flex-col space-y-1">
                  {skills.map((skill) => (
                    <div key={skill.id} className="flex items-center gap-1.5">
                      <span className="w-1 h-1 bg-[#fd5800] rounded-full shrink-0" />
                      <span className="text-[10px] text-gray-700 font-medium">
                        {skill.name}
                      </span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Education */}
            {education.length > 0 && (
              <section>
                <h2 className="text-[10px] font-black uppercase text-[#fd5800] mb-1.5 border-b border-[#fd5800]/15 pb-0.5">
                  Education
                </h2>
                <div className="space-y-2">
                  {education.map((edu) => (
                    <div key={edu.id}>
                      <h4 className="font-bold text-gray-800 text-[10px]">{edu.degree}</h4>
                      <p className="text-[10px] text-gray-600">{edu.school}</p>
                      <p className="text-[9px] text-gray-400">
                        {edu.startDate} – {edu.endDate}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Projects */}
            {projects.length > 0 && (
              <section>
                <h2 className="text-[10px] font-black uppercase text-[#fd5800] mb-1.5 border-b border-[#fd5800]/15 pb-0.5">
                  Projects
                </h2>
                <div className="space-y-2">
                  {projects.map((project) => (
                    <div key={project.id}>
                      <h4 className="font-bold text-gray-800 text-[10px]">
                        {project.name}
                      </h4>
                      <p className="text-gray-600 text-[9px] leading-tight">
                        {project.description}
                      </p>
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
