import { ResumeData } from "@/types/resume";

export function Modern({ data }: { data: ResumeData }) {
  const { personalInfo, workExperience, education, skills, projects } = data;

  return (
    <div className="flex h-full bg-white text-gray-800 font-sans text-[11px] overflow-hidden">
      {/* Sidebar */}
      <div className="w-[35%] bg-[#1e1e1e] text-gray-100 p-5 flex flex-col">
        <div className="mb-6">
          <h1 className="text-lg font-bold tracking-tight leading-tight">
            {personalInfo.fullName}
          </h1>
          {personalInfo.title && (
            <p className="text-[#fd5800] text-[10px] font-medium mt-0.5">
              {personalInfo.title}
            </p>
          )}
        </div>

        {/* Contact */}
        <div className="mb-5">
          <h2 className="text-[9px] font-bold uppercase tracking-widest text-gray-400 mb-1.5 border-b border-gray-700 pb-1">
            Contact
          </h2>
          <div className="space-y-1 text-[10px] text-gray-300">
            {personalInfo.email && <div className="truncate">{personalInfo.email}</div>}
            {personalInfo.phone && <div>{personalInfo.phone}</div>}
            {personalInfo.location && <div>{personalInfo.location}</div>}
            {personalInfo.website && <div className="truncate">{personalInfo.website}</div>}
          </div>
        </div>

        {/* Skills */}
        {skills.length > 0 && (
          <div className="mb-5">
            <h2 className="text-[9px] font-bold uppercase tracking-widest text-gray-400 mb-1.5 border-b border-gray-700 pb-1">
              Skills
            </h2>
            <div className="flex flex-wrap gap-1">
              {skills.map((skill) => (
                <span
                  key={skill.id}
                  className="bg-gray-700 text-gray-200 px-1.5 py-0.5 rounded text-[9px]"
                >
                  {skill.name}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Education (sidebar) */}
        {education.length > 0 && (
          <div>
            <h2 className="text-[9px] font-bold uppercase tracking-widest text-gray-400 mb-1.5 border-b border-gray-700 pb-1">
              Education
            </h2>
            <div className="space-y-2">
              {education.map((edu) => (
                <div key={edu.id}>
                  <p className="font-semibold text-[10px] text-gray-200">{edu.degree}</p>
                  <p className="text-[9px] text-gray-400">{edu.school}</p>
                  <p className="text-[9px] text-gray-500">
                    {edu.startDate} – {edu.endDate}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="w-[65%] p-5 flex flex-col space-y-4">
        {/* Summary */}
        {personalInfo.summary && (
          <section>
            <h2 className="text-[10px] font-bold uppercase tracking-widest text-gray-700 border-b-2 border-[#fd5800]/30 pb-0.5 mb-1.5">
              About Me
            </h2>
            <p className="text-gray-600 leading-relaxed">{personalInfo.summary}</p>
          </section>
        )}

        {/* Experience */}
        {workExperience.length > 0 && (
          <section>
            <h2 className="text-[10px] font-bold uppercase tracking-widest text-gray-700 border-b-2 border-[#fd5800]/30 pb-0.5 mb-2">
              Experience
            </h2>
            <div className="space-y-3">
              {workExperience.map((work) => (
                <div key={work.id} className="relative pl-3 border-l-2 border-gray-200">
                  <div className="absolute w-1.5 h-1.5 bg-[#fd5800] rounded-full -left-[4px] top-1" />
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-bold text-gray-800 text-[11px]">{work.position}</h3>
                    <span className="text-[9px] text-gray-400">
                      {work.startDate} – {work.endDate}
                    </span>
                  </div>
                  <p className="text-[10px] font-medium text-[#fd5800]/70 mb-0.5">
                    {work.company}
                    {work.location && `, ${work.location}`}
                  </p>
                  {work.description && (
                    <p className="text-gray-600 text-[10px]">{work.description}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <section>
            <h2 className="text-[10px] font-bold uppercase tracking-widest text-gray-700 border-b-2 border-[#fd5800]/30 pb-0.5 mb-1.5">
              Projects
            </h2>
            <div className="space-y-2">
              {projects.map((project) => (
                <div key={project.id}>
                  <h4 className="font-bold text-gray-800 text-[10px]">{project.name}</h4>
                  <p className="text-gray-600 text-[10px]">{project.description}</p>
                  {project.technologies.length > 0 && (
                    <p className="text-gray-400 text-[9px] mt-0.5">
                      {project.technologies.join(" · ")}
                    </p>
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
