import { ResumeData } from "@/types/resume";

export const downloadPDF = async (elementId: string, filename: string) => {
  if (typeof window === "undefined") return;

  const { toCanvas } = await import("html-to-image");
  const jsPDF = (await import("jspdf")).default;

  const element = document.getElementById(elementId);
  if (!element) return;

  // Store original styles
  const saved = {
    width: element.style.width,
    height: element.style.height,
    maxWidth: element.style.maxWidth,
    aspectRatio: element.style.aspectRatio,
    overflow: element.style.overflow,
    borderRadius: element.style.borderRadius,
    boxShadow: element.style.boxShadow,
  };

  // A4 proportions: 210mm x 297mm → 794 x 1123px
  const captureWidth = 794;
  const pageHeightPx = 1123;
  const pixelRatio = 2;

  // Set fixed width, let height be natural
  element.style.width = `${captureWidth}px`;
  element.style.height = "auto";
  element.style.maxWidth = "none";
  element.style.aspectRatio = "auto";
  element.style.overflow = "visible";
  element.style.borderRadius = "0";
  element.style.boxShadow = "none";

  await new Promise((r) => setTimeout(r, 150));

  try {
    // html-to-image uses SVG foreignObject → browser renders CSS natively
    // No oklch/oklab parsing issues
    const canvas = await toCanvas(element, {
      pixelRatio,
      backgroundColor: "#ffffff",
      width: captureWidth,
      height: element.scrollHeight,
      style: {
        margin: "0",
        transform: "none",
      },
    });

    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = 210;
    const pdfHeight = 297;

    const scaledPageHeight = pageHeightPx * pixelRatio;
    const totalPages = Math.max(
      1,
      Math.ceil(canvas.height / scaledPageHeight)
    );

    for (let page = 0; page < totalPages; page++) {
      if (page > 0) pdf.addPage();

      const pageCanvas = document.createElement("canvas");
      pageCanvas.width = captureWidth * pixelRatio;
      pageCanvas.height = scaledPageHeight;
      const ctx = pageCanvas.getContext("2d")!;

      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, pageCanvas.width, pageCanvas.height);

      const srcY = page * scaledPageHeight;
      const srcHeight = Math.min(scaledPageHeight, canvas.height - srcY);
      ctx.drawImage(
        canvas,
        0,
        srcY,
        canvas.width,
        srcHeight,
        0,
        0,
        canvas.width,
        srcHeight
      );

      const pageImgData = pageCanvas.toDataURL("image/png", 1.0);
      pdf.addImage(pageImgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    }

    pdf.save(`${filename}.pdf`);
  } finally {
    // Restore original styles
    Object.assign(element.style, saved);
  }
};

