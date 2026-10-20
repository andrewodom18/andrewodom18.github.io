# Andrew Odom — [Resume Site](https://andrewodom18.github.io)

Andrew Odom's personal resume and professional profile. I’m the creator of
[ODOM Tech](https://github.com/odom-technology), my personal tech and project brand
for apps, tools, and experiments.

## Stack

- Astro static site generation
- TypeScript resume content model
- Tailwind CSS build pipeline with a custom editorial design system
- Playwright and axe accessibility smoke tests
- GitHub Pages deployment, with Cloudflare Workers compatibility

## Resume PDF

The public PDF is generated from `scripts/generate_resume_pdf.py` and served at
[`/resume.pdf`](https://andrewodom18.github.io/resume.pdf).

The checked-in PDF lets the static build run without Python. To regenerate it,
install Python's `reportlab` package and run `python3 scripts/generate_resume_pdf.py`.
GitHub Pages uses the PDF content type and the download link's filename;
Cloudflare additionally applies the PDF response headers in `public/_headers`.
