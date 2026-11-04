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

`src/App.css` keeps the site-specific visual styles and interaction details.
Service photography is stored in `public/images/geo/`.

## Contact and social links

Update `src/siteConfig.js` to change the business phone number, email address,
WhatsApp greeting, or Instagram profile URL. The Instagram icon is shown in the
footer and links to the profile configured in that file.
