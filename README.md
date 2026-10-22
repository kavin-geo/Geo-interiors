# Geo Interiors

Responsive interiors website with service information, an interactive room-tour stack and 360° panorama viewer, indicative estimate calculator, and contact options.

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

Built with React, Vite, Tailwind CSS, Motion, Lenis, and Three.js:

- Tailwind utilities handle responsive layout breakpoints.
- Motion powers reveal and typing effects, swipeable cards, and the scroll-progress indicator.
- Lenis provides smooth scrolling, coordinated with Motion and disabled for reduced-motion users.
- Three.js renders the interactive 360° room panoramas.

`src/App.css` keeps the site-specific visual styles and interaction details.
Room and service photography is stored in `public/images/geo/`.

## Contact and social links

Update `src/siteConfig.js` to change the business phone number, email address,
WhatsApp greeting, or Instagram profile URL. The Instagram icon is shown in the
footer and links to the profile configured in that file.
