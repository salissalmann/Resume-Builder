import { ResumeData } from "@/types/resume";

export function Professional({ data }: { data: ResumeData }) {
  const { personalInfo, workExperience, education, skills, projects } = data;

  return (
    <div className="h-full bg-white text-gray-800 leading-normal p-6 font-sans text-[11px]">
      {/* Header */}
      <header className="text-center mb-5 pb-3 border-b-2 border-[#1a365d]">
        <h1 className="text-2xl font-bold tracking-wide text-[#1a365d]">
          {personalInfo.fullName}
        </h1>
        {personalInfo.title && (
          <p className="text-[10px] font-semibold text-gray-500 mt-0.5 uppercase tracking-wider">
            {personalInfo.title}
          </p>
        )}
        <div className="flex justify-center gap-3 text-[10px] text-gray-500 mt-1.5">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.location && <span>{personalInfo.location}</span>}
          {personalInfo.website && <span>{personalInfo.website}</span>}
        </div>
      </header>

      <div className="space-y-4">
        {/* Summary */}
        {personalInfo.summary && (
          <section>
            <h2 className="text-[10px] font-bold uppercase tracking-widest text-[#1a365d] border-b border-[#1a365d]/30 mb-1.5 pb-0.5">
              Executive Summary
            </h2>
            <p className="text-gray-600 leading-relaxed">{personalInfo.summary}</p>
          </section>
        )}

        {/* Experience */}
        {workExperience.length > 0 && (
          <section>
            <h2 className="text-[10px] font-bold uppercase tracking-widest text-[#1a365d] border-b border-[#1a365d]/30 mb-1.5 pb-0.5">
              Professional Experience
            </h2>
            <div className="space-y-3">
              {workExperience.map((work) => (
                <div key={work.id}>
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-bold text-gray-800">{work.position}</h3>
                    <span className="text-[9px] text-gray-500">
                      {work.startDate} – {work.endDate}
                    </span>
                  </div>
                  <div className="flex justify-between items-baseline mb-0.5">
                    <span className="font-semibold text-[#1a365d]/70 text-[10px]">
                      {work.company}
                    </span>
                    <span className="text-[9px] text-gray-400">{work.location}</span>
                  </div>
                  {work.description && (
                    <p className="text-gray-600 text-[10px]">{work.description}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {education.length > 0 && (
          <section>
            <h2 className="text-[10px] font-bold uppercase tracking-widest text-[#1a365d] border-b border-[#1a365d]/30 mb-1.5 pb-0.5">
              Education
            </h2>
            <div className="space-y-2">
              {education.map((edu) => (
                <div key={edu.id} className="flex justify-between items-baseline">
                  <div>
                    <span className="font-bold text-gray-800">{edu.degree}</span>
                    {edu.fieldOfStudy && (
                      <span className="text-gray-600"> in {edu.fieldOfStudy}</span>
                    )}
                    <p className="text-[10px] text-gray-500">{edu.school}</p>
                  </div>
                  <span className="text-[9px] text-gray-400 shrink-0">
                    {edu.startDate} – {edu.endDate}
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills & Projects grid */}
        <div className="grid grid-cols-2 gap-5">
          {skills.length > 0 && (
            <section>
              <h2 className="text-[10px] font-bold uppercase tracking-widest text-[#1a365d] border-b border-[#1a365d]/30 mb-1.5 pb-0.5">
                Key Competencies
              </h2>
              <ul className="grid grid-cols-2 gap-y-0.5 list-disc list-inside text-gray-600 text-[10px]">
                {skills.map((skill) => (
                  <li key={skill.id}>{skill.name}</li>
                ))}
              </ul>
            </section>
          )}

          {projects.length > 0 && (
            <section>
              <h2 className="text-[10px] font-bold uppercase tracking-widest text-[#1a365d] border-b border-[#1a365d]/30 mb-1.5 pb-0.5">
                Notable Projects
              </h2>
              <div className="space-y-1.5">
                {projects.map((project) => (
                  <div key={project.id}>
                    <h4 className="font-bold text-gray-800 text-[10px]">{project.name}</h4>
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
  );
}
