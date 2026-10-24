# Northstar Academy — Online Education HTML Template

A responsive, multi-page online education website template built with semantic HTML, Tailwind CSS, Vite, and vanilla JavaScript. All customer-facing template content is in English.

## Pages included

- `index.html` — Homepage and featured courses
- `home-templates.html` — Gallery of three alternate homepage concepts
- `home-creative.html` — Editorial, dark-forest creative studio concept
- `home-campus.html` — Bright, community-first learning campus concept
- `home-minimal.html` — Calm, typography-led premium concept
- `courses.html` — Searchable and filterable course catalog
- `course-detail.html` — Course overview, curriculum, instructor, reviews, and enrollment CTA
- `about.html` — Brand story, values, and instructor profiles
- `pricing.html` — Individual, all-access, and team plans with a billing toggle
- `faq.html` — Categorized questions and answers
- `contact.html` — Contact form and support details

## Requirements

- Node.js 20.19+ or 22.12+
- npm

## Getting started

```sh
npm install
npm run dev
```

Open the local URL printed by Vite. To create the optimized, static website:

```sh
npm run build
npm run preview
```

The deployable website is written to `dist/`. Upload the contents of that folder to a static host. Tailwind CSS is compiled and purged during the production build; the built site does not load Tailwind from its CDN.

## Customize before publishing or reselling

- Replace the Northstar Academy name, course details, instructor bios, testimonials, prices, policies, and contact information with your own approved content.
- Connect enrollment CTAs to a real checkout/LMS, and connect the contact and newsletter forms to a server-side form or email service. The included forms show demo-only confirmation messages and do not store or send submissions.
- Replace sample Unsplash photography and font CDN links with assets and licenses suitable for your distribution. Confirm rights for every image, font, icon, and other asset included in any marketplace package.
- Review all sample business claims, reviews, learner counts, guarantees, and pricing. They are placeholders, not verified customer data or legal terms.
- Update social profile links, SEO titles/descriptions, favicon, and brand colors for the final customer project.
- Add the actual marketplace license, support policy, and documentation required for your item. This source does not claim ThemeForest approval or include a marketplace license.

## Project structure

- Root HTML files are the editable page source.
- `src/main.js` contains shared page interactions, the persistent color-theme picker, and scroll/reveal animations.
- `src/partials/header.html` and `src/partials/footer.html` are the shared site-wide navigation and footer injected by Vite into each page.
- The three alternate homepages include extended course, learning-process, and community content. Their key accent colors follow the selected theme; subtle pointer tilt is enabled on desktop and disabled for touch and reduced-motion preferences.
- `src/styles.css` contains Tailwind directives, theme-aware colors, and reduced-motion-aware transitions.
- `tailwind.config.js`, `postcss.config.js`, and `vite.config.js` configure development and production builds.