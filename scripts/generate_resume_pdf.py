#!/usr/bin/env python3
"""Generate the public, one-page PDF resume for Andrew Odom."""

from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT, TA_RIGHT
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import inch
from reportlab.platypus import (
    KeepTogether,
    Paragraph,
    SimpleDocTemplate,
    Spacer,
    Table,
    TableStyle,
)


PROJECT_ROOT = Path(__file__).resolve().parents[1]
OUTPUT_PATH = PROJECT_ROOT / "output" / "pdf" / "Andrew-Odom-Resume.pdf"

NAVY = colors.HexColor("#102044")
BLUE = colors.HexColor("#2F68CD")
INK = colors.HexColor("#182235")
MUTED = colors.HexColor("#536178")
LINE = colors.HexColor("#D6DEEA")
PALE_BLUE = colors.HexColor("#EEF4FF")


def linked_text(label: str, url: str) -> str:
    return f'<link href="{url}" color="#2F68CD">{label}</link>'


def section_heading(title: str, styles: dict[str, ParagraphStyle]) -> list:
    return [
        Spacer(1, 7),
        Table(
            [[Paragraph(title.upper(), styles["section"])]],
            colWidths=[7.4 * inch],
            style=TableStyle(
                [
                    ("BACKGROUND", (0, 0), (-1, -1), PALE_BLUE),
                    ("BOX", (0, 0), (-1, -1), 0.5, LINE),
                    ("LEFTPADDING", (0, 0), (-1, -1), 7),
                    ("RIGHTPADDING", (0, 0), (-1, -1), 7),
                    ("TOPPADDING", (0, 0), (-1, -1), 4),
                    ("BOTTOMPADDING", (0, 0), (-1, -1), 4),
                ]
            ),
        ),
        Spacer(1, 6),
    ]


