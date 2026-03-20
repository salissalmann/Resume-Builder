import { ResumeData } from "@/types/resume";

export function Minimal({ data }: { data: ResumeData }) {
  const { personalInfo, workExperience, education, skills, projects } = data;

  return (
    <div className="h-full p-6 bg-white text-gray-800 font-sans text-[11px] leading-relaxed">
      {/* Header */}
      <header className="text-center border-b border-gray-300 pb-3 mb-4">
        <h1 className="text-2xl font-bold uppercase tracking-wider text-gray-900">
          {personalInfo.fullName}
        </h1>
        {personalInfo.title && (
          <p className="text-sm text-gray-500 font-medium mt-0.5">
            {personalInfo.title}
          </p>
        )}
        <div className="flex flex-wrap justify-center gap-x-3 text-[10px] text-gray-500 mt-1.5">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.location && <span>{personalInfo.location}</span>}
          {personalInfo.website && <span>{personalInfo.website}</span>}
        </div>
      </header>

      {/* Summary */}
      {personalInfo.summary && (
        <section className="mb-4">
          <h2 className="text-[10px] font-bold uppercase tracking-widest border-b border-gray-200 mb-1.5 pb-0.5 text-gray-700">
            Professional Summary
          </h2>
          <p className="text-gray-600 leading-relaxed">{personalInfo.summary}</p>
        </section>
      )}

      {/* Experience */}
      {workExperience.length > 0 && (
        <section className="mb-4">
          <h2 className="text-[10px] font-bold uppercase tracking-widest border-b border-gray-200 mb-1.5 pb-0.5 text-gray-700">
            Work Experience
          </h2>
          <div className="space-y-3">
            {workExperience.map((work) => (
              <div key={work.id}>
                <div className="flex justify-between items-baseline">
                  <span className="font-bold text-gray-900">{work.position}</span>
                  <span className="text-[9px] text-gray-400 font-medium">
                    {work.startDate} – {work.endDate}
                  </span>
                </div>
                <div className="flex justify-between items-baseline">
                  <span className="font-semibold text-gray-600">{work.company}</span>
                  <span className="text-[9px] text-gray-400 italic">{work.location}</span>
                </div>
                {work.description && (
                  <p className="text-gray-600 mt-0.5">{work.description}</p>
                )}
                {work.highlights?.length > 0 && (
                  <ul className="list-disc list-inside text-gray-600 mt-0.5 space-y-0.5 pl-1">
                    {work.highlights.map((h, i) => (
                      <li key={i}>{h}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {education.length > 0 && (
        <section className="mb-4">
          <h2 className="text-[10px] font-bold uppercase tracking-widest border-b border-gray-200 mb-1.5 pb-0.5 text-gray-700">
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
                  <p className="text-[10px] text-gray-500">
                    {edu.school}
                    {edu.location && `, ${edu.location}`}
                  </p>
                </div>
                <span className="text-[9px] text-gray-400 shrink-0">
                  {edu.startDate} – {edu.endDate}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <section className="mb-4">
          <h2 className="text-[10px] font-bold uppercase tracking-widest border-b border-gray-200 mb-1.5 pb-0.5 text-gray-700">
            Projects
          </h2>
          <div className="space-y-2">
            {projects.map((project) => (
              <div key={project.id}>
                <div className="flex justify-between items-baseline">
                  <span className="font-bold text-gray-800">{project.name}</span>
                  {project.technologies.length > 0 && (
                    <span className="text-[9px] text-gray-400 italic">
                      [{project.technologies.join(", ")}]
                    </span>
                  )}
                </div>
                <p className="text-gray-600 mt-0.5">{project.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <section>
          <h2 className="text-[10px] font-bold uppercase tracking-widest border-b border-gray-200 mb-1.5 pb-0.5 text-gray-700">
            Skills
          </h2>
          <p className="text-gray-600">
            {skills.map((s) => s.name).join("  ·  ")}
          </p>
        </section>
      )}
    </div>
  );
}