export const downloadDOCX = async (
  data: ResumeData,
  filename: string,
  template: import("@/types/resume").TemplateId = "minimal"
) => {
  if (typeof window === "undefined") return;

  const {
    Document,
    Packer,
    Paragraph,
    TextRun,
    AlignmentType,
    BorderStyle,
    Table,
    TableRow,
    TableCell,
    WidthType,
    ShadingType,
  } = await import("docx");

  const { personalInfo, workExperience, education, skills, projects } = data;

  // Template-specific color palettes
  const palettes = {
    minimal: { accent: "333333", heading: "1a1a1a", sub: "666666", muted: "999999", border: "cccccc" },
    modern: { accent: "fd5800", heading: "1e1e1e", sub: "fd5800", muted: "888888", border: "fd5800" },
    creative: { accent: "fd5800", heading: "1a1a1a", sub: "fd5800", muted: "888888", border: "fd5800" },
    professional: { accent: "1a365d", heading: "1a365d", sub: "1a365d", muted: "666666", border: "1a365d" },
  };
  const c = palettes[template];

  const sectionLabels = {
    minimal: { summary: "PROFESSIONAL SUMMARY", work: "WORK EXPERIENCE", edu: "EDUCATION", skills: "SKILLS", projects: "PROJECTS" },
    modern: { summary: "ABOUT ME", work: "EXPERIENCE", edu: "EDUCATION", skills: "SKILLS", projects: "PROJECTS" },
    creative: { summary: "PROFILE", work: "EXPERIENCE", edu: "EDUCATION", skills: "SKILLS", projects: "PROJECTS" },
    professional: { summary: "EXECUTIVE SUMMARY", work: "PROFESSIONAL EXPERIENCE", edu: "EDUCATION", skills: "KEY COMPETENCIES", projects: "NOTABLE PROJECTS" },
  };
  const labels = sectionLabels[template];

  // Bottom-border section heading matching each template
  const bottomBorder = {
    style: BorderStyle.SINGLE,
    size: template === "professional" ? 2 : 1,
    color: c.border,
  };
  const sectionHeading = (text: string) =>
    new Paragraph({
      children: [
        new TextRun({
          text,
          bold: true,
          size: 18,
          color: c.accent,
          font: "Calibri",
          allCaps: true,
        }),
      ],
      spacing: { before: 260, after: 100 },
      border: { bottom: bottomBorder },
    });

  const spacer = () => new Paragraph({ text: "", spacing: { after: 60 } });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const children: any[] = [];

  // --- Header ---
  const nameAlign =
    template === "creative" ? AlignmentType.LEFT : AlignmentType.CENTER;

  children.push(
    new Paragraph({
      children: [
        new TextRun({
          text: personalInfo.fullName,
          bold: true,
          size: template === "creative" ? 36 : 32,
          color: c.heading,
          font: "Calibri",
        }),
      ],
      alignment: nameAlign,
      spacing: { after: 30 },
      ...(template === "professional"
        ? {
            border: {
              bottom: {
                style: BorderStyle.SINGLE,
                size: 4,
                color: c.accent,
              },
            },
          }
        : {}),
    })
  );

  if (personalInfo.title) {
    children.push(
      new Paragraph({
        children: [
          new TextRun({
            text: personalInfo.title,
            size: 20,
            color: c.sub,
            font: "Calibri",
            bold: template === "creative",
            allCaps: template === "creative" || template === "professional",
          }),
        ],
        alignment: nameAlign,
        spacing: { after: 30 },
      })
    );
  }

  const contactParts = [
    personalInfo.email,
    personalInfo.phone,
    personalInfo.location,
    personalInfo.website,
  ].filter(Boolean);

  children.push(
    new Paragraph({
      children: [
        new TextRun({
          text: contactParts.join("  |  "),
          size: 17,
          color: c.muted,
          font: "Calibri",
        }),
      ],
      alignment: nameAlign,
      spacing: { after: 140 },
    })
  );

  // --- Summary ---
  if (personalInfo.summary) {
    children.push(sectionHeading(labels.summary));
    children.push(
      new Paragraph({
        children: [
          new TextRun({
            text: personalInfo.summary,
            size: 19,
            color: "444444",
            font: "Calibri",
          }),
        ],
        spacing: { after: 80 },
      })
    );
  }

  // --- Work Experience ---
  if (workExperience.length > 0) {
    children.push(sectionHeading(labels.work));
    workExperience.forEach((work) => {
      children.push(
        new Paragraph({
          children: [
            new TextRun({
              text: work.position,
              bold: true,
              size: 21,
              color: c.heading,
              font: "Calibri",
            }),
            new TextRun({
              text: `  |  ${work.company}`,
              size: 21,
              color: "444444",
              font: "Calibri",
            }),
          ],
          spacing: { after: 20 },
        })
      );
      const metaParts: string[] = [];
      if (work.location) metaParts.push(work.location);
      metaParts.push(`${work.startDate} – ${work.endDate}`);
      children.push(
        new Paragraph({
          children: [
            new TextRun({
              text: metaParts.join("  |  "),
              size: 17,
              color: c.muted,
              italics: true,
              font: "Calibri",
            }),
          ],
          spacing: { after: 40 },
        })
      );
      if (work.description) {
        children.push(
          new Paragraph({
            children: [
              new TextRun({
                text: work.description,
                size: 19,
                color: "444444",
                font: "Calibri",
              }),
            ],
            spacing: { after: 30 },
          })
        );
      }
      if (work.highlights?.length > 0) {
        work.highlights.forEach((h) => {
          if (h.trim()) {
            children.push(
              new Paragraph({
                children: [
                  new TextRun({
                    text: `•  ${h}`,
                    size: 19,
                    color: "444444",
                    font: "Calibri",
                  }),
                ],
                spacing: { after: 16 },
                indent: { left: 200 },
              })
            );
          }
        });
      }
      children.push(spacer());
    });
  }

  // --- Education ---
  if (education.length > 0) {
    children.push(sectionHeading(labels.edu));
    education.forEach((edu) => {
      children.push(
        new Paragraph({
          children: [
            new TextRun({
              text: edu.degree,
              bold: true,
              size: 21,
              color: c.heading,
              font: "Calibri",
            }),
            ...(edu.fieldOfStudy
              ? [
                  new TextRun({
                    text: ` in ${edu.fieldOfStudy}`,
                    size: 21,
                    color: "444444",
                    font: "Calibri",
                  }),
                ]
              : []),
          ],
          spacing: { after: 20 },
        })
      );
      children.push(
        new Paragraph({
          children: [
            new TextRun({
              text: `${edu.school}${edu.location ? `, ${edu.location}` : ""}  |  ${edu.startDate} – ${edu.endDate}`,
              size: 17,
              color: c.muted,
              italics: true,
              font: "Calibri",
            }),
          ],
          spacing: { after: 60 },
        })
      );
    });
  }

  // --- Skills ---
  if (skills.length > 0) {
    children.push(sectionHeading(labels.skills));
    if (template === "professional") {
      // Two-column bullet list for professional
      const half = Math.ceil(skills.length / 2);
      const rows = [];
      for (let i = 0; i < half; i++) {
        const left = skills[i]?.name || "";
        const right = skills[i + half]?.name || "";
        rows.push(
          new TableRow({
            children: [
              new TableCell({
                children: [
                  new Paragraph({
                    children: [
                      new TextRun({
                        text: left ? `•  ${left}` : "",
                        size: 19,
                        color: "444444",
                        font: "Calibri",
                      }),
                    ],
                  }),
                ],
                width: { size: 50, type: WidthType.PERCENTAGE },
                borders: {
                  top: { style: BorderStyle.NONE, size: 0 },
                  bottom: { style: BorderStyle.NONE, size: 0 },
                  left: { style: BorderStyle.NONE, size: 0 },
                  right: { style: BorderStyle.NONE, size: 0 },
                },
              }),
              new TableCell({
                children: [
                  new Paragraph({
                    children: [
                      new TextRun({
                        text: right ? `•  ${right}` : "",
                        size: 19,
                        color: "444444",
                        font: "Calibri",
                      }),
                    ],
                  }),
                ],
                width: { size: 50, type: WidthType.PERCENTAGE },
                borders: {
                  top: { style: BorderStyle.NONE, size: 0 },
                  bottom: { style: BorderStyle.NONE, size: 0 },
                  left: { style: BorderStyle.NONE, size: 0 },
                  right: { style: BorderStyle.NONE, size: 0 },
                },
              }),
            ],
          })
        );
      }
      children.push(
        new Table({
          rows,
          width: { size: 100, type: WidthType.PERCENTAGE },
        })
      );
      children.push(spacer());
    } else if (template === "creative") {
      // Vertical bullet list for creative
      skills.forEach((skill) => {
        children.push(
          new Paragraph({
            children: [
              new TextRun({
                text: `●  ${skill.name}`,
                size: 19,
                color: "444444",
                font: "Calibri",
              }),
            ],
            spacing: { after: 12 },
            indent: { left: 100 },
          })
        );
      });
      children.push(spacer());
    } else if (template === "modern") {
      // Inline tags style for modern
      const tagTexts: typeof TextRun.prototype[] = [];
      skills.forEach((skill, i) => {
        tagTexts.push(
          new TextRun({
            text: skill.name,
            size: 18,
            color: "ffffff",
            font: "Calibri",
            shading: {
              type: ShadingType.CLEAR,
              fill: "555555",
              color: "ffffff",
            },
          })
        );
        if (i < skills.length - 1) {
          tagTexts.push(new TextRun({ text: "   ", size: 18, font: "Calibri" }));
        }
      });
      children.push(
        new Paragraph({
          children: tagTexts as any[],
          spacing: { after: 80 },
        })
      );
    } else {
      // Minimal: dot-separated inline
      children.push(
        new Paragraph({
          children: [
            new TextRun({
              text: skills.map((s) => s.name).join("  ·  "),
              size: 19,
              color: "444444",
              font: "Calibri",
            }),
          ],
          spacing: { after: 80 },
        })
      );
    }
  }

  // --- Projects ---
  if (projects.length > 0) {
    children.push(sectionHeading(labels.projects));
    projects.forEach((project) => {
      children.push(
        new Paragraph({
          children: [
            new TextRun({
              text: project.name,
              bold: true,
              size: 21,
              color: c.heading,
              font: "Calibri",
            }),
            ...(project.technologies.length > 0
              ? [
                  new TextRun({
                    text: `  [${project.technologies.join(", ")}]`,
                    size: 17,
                    color: c.muted,
                    italics: true,
                    font: "Calibri",
                  }),
                ]
              : []),
          ],
          spacing: { after: 20 },
        })
      );
      children.push(
        new Paragraph({
          children: [
            new TextRun({
              text: project.description,
              size: 19,
              color: "444444",
              font: "Calibri",
            }),
          ],
          spacing: { after: 80 },
        })
      );
    });
  }

  const doc = new Document({
    sections: [
      {
        properties: {
          page: {
            margin: { top: 720, right: 720, bottom: 720, left: 720 },
          },
        },
        children: children as any[],
      },
    ],
  });

  const blob = await Packer.toBlob(doc);
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${filename}.docx`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  window.URL.revokeObjectURL(url);
};
