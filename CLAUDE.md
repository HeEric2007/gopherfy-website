# CLAUDE.md

## Project

This repo contains the marketing landing page for **Gopherfy**, a Discord verification bot for University of Minnesota students. The bot verifies students by sending a one-time code to their `@umn.edu` email address, then grants them a verified role in the Discord server.

⚠️ This repo is **only the landing page**. The bot itself lives at `ravindu-ranasinghe/umn-discord-verification`. Don't add bot logic here.

## Design reference

The layout should mirror the structure of **tinyshots.app** — but reskinned and rewritten for Gopherfy. Specifically:

- Top nav: logo + wordmark on the left, 2–3 nav links + a primary CTA pill button on the right
- A large hero card floating on top of a colorful gradient background
- Massive bold three-word headline with periods after each word
- One- or two-sentence subtitle
- Two side-by-side CTAs: a dark primary pill, an outlined secondary button
- A microcopy line directly under the CTAs (small, muted text)
- A row of circular avatars with a "Loved by ___" / "Trusted by ___" line
- A small floating helper pill in the bottom-left corner

Don't copy TinyShots' colors, copy, or assets — adapt everything to Gopherfy.

## Brand

- **Primary:** UMN maroon `#7A0019` and UMN gold `#FFCC33` (school colors, ties into the "Goldy Gopher" mascot)
- **Accent:** Discord blurple `#5865F2` — use this for the "Add to Discord" CTA so it reads as the recognizable Discord action
- **Background:** A soft gradient on the hero card backdrop using maroon → gold → blurple tones, evoking the macOS-style colorful wallpaper from the reference
- **Type:** Inter (or similar geometric sans-serif). Headline weight 800+, tight letter-spacing on the headline

## Sections to build

### 1. Top nav
- Left: Gopher icon (use 🐹 emoji as placeholder) + "Gopherfy" wordmark
- Right: "Features", "How it works", and a primary dark pill button labeled "Add to Discord"

### 2. Hero
- Headline: **Verify. Connect. Done.**
- Subtitle: *A Discord bot that verifies UMN students with their @umn.edu email. Trusted communities, real Gophers, in seconds.*
- Primary CTA: "Add to Discord" with the Discord logo — link to `#` for now (TODO: real OAuth invite URL)
- Secondary CTA: "See how it works →"
- Microcopy line under CTAs: *Free for every UMN server.*
- Tertiary microcopy: *Email-verified · Privacy-first · Open source*

### 3. Social proof row
- Row of 6–9 placeholder circular avatars (gray circles for now, marked `TODO: real avatars`)
- Caption: *Trusted by **UMN students and student orgs***

### 4. Floating helper
- Bottom-left: small pill button reading `Not at UMN? →` (links to `#` placeholder)
- Bottom-right: a chat/help bubble icon (decorative for now)

## Tech stack

Build with **Next.js 14+ (App Router) + TypeScript + Tailwind CSS**. Reasons:
- Easy free deploy to Vercel
- Tailwind suits the utility-first landing-page aesthetic
- Easy to add more pages later (features, docs, privacy policy)

Init command:
```bash
npx create-next-app@latest . --typescript --tailwind --app --no-src-dir --import-alias "@/*"
```

If a lighter alternative is wanted, **Astro** is also fine. Do **not** use Create React App.

## Target file structure

```
app/
  layout.tsx        # Root layout, fonts, metadata
  page.tsx          # Landing page composing the sections
  globals.css       # Tailwind directives + CSS variables for brand colors
components/
  Nav.tsx
  Hero.tsx
  SocialProof.tsx
  FloatingHelper.tsx
lib/
  content.ts        # All user-facing strings centralized here
public/
  logo.svg
  favicon.ico
```

Centralize all copy in `lib/content.ts` so non-devs can edit the site without touching JSX.

## Requirements

- **Mobile-first responsive.** Most users will tap the link from Discord on mobile.
- **Semantic HTML** (`<header>`, `<main>`, `<section>`) for accessibility and SEO.
- **OG + Twitter card metadata** in `app/layout.tsx` so the site previews nicely when shared in Discord. Use a placeholder OG image (`/og.png`) and mark it TODO.
- **No browser storage** (localStorage, sessionStorage, cookies) — the page is stateless.
- **No analytics** or tracking scripts for now.
- **Dark mode is optional** for v1 — focus on a polished light theme first.

## Hard constraints — don't do these

- Don't add pricing. The bot is free.
- Don't add fake testimonials, fake user counts, or fake avatars from real people. Use clearly-placeholder content marked `TODO`.
- Don't write long marketing prose. Keep copy tight; favor short punchy phrases with the three-word rhythm where possible.
- Don't add bot source code or any backend logic to this repo.
- Don't use any auth, database, or API integrations yet.

## Deployment

Target: **Vercel**.
