# Andrew Odom — GitHub Pages

GitHub Pages mirror of [aodom.dev](https://aodom.dev), Andrew Odom’s professional
portfolio and web resume. The custom domain remains the canonical version.

## Stack

- Astro static site generation
- TypeScript content model
- Tailwind CSS build pipeline with a custom editorial design system
- Playwright and axe accessibility smoke tests
- GitHub Pages deployment, with Cloudflare Workers compatibility

## Local development

```bash
npm install
npm run dev
```

## Verification

```bash
npm run check
npm test
```

The production build is generated in `site/`. Build output is intentionally not
committed.

## GitHub Pages

Pushes to `main` build the Astro site and publish `site/` through GitHub Actions.

## Cloudflare Workers

The source is kept compatible with the primary Cloudflare Workers deployment.
