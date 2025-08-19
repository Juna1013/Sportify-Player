# Copilot Instructions for Sportify-Player

## Project Overview
- **Framework:** Next.js (App Router, TypeScript)
- **Styling:** Tailwind CSS (see `tailwind.config.js`, `app/globals.css`)
- **Components:** All React components are in `components/` (e.g., `Player.js`).
- **API routes:** Located in `app/api/` (e.g., `login.js`, `auth/callback.js`).
- **Static assets:** In `public/`.

## Key Workflows
- **Development:**
  - Start dev server: `npm run dev` (or `yarn dev`, `pnpm dev`, `bun dev`)
  - Main entry: `app/page.tsx` (auto-reloads on save)
- **Build:**
  - Production build: `npm run build`
- **Styling:**
  - Use Tailwind utility classes. Global styles in `app/globals.css`.
- **API:**
  - Use Next.js API routes for backend logic. Place new endpoints in `app/api/`.

## Patterns & Conventions
- **Component structure:**
  - Prefer functional React components.
  - Co-locate component-specific styles if needed, but global styles go in `app/globals.css`.
- **File naming:**
  - Use PascalCase for React components, camelCase for functions/variables.
- **TypeScript:**
  - TypeScript is enabled (see `tsconfig.json`). Prefer `.tsx` for components, `.ts` for logic.
- **Auth:**
  - Authentication logic is in `app/api/login.js` and `app/api/auth/callback.js`.

## Integration Points
- **Fonts:** Uses `next/font` for font optimization.
- **Deployment:**
  - Designed for Vercel, but can run locally.

## Examples
- To add a new page, create a file in `app/` (e.g., `app/about/page.tsx`).
- To add a new API route, add a file in `app/api/` (e.g., `app/api/hello.js`).
- To update the player UI, edit `components/Player.js`.

## References
- See `README.md` for getting started and deployment.
- See `tailwind.config.js` for custom Tailwind setup.
- See `next.config.ts` for Next.js configuration.

---
If you are unsure about a pattern, check for similar usage in `components/` or `app/` first.
