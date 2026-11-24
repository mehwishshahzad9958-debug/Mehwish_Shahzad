# Mehwish Shahzad — Portfolio

A personal portfolio built with **React + TypeScript + Vite**, **React Router** for pages and **Motion** for animation.

## Run it

```bash
npm install      # once: downloads the libraries listed in package.json
npm run dev      # starts the development server (usually http://localhost:5173)
npm run build    # type-checks and creates the production build in /dist
npm run preview  # serves the production build locally
```

## Where things live

```
src/
  data/         ← the content. Edit text, links and lists here (no React knowledge needed)
  components/   ← reusable building blocks (Header, Hero, CategoryCards, Footer ...)
  pages/        ← one file per page (Home, About, Journal, Category, 404)
  layouts/      ← the frame shared by every page (header + footer)
  styles/       ← design tokens (colours, fonts), base styles, shared layout
public/
  images/       ← photos (currently placeholders) · icons/ ← favicon
```

## Things to fill in

| What | Where |
|---|---|
| GitHub / Instagram / email links (hidden until they have a real URL) | `src/data/site.ts` → `socials` |
| Hero portrait (currently `public/images/hero-portrait.webp`) | `src/data/site.ts` → `heroPortrait` |
| Real photos (all current images are placeholders) | `public/images/` + `src/data/*.ts` |
| Recent Moments captions | `src/data/moments.ts` |
| Projects, talks, experiments, discoveries | `src/data/categories.ts` → each section's `items` |
| What you're currently exploring | `src/data/exploring.ts` |

Nothing in the site is invented: sections with no content yet show a clearly worded empty state.

## Public Speaking page

The Public Speaking page (`/public-speaking`) has its own layout in `src/pages/speaking/` and takes all of its content from `src/data/speaking.ts`.
Add real entries to `shelfItems` (decks, explainers, workshops, material, topics), `talks`, `experiments` and `reflections`; they appear automatically.
The arrays start empty on purpose, so the page shows empty states instead of invented content.

## Creativity page

The Creativity page (`/creativity`) has its own scrapbook layout in `src/pages/creativity/` and takes its content from `src/data/creativity.ts`.
Each discipline (painting, crochet, stitching & sewing, cooking, handmade projects, creative experiments) has an `entries` list that starts empty on purpose.
The comment at the top of that file shows how to add a piece, with photos, process shots, details and a reflection.
Put image files in `public/images/creativity/`.

## Journal

The Journal (`/journal`) is ONE top-level destination (one nav item) holding four sections. A section switcher (Overview, Blogs, Travel Journal, Vlogs, Gallery) appears on every Journal page.

| Section | Route | Content file | Add content by |
|---|---|---|---|
| Blogs | `/journal/blogs`, `/journal/blogs/<slug>` | `src/data/blogs.ts` | adding an object to `blogPosts` (title, cover, date, category, description, body blocks) |
| Travel Journal | `/journal/travel`, `/journal/travel/<slug>` | `src/data/travel.ts` | adding an entry to `travelEntries` (images in `public/images/travel/`) |
| Vlogs | `/journal/vlogs` | `src/data/vlogs.ts` | pasting Instagram post/reel URLs into `vlogs` (no video uploads) |
| Gallery | `/journal/gallery` | `src/data/gallery.ts` | adding photos to `galleryPhotos`, grouped by `galleryCollections` (images in `public/images/gallery/`) |

The data arrays start empty on purpose, so each page shows a designed empty state until real content is added. The comment at the top of each data file shows how to add an entry. `src/data/journal.ts` holds the section list and landing copy.

Code lives in `src/pages/journal/` (shell, nav, `blogs/`, `vlogs/`, `gallery/`) and `src/pages/travel/` (the scrapbook). URLs are defined once in `src/pages/journal/paths.ts`. The old `/travel-journal` URLs redirect to `/journal/travel`.

Vlogs: a card opens the original Instagram post in a new tab. "Preview here" opens an embedded preview, loaded only when clicked. If the embed does not load, the link to Instagram is always shown. Instagram cover images are not fetched automatically; add an optional `thumbnail` image per entry, otherwise a plain poster is shown.

## Roadmap

| Section | Route | Status |
| --- | --- | --- |
| Homepage, About, Journal landing | `/`, `/about`, `/journal` | Built |
| Technical & Career | `/technical-career` | Built (generic category template), needs content |
| Creativity | `/creativity` | Built (dedicated scrapbook page), needs content |
| Public Speaking | `/public-speaking` | Built (dedicated page), needs content |
| Journal: Blogs, Travel Journal, Vlogs, Gallery | `/journal/*` | Built, needs content |
| Exploration & Discoveries | `/exploration-discoveries` | Built (generic category template), needs content |

Possible next steps: dedicated pages for Technical & Career and Exploration & Discoveries.
