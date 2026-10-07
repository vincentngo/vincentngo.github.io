"""Generate the downloadable CV from the same content as the website.

Run: python3 scripts/generate-cv.py (requires reportlab).
Output: public/resume/VincentNgoCV.pdf
"""
from datetime import date
from html import escape
from pathlib import Path
import json

from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, KeepTogether,
    HRFlowable,
)
from reportlab.pdfgen import canvas

ROOT = Path(__file__).resolve().parents[1]
cv = json.loads((ROOT / "lib/content/cv.json").read_text())
OUTPUT = ROOT / "public/resume/VincentNgoCV.pdf"
OUTPUT.parent.mkdir(parents=True, exist_ok=True)
WIDTH = A4[0] - 112  # Account for the document frame's 6-point padding on each side.
styles = {
    "name": ParagraphStyle("name", fontName="Helvetica", fontSize=25, leading=29, alignment=TA_CENTER),
    "contact": ParagraphStyle("contact", fontName="Helvetica", fontSize=9, leading=13, alignment=TA_CENTER),
    "section": ParagraphStyle("section", fontName="Helvetica-Bold", fontSize=12, leading=15, spaceBefore=8),
    "body": ParagraphStyle("body", fontName="Helvetica", fontSize=9.5, leading=12.5),
    "detail": ParagraphStyle("detail", fontName="Helvetica", fontSize=8.5, leading=11, textColor=colors.HexColor("#4b4b4b")),
    "year": ParagraphStyle("year", fontName="Helvetica", fontSize=9, leading=12, spaceBefore=7, spaceAfter=4),
}

def text(value):
    return escape(value.replace("²", "2"))

def p(value, style="body"):
    return Paragraph(value, styles[style])

def link(label, href):
    return f'<link href="{escape(href, quote=True)}" color="#04BE76">{text(label)}</link>'

story = []

def section(title):
    heading = p(text(title), "section")
    heading.keepWithNext = True
    rule = HRFlowable(width="100%", thickness=0.5, color=colors.HexColor("#333333"), spaceAfter=7)
    rule.keepWithNext = True
    story.extend([heading, rule])

def row(left, right=""):
    date_style = ParagraphStyle("date", parent=styles["body"], alignment=2)
    table = Table([[p(left), Paragraph(text(right), date_style)]], colWidths=[WIDTH-132, 132])
    table.setStyle(TableStyle([
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LEFTPADDING", (0, 0), (-1, -1), 0),
        ("RIGHTPADDING", (0, 0), (-1, -1), 0),
        ("RIGHTPADDING", (0, 0), (0, 0), 10),
        ("TOPPADDING", (0, 0), (-1, -1), 0),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 0),
    ]))
    return table

def entry(item):
    organization = text(item["organization"])
    if item.get("link"):
        organization = link(item["organization"], item["link"]["href"])
    block = [row(f'<b>{text(item["role"])}</b>, <i>{organization}</i>', item["period"])]
    if item.get("description"):
        block.append(p(text(item["description"]), "detail"))
    block.append(Spacer(1, 4))
    story.append(KeepTogether(block))

story.append(p(text(cv["name"]), "name"))
story.append(p(text(cv["summary"]), "contact"))
story.append(p(" &nbsp; | &nbsp; ".join(link(c["label"], c["href"]) for c in cv["contacts"]), "contact"))
updated = date.fromisoformat(cv["updated"])
story.append(p(f'Last updated on {updated.strftime("%B")} {updated.day}, {updated.year}', "contact"))
section("Education")
for item in cv["education"]:
    title = f'<i>{text(item["organization"])}</i>'
    if item.get("qualification"):
        title = f'<b>{text(item["qualification"])}</b>, ' + title
    block = [row(title, item.get("period", ""))]
    for key in ("details", "activities"):
        if item.get(key):
            block.append(p(("Activities: " if key == "activities" else "") + text(item[key]), "detail"))
    block.append(Spacer(1, 4))
    story.append(KeepTogether(block))
section("Positions")
for item in cv["experience"]:
    entry(item)
section("Honors & awards")
for item in cv["awards"]:
    story.append(KeepTogether([row(f'<b>{text(item["title"])}</b>', item["period"]), p(text(item["description"]), "detail"), Spacer(1, 4)]))

section("Patents")
story.append(p('Co-inventor on three granted U.S. patents. ' + link('Patents and related applications', 'https://patents.justia.com/inventor/vincent-vy-ngo'), "detail"))
story.append(Spacer(1, 4))
for item in cv["patents"]:
    block = [p(f'<b>{text(item["title"])}</b>'), p(text(item["description"]), "detail"), p('Inventors: ' + text(item["inventors"]), "detail")]
    for grant in item["grants"]:
        block.append(p(link('US ' + grant["number"], grant["href"]) + ' · Granted ' + text(grant["date"]), "detail"))
    block.append(Spacer(1, 7))
    story.append(KeepTogether(block))

section("Publications")
last_year = None
for index, item in enumerate(cv["publications"], 1):
    year = item["dateTime"][:4]
    if year != last_year:
        year_heading = p(year, "year")
        year_heading.keepWithNext = True
        year_rule = HRFlowable(width="100%", thickness=0.3, color=colors.lightgrey, spaceAfter=4)
        year_rule.keepWithNext = True
        story.extend([year_heading, year_rule])
        last_year = year
    block = [p(f'{index}. {link(item["title"], item["href"])}')]
    block.append(p(f'{text(item["publisher"])} · {text(item["kind"])} · {text(item["date"])}', "detail"))
    if item.get("description"):
        block.append(p(text(item["description"]), "detail"))
    block.append(Spacer(1, 4))
    story.append(KeepTogether(block))
section("Research")
for item in cv["research"]:
    entry(item)
section("Skills & languages")
story.append(p(text(" · ".join(cv["skills"])), "detail"))
for item in cv["languages"]:
    story.append(p(f'<b>{text(item["name"])}</b> · {text(item["proficiency"])}', "detail"))
section("Interests")
story.append(p(text(" · ".join(cv["interests"])), "detail"))

class NumberedCanvas(canvas.Canvas):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.pages = []

    def showPage(self):
        self.pages.append(dict(self.__dict__))
        self._startPage()

    def save(self):
        count = len(self.pages)
        for state in self.pages:
            self.__dict__.update(state)
            self.setFont("Helvetica", 8)
            self.setFillColor(colors.grey)
            self.drawCentredString(A4[0]/2, 28, f"Page {self._pageNumber} of {count}")
            super().showPage()
        super().save()

SimpleDocTemplate(str(OUTPUT), pagesize=A4, rightMargin=50, leftMargin=50,
                  topMargin=42, bottomMargin=32, title="Vincent Ngo | CV",
                  author=cv["name"]).build(story, canvasmaker=NumberedCanvas)
print(f"Generated {OUTPUT}")
