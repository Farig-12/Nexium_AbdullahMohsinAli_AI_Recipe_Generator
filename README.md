# Cook-It

Cook-It is a modern web application designed to help users discover, manage, and share recipes with ease. Built with Next.js and React, it features a sleek UI powered by Tailwind CSS and offers seamless user experiences with animations, notifications.

## AI Integration

Cook-It leverages an AI agent integrated via [n8n](https://n8n.io/), an open-source workflow automation tool. The AI agent assists users by generating recipe suggestions, and providing personalized recommendations, enhancing the overall user experience with intelligent automation.

---


## Project Libraries & Dependencies

Below is a list of all libraries used in Cook-It, with a short explanation and the `pnpm` command to install each.

---

### Core Libraries

- **next**  
  The React framework for production, powering routing, SSR, and more.  
  `pnpm add next`

- **react**  
  The core UI library for building user interfaces.  
  `pnpm add react`

- **react-dom**  
  React package for working with the DOM.  
  `pnpm add react-dom`

---

### UI & Styling

- **tailwindcss**  
  Utility-first CSS framework for rapid UI development.  
  `pnpm add tailwindcss`

- **tailwind-merge**  
  Utility to intelligently merge Tailwind CSS classes.  
  `pnpm add tailwind-merge`

- **clsx**  
  Utility for constructing `className` strings conditionally.  
  `pnpm add clsx`

- **class-variance-authority**  
  Utility for managing complex className variants, often with Tailwind.  
  `pnpm add class-variance-authority`

- **framer-motion**  
  Animation library for React, used for smooth UI transitions.  
  `pnpm add framer-motion`

- **lucide-react**  
  Icon library providing beautiful SVG icons as React components.  
  `pnpm add lucide-react`

- **tw-animate-css**  
  Adds animation utilities to Tailwind CSS.  
  `pnpm add tw-animate-css`

---

### State & Context

- **@radix-ui/react-slot**  
  Utility for advanced component composition (slots) in React.  
  `pnpm add @radix-ui/react-slot`

---

### Backend & Database

- **mongoose**  
  ODM for MongoDB, used for schema-based data modeling.  
  `pnpm add mongoose`

---

### Auth & API

- **@supabase/supabase-js**  
  Client library for interacting with Supabase (auth, database, storage).  
  `pnpm add @supabase/supabase-js`

---

### Notifications

- **sonner**  
  Modern toast notification library for React.  
  `pnpm add sonner`

---

### Dev & Linting

- **eslint**  
  Linter for JavaScript/TypeScript code quality.  
  `pnpm add -D eslint`

- **eslint-config-next**  
  Next.js ESLint config for best practices.  
  `pnpm add -D eslint-config-next`

- **@eslint/eslintrc**  
  ESLint configuration utilities.  
  `pnpm add -D @eslint/eslintrc`

- **@tailwindcss/postcss**  
  Tailwind plugin for PostCSS integration.  
  `pnpm add -D @tailwindcss/postcss`

---

### Scripts

- **dev**: `next dev --turbopack`  
  Starts the development server.
- **build**: `next build`  
  Builds the production app.
- **start**: `next start`  
  Starts the production server.
- **lint**: `next lint`  
  Runs ESLint.

---

### How to Install All Dependencies

To install all dependencies at once, simply run:

```sh
pnpm install
