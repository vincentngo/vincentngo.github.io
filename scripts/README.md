# CV PDF

The CV page and downloadable PDF share `lib/content/cv.json`.

After editing that content, update its `updated` date and regenerate the PDF before building:

```sh
python3 -m pip install reportlab # Once, in your Python environment
bun run cv:pdf
bun run build
```

The generator writes `public/resume/VincentNgoCV.pdf`. Commit that file alongside
content changes so the static website serves the latest CV. Python and ReportLab
are only needed to regenerate the PDF, not to build or host the website.
