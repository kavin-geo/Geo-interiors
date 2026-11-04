# Geo Interiors

Responsive interiors website with service information, an indicative estimate calculator, and contact options.

## Development

```sh
npm install
npm run dev
```

## Checks

```sh
npm run lint
npm run build
```

Built with React, Vite, Tailwind CSS, Motion, and Lenis:

- Tailwind utilities handle responsive layout breakpoints.
- Motion powers reveal and typing effects, swipeable cards, and the scroll-progress indicator.
- Lenis provides smooth scrolling, coordinated with Motion and disabled for reduced-motion users.

The page is composed from focused section components in `src/sections/`,
shared UI in `src/components/`, and content data in `src/data/`.
`src/App.css` keeps the site-wide visual styles and interaction details.
Service photography is stored under `public/images/geo/`, grouped by service
section and category.

Supplemental room-gallery photos are grouped in
`public/images/geo/gallery/in-house/<category>/` and
`public/images/geo/gallery/fittings/<category>/`. The Unsplash photos are
labeled as design inspiration in the site, not as completed Geo Interiors
projects. They are used under the
[Unsplash License](https://unsplash.com/license).

## Contact and social links

Update `src/siteConfig.js` to change the business phone number, WhatsApp
greeting, or Instagram profile URL. The Instagram icon is shown in the footer
and links to the profile configured in that file.