def build_resume() -> Path:
    OUTPUT_PATH.parent.mkdir(parents=True, exist_ok=True)

    document = SimpleDocTemplate(
        str(OUTPUT_PATH),
        pagesize=letter,
        rightMargin=0.55 * inch,
        leftMargin=0.55 * inch,
        topMargin=0.45 * inch,
        bottomMargin=0.45 * inch,
        title="Andrew Odom - Resume",
        author="Andrew Odom",
        subject="Software Developer Resume",
    )

    base_styles = getSampleStyleSheet()
    styles = {
        "name": ParagraphStyle(
            "Name",
            parent=base_styles["Title"],
            fontName="Helvetica-Bold",
            fontSize=25,
            leading=28,
            textColor=NAVY,
            alignment=TA_LEFT,
            spaceAfter=2,
        ),
        "title": ParagraphStyle(
            "ProfessionalTitle",
            parent=base_styles["Normal"],
            fontName="Helvetica-Bold",
            fontSize=10,
            leading=13,
            textColor=BLUE,
            spaceAfter=0,
        ),
        "contact": ParagraphStyle(
            "Contact",
            parent=base_styles["Normal"],
            fontName="Helvetica",
            fontSize=7.6,
            leading=10.5,
            textColor=MUTED,
            alignment=TA_RIGHT,
        ),
        "summary": ParagraphStyle(
            "Summary",
            parent=base_styles["Normal"],
            fontName="Helvetica",
            fontSize=9.2,
            leading=12.2,
            textColor=INK,
            spaceAfter=1,
        ),
        "section": ParagraphStyle(
            "Section",
            parent=base_styles["Normal"],
            fontName="Helvetica-Bold",
            fontSize=8,
            leading=10,
            tracking=0.7,
            textColor=NAVY,
        ),
        "role": ParagraphStyle(
            "Role",
            parent=base_styles["Heading3"],
            fontName="Helvetica-Bold",
            fontSize=11.2,
            leading=13.5,
            textColor=INK,
            spaceAfter=1,
        ),
        "organization": ParagraphStyle(
            "Organization",
            parent=base_styles["Normal"],
            fontName="Helvetica-Bold",
            fontSize=8.8,
            leading=11,
            textColor=BLUE,
        ),
        "date": ParagraphStyle(
            "Date",
            parent=base_styles["Normal"],
            fontName="Helvetica",
            fontSize=8,
            leading=11,
            textColor=MUTED,
            alignment=TA_RIGHT,
        ),
        "body": ParagraphStyle(
            "Body",
            parent=base_styles["Normal"],
            fontName="Helvetica",
            fontSize=8.8,
            leading=11.5,
            textColor=INK,
            spaceAfter=3,
        ),
        "bullet": ParagraphStyle(
            "Bullet",
            parent=base_styles["Normal"],
            fontName="Helvetica",
            fontSize=8.6,
            leading=11.2,
            leftIndent=9,
            firstLineIndent=-9,
            textColor=INK,
            spaceAfter=2,
        ),
        "skill_label": ParagraphStyle(
            "SkillLabel",
            parent=base_styles["Normal"],
            fontName="Helvetica-Bold",
            fontSize=8.4,
            leading=11,
            textColor=NAVY,
        ),
        "skill_text": ParagraphStyle(
            "SkillText",
            parent=base_styles["Normal"],
            fontName="Helvetica",
            fontSize=8.4,
            leading=11,
            textColor=INK,
        ),
    }

    contact_lines = [
        linked_text("contact@aodom.dev", "mailto:contact@aodom.dev"),
        linked_text("andrewodom18.github.io", "https://andrewodom18.github.io"),
        linked_text("github.com/andrewodom18", "https://github.com/andrewodom18"),
        linked_text("linkedin.com/in/andrewodom18", "https://linkedin.com/in/andrewodom18/"),
    ]

    story = [
        Table(
            [
                [
                    [
                        Paragraph("Andrew Odom", styles["name"]),
                        Paragraph("SOFTWARE DEVELOPER", styles["title"]),
                    ],
                    Paragraph("<br/>".join(contact_lines), styles["contact"]),
                ]
            ],
            colWidths=[4.15 * inch, 3.25 * inch],
            style=TableStyle(
                [
                    ("VALIGN", (0, 0), (-1, -1), "BOTTOM"),
                    ("LEFTPADDING", (0, 0), (-1, -1), 0),
                    ("RIGHTPADDING", (0, 0), (-1, -1), 0),
                    ("TOPPADDING", (0, 0), (-1, -1), 0),
                    ("BOTTOMPADDING", (0, 0), (-1, -1), 8),
                    ("LINEBELOW", (0, 0), (-1, -1), 1.25, NAVY),
                ]
            ),
        ),
        Spacer(1, 8),
        Paragraph(
            "Software developer at Air Force BESPIN with experience across web, mobile, "
            "data, automated testing, technical documentation, and delivery workflows. "
            "Creator of ODOM Tech.",
            styles["summary"],
        ),
    ]

    story.extend(section_heading("Experience", styles))
    story.append(
        KeepTogether(
            [
                Table(
                    [
                        [
                            [
                                Paragraph("Software Developer", styles["role"]),
                                Paragraph("Air Force BESPIN", styles["organization"]),
                            ],
                            Paragraph("December 2023 - Present", styles["date"]),
                        ]
                    ],
                    colWidths=[5.45 * inch, 1.95 * inch],
                    style=TableStyle(
                        [
                            ("VALIGN", (0, 0), (-1, -1), "TOP"),
                            ("LEFTPADDING", (0, 0), (-1, -1), 0),
                            ("RIGHTPADDING", (0, 0), (-1, -1), 0),
                            ("TOPPADDING", (0, 0), (-1, -1), 0),
                            ("BOTTOMPADDING", (0, 0), (-1, -1), 3),
                        ]
                    ),
                ),
                Paragraph(
                    "Mobile and web application development within an Air Force software factory.",
                    styles["body"],
                ),
                Paragraph(
                    "- Develop and maintain web and mobile application features within a collaborative software delivery team.",
                    styles["bullet"],
                ),
                Paragraph(
                    "- Work across application code, relational data integration, automated testing, and deployment workflows.",
                    styles["bullet"],
                ),
                Paragraph(
                    "- Produce technical documentation and support reliable software releases.",
                    styles["bullet"],
                ),
            ]
        )
    )

    story.extend(section_heading("Leadership", styles))
    story.append(
        KeepTogether(
            [
                Paragraph("Creator", styles["role"]),
                Paragraph("ODOM Tech", styles["organization"]),
                Spacer(1, 2),
                Paragraph(
                    "Created ODOM Tech as my personal tech and project brand for apps, tools, and "
                    "experiments. My independent software projects and developer tools are "
                    f'available at {linked_text("github.com/odom-technology", "https://github.com/odom-technology")}.',
                    styles["body"],
                ),
            ]
        )
    )

    story.extend(section_heading("Technical Skills", styles))
    skill_rows = [
        ("Languages", "TypeScript, JavaScript, Python, Dart, SQL, Shell"),
        ("Web", "React, Next.js, Astro, Node.js, Tailwind CSS"),
        ("Mobile", "Flutter, Riverpod, GoRouter"),
        ("Data and backend", "PostgreSQL, Supabase, Convex, SQLite, Drizzle ORM"),
        ("Delivery", "Docker, Linux, GitHub Actions, Playwright, automated testing"),
    ]
    story.append(
        Table(
            [
                [Paragraph(label, styles["skill_label"]), Paragraph(value, styles["skill_text"])]
                for label, value in skill_rows
            ],
            colWidths=[1.35 * inch, 6.05 * inch],
            style=TableStyle(
                [
                    ("VALIGN", (0, 0), (-1, -1), "TOP"),
                    ("LEFTPADDING", (0, 0), (-1, -1), 0),
                    ("RIGHTPADDING", (0, 0), (-1, -1), 0),
                    ("TOPPADDING", (0, 0), (-1, -1), 2),
                    ("BOTTOMPADDING", (0, 0), (-1, -1), 3),
                    ("LINEBELOW", (0, 0), (-1, -2), 0.35, LINE),
                ]
            ),
        )
    )

    story.extend(section_heading("Education", styles))
    story.append(
        KeepTogether(
            [
                Table(
                    [
                        [
                            Paragraph("Bachelor's in Computer Science", styles["role"]),
                            Paragraph("In progress", styles["date"]),
                        ]
                    ],
                    colWidths=[5.45 * inch, 1.95 * inch],
                    style=TableStyle(
                        [
                            ("VALIGN", (0, 0), (-1, -1), "TOP"),
                            ("LEFTPADDING", (0, 0), (-1, -1), 0),
                            ("RIGHTPADDING", (0, 0), (-1, -1), 0),
                            ("TOPPADDING", (0, 0), (-1, -1), 0),
                            ("BOTTOMPADDING", (0, 0), (-1, -1), 1),
                        ]
                    ),
                ),
                Paragraph(
                    "Coursework includes programming, data structures, systems, and software architecture.",
                    styles["body"],
                ),
            ]
        )
    )

    document.build(story)
    return OUTPUT_PATH


if __name__ == "__main__":
    print(build_resume())
