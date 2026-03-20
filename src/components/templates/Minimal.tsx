import { ResumeData } from "@/types/resume";

export function Minimal({ data }: { data: ResumeData }) {
  const { personalInfo, workExperience, education, skills, projects } = data;

  return (
    <div className="p-4 bg-white text-black font-sans leading-relaxed text-sm">
      {/* Header */}
      <header className="text-center border-b border-gray-300 pb-4 mb-6">
        <h1 className="text-3xl font-extrabold uppercase tracking-wide">{personalInfo.fullName}</h1>
        {personalInfo.title && <p className="text-lg text-gray-600 font-medium mt-1">{personalInfo.title}</p>}
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-xs text-gray-500 mt-2">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.location && <span>{personalInfo.location}</span>}
          {personalInfo.website && <span>{personalInfo.website}</span>}
        </div>
      </header>

      {/* Summary */}
      {personalInfo.summary && (
        <section className="mb-6">
          <h2 className="text-sm font-bold uppercase tracking-wider border-b border-gray-200 mb-2">Professional Summary</h2>
          <p className="text-gray-700 text-justify">{personalInfo.summary}</p>
        </section>
      )}

      {/* Experience */}
      {workExperience && workExperience.length > 0 && (
        <section className="mb-6">
          <h2 className="text-sm font-bold uppercase tracking-wider border-b border-gray-200 mb-2">Work Experience</h2>
          <div className="space-y-4">
            {workExperience.map((work) => (
              <div key={work.id}>
                <div className="flex justify-between items-baseline">
                  <span className="font-bold text-gray-900">{work.position}</span>
                  <span className="text-xs text-gray-500 font-medium">{work.startDate} – {work.endDate}</span>
                </div>
                <div className="flex justify-between items-baseline mb-1">
                  <span className="font-semibold text-gray-700">{work.company}</span>
                  <span className="text-xs text-gray-400 italic">{work.location}</span>
                </div>
                <p className="text-gray-600 mb-1">{work.description}</p>
                {work.highlights && work.highlights.length > 0 && (
                  <ul className="list-disc list-inside text-gray-600 space-y-0.5 pl-2">
                    {work.highlights.map((highlight, idx) => (
                      <li key={idx}>{highlight}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {education && education.length > 0 && (
        <section className="mb-6">
          <h2 className="text-sm font-bold uppercase tracking-wider border-b border-gray-200 mb-2">Education</h2>
          <div className="space-y-2">
            {education.map((edu) => (
              <div key={edu.id} className="flex justify-between items-baseline">
                <div>
                  <span className="font-bold text-gray-800">{edu.degree}</span> in <span className="font-medium text-gray-700">{edu.fieldOfStudy}</span>
                  <p className="text-gray-600 text-xs">{edu.school}, {edu.location}</p>
                </div>
                <span className="text-xs text-gray-500">{edu.startDate} – {edu.endDate}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {projects && projects.length > 0 && (
        <section className="mb-6">
          <h2 className="text-sm font-bold uppercase tracking-wider border-b border-gray-200 mb-2">Projects</h2>
          <div className="space-y-3">
            {projects.map((project) => (
              <div key={project.id}>
                <div className="flex justify-between items-baseline">
                  <span className="font-bold text-gray-800">{project.name}</span>
                  {project.technologies && project.technologies.length > 0 && (
                    <span className="text-xs text-gray-500 italic">[{project.technologies.join(", ")}]</span>
                  )}
                </div>
                <p className="text-gray-600 mt-0.5">{project.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {skills && skills.length > 0 && (
        <section>
          <h2 className="text-sm font-bold uppercase tracking-wider border-b border-gray-200 mb-2">Skills</h2>
          <p className="text-gray-700">
            {skills.map((skill) => skill.name).join(", ")}
          </p>
        </section>
      )}
    </div>
  );
}
