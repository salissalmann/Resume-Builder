import { ResumeData } from "@/types/resume";

export const downloadPDF = async (elementId: string, filename: string) => {
  if (typeof window === "undefined") return;

  // Dynamic imports to prevent SSR build errors (e.g., jspdf references node/worker)
  const html2canvas = (await import("html2canvas")).default;
  const jsPDF = (await import("jspdf")).default;

  const element = document.getElementById(elementId);
  if (!element) return;

  const canvas = await html2canvas(element, { scale: 2 });
  const imgData = canvas.toDataURL("image/png");
  const pdf = new jsPDF("p", "mm", "a4");
  const imgWidth = 210;
  const pageHeight = 295;
  const imgHeight = (canvas.height * imgWidth) / canvas.width;
  let heightLeft = imgHeight;
  let position = 0;

  pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
  heightLeft -= pageHeight;

  while (heightLeft >= 0) {
    position = heightLeft - imgHeight;
    pdf.addPage();
    pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;
  }
  pdf.save(`${filename}.pdf`);
};

export const downloadDOCX = async (data: ResumeData, filename: string) => {
  if (typeof window === "undefined") return;

  // Dynamic import for docx
  const { Document, Packer, Paragraph, TextRun, HeadingLevel } = await import("docx");
  const { personalInfo, workExperience, education, skills, projects } = data;

  const children: any[] = [
    new Paragraph({
      text: personalInfo.fullName,
      heading: HeadingLevel.HEADING_1,
      alignment: "center" as any,
    }),
    new Paragraph({
      text: `${personalInfo.title ? `${personalInfo.title} | ` : ""}${personalInfo.email} | ${personalInfo.phone} | ${personalInfo.location}`,
      alignment: "center" as any,
    }),
    new Paragraph({ text: "" }), // Spacing
  ];

  if (personalInfo.summary) {
    children.push(new Paragraph({ text: "SUMMARY", heading: HeadingLevel.HEADING_2 }));
    children.push(new Paragraph({ text: personalInfo.summary }));
    children.push(new Paragraph({ text: "" }));
  }

  if (workExperience.length > 0) {
    children.push(new Paragraph({ text: "EXPERIENCE", heading: HeadingLevel.HEADING_2 }));
    workExperience.forEach((work) => {
      children.push(
        new Paragraph({
          children: [
            new TextRun({ text: work.position, bold: true }),
            new TextRun({ text: ` at ${work.company} (${work.startDate} - ${work.endDate})`, italics: true }),
          ],
        })
      );
      if (work.description) {
        children.push(new Paragraph({ text: work.description }));
      }
      children.push(new Paragraph({ text: "" }));
    });
  }

  if (education.length > 0) {
    children.push(new Paragraph({ text: "EDUCATION", heading: HeadingLevel.HEADING_2 }));
    education.forEach((edu) => {
      children.push(
        new Paragraph({
          children: [
            new TextRun({ text: `${edu.degree} in ${edu.fieldOfStudy}`, bold: true }),
            new TextRun({ text: ` | ${edu.school} (${edu.startDate} - ${edu.endDate})` }),
          ],
        })
      );
      children.push(new Paragraph({ text: "" }));
    });
  }

  if (skills.length > 0) {
    children.push(new Paragraph({ text: "SKILLS", heading: HeadingLevel.HEADING_2 }));
    children.push(new Paragraph({ text: skills.map((s) => s.name).join(", ") }));
    children.push(new Paragraph({ text: "" }));
  }

  if (projects.length > 0) {
    children.push(new Paragraph({ text: "PROJECTS", heading: HeadingLevel.HEADING_2 }));
    projects.forEach((project) => {
      children.push(new Paragraph({ text: project.name, children: [new TextRun({ text: project.name, bold: true })] }));
      children.push(new Paragraph({ text: project.description }));
      children.push(new Paragraph({ text: "" }));
    });
  }

  const doc = new Document({
    sections: [{ properties: {}, children }],
  });

  const blob = await Packer.toBlob(doc);
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${filename}.docx`;
  a.click();
  window.URL.revokeObjectURL(url);
};
