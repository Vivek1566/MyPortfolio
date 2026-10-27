# Portfolio

A React portfolio built with Vite, GSAP, and Three.js.

## Live Demo

https://vivek1566.github.io/MyPortfolio/


## Development

Requirements: Node.js 20+.

1. Install dependencies from the repository root with `npm install`.
2. Start the frontend with `npm run dev`.
3. Open the local URL printed by Vite (usually `http://localhost:5173`).
4. Create a production build with `npm run build`; preview it with `npm run preview`.

The homepage uses Three.js image planes and GSAP ScrollTrigger for scroll-linked
parallax and zoom. The welcome intro is remembered for the current tab session.
The contact form prepares a message in the visitor's email app; this project
does not require a backend or database.

Project details and repository links are maintained in
`client/src/data/projects.js`.
