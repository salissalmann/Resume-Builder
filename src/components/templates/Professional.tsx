import { ResumeData } from "@/types/resume";

export function Professional({ data }: { data: ResumeData }) {
  const { personalInfo, workExperience, education, skills, projects } = data;

  return (
    <div className="h-full bg-white text-gray-800 font-serif leading-normal p-8 rounded-lg shadow-md">
      {/* Header */}
      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold tracking-wide text-cyan-900">{personalInfo.fullName}</h1>
        {personalInfo.title && <p className="text-sm font-semibold text-gray-600 mt-1 uppercase tracking-wider">{personalInfo.title}</p>}
        <div className="flex justify-center gap-4 text-xs text-gray-500 mt-2 font-sans">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.location && <span>{personalInfo.location}</span>}
        </div>
      </header>

      {/* Main Content */}
      <div className="space-y-6">
        {/* Summary */}
        {personalInfo.summary && (
          <section>
            <h2 className="text-sm font-bold uppercase tracking-wider text-cyan-900 border-b-2 border-cyan-800 mb-2 font-sans">Executive Summary</h2>
            <p className="text-gray-700 text-justify text-sm">{personalInfo.summary}</p>
          </section>
        )}

        {/* Experience */}
        {workExperience && workExperience.length > 0 && (
          <section>
            <h2 className="text-sm font-bold uppercase tracking-wider text-cyan-900 border-b-2 border-cyan-800 mb-2 font-sans">Professional Experience</h2>
            <div className="space-y-4">
              {workExperience.map((work) => (
                <div key={work.id}>
                  <div className="flex justify-between items-baseline mb-0.5">
                    <h3 className="font-bold text-gray-800 text-sm">{work.position}</h3>
                    <span className="text-xs text-gray-600 font-sans">{work.startDate} – {work.endDate}</span>
                  </div>
                  <div className="flex justify-between items-baseline mb-1">
                    <span className="font-bold text-cyan-700 text-xs font-sans">{work.company}</span>
                    <span className="text-xs text-gray-400 font-sans">{work.location}</span>
                  </div>
                  <p className="text-gray-600 text-xs text-justify mb-1">{work.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {education && education.length > 0 && (
          <section>
            <h2 className="text-sm font-bold uppercase tracking-wider text-cyan-900 border-b-2 border-cyan-800 mb-2 font-sans">Education</h2>
            <div className="space-y-3">
              {education.map((edu) => (
                <div key={edu.id} className="flex justify-between items-baseline">
                  <div>
                    <h4 className="font-bold text-gray-800 text-sm">{edu.degree}</h4>
                    <p className="text-xs text-gray-600 font-sans">{edu.school}, {edu.fieldOfStudy}</p>
                  </div>
                  <span className="text-xs text-gray-500 font-sans">{edu.startDate} – {edu.endDate}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Core Layout split for Skills & Projects */}
        <div className="grid grid-cols-2 gap-6">
          {/* Skills */}
          {skills && skills.length > 0 && (
            <section>
              <h2 className="text-sm font-bold uppercase tracking-wider text-cyan-900 border-b border-cyan-800 mb-2 font-sans">Key Competencies</h2>
              <ul className="grid grid-cols-2 gap-y-1 list-disc list-inside text-gray-700 text-xs">
                {skills.map((skill) => (
                  <li key={skill.id}>{skill.name}</li>
                ))}
              </ul>
            </section>
          )}

          {/* Projects */}
          {projects && projects.length > 0 && (
            <section>
              <h2 className="text-sm font-bold uppercase tracking-wider text-cyan-900 border-b border-cyan-800 mb-2 font-sans">Notable Projects</h2>
              <div className="space-y-2">
                {projects.map((project) => (
                  <div key={project.id}>
                    <h4 className="font-bold text-gray-800 text-xs">{project.name}</h4>
                    <p className="text-gray-600 text-xs leading-tight">{project.description}</p>
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
