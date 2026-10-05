# Kairo - Frontend

The frontend client for the Kairo workspace, built for speed and aesthetics using React 19, Vite, TailwindCSS v4, and Framer Motion.

## Features

- **Modern UI Components**: Animated with `framer-motion` for smooth layout transitions and modal popups.
- **Context Management**: Centralized `AuthContext` for seamless user state and token management.
- **Responsive Layout**: Sidebar navigation for desktop and floating action buttons (FAB) for mobile users.
- **Heatmap Visualization**: Integrated `@uiw/react-heat-map` for visual productivity tracking.

## Project Structure

```text
frontend/
├── src/
│   ├── assets/           # Static assets, logos, and images
│   ├── components/       # Modular UI components
│   │   ├── auth/         # Authentication layouts
│   │   ├── home/         # Task cards, modals
│   │   ├── layout/       # Main layouts, Sidebar, Protected routes
│   │   ├── profile/      # Heatmap, profile details, danger zone
│   │   └── ui/           # Reusable micro-components (buttons, toggles)
│   ├── context/          # React Context (Auth context and state)
│   ├── pages/            # Main application routes (Home, Auth, Profile, 404)
│   ├── services/         # Axios API configuration and interceptors
│   ├── types/            # TypeScript interfaces and type definitions
│   ├── App.tsx           # Application router configuration
│   ├── main.tsx          # React application entry point
│   └── index.css         # Tailwind and global styles
├── index.html            # Main HTML template
└── package.json          # Project dependencies and scripts

```

## Environment Variables

Create a `.env` file in the root of the `frontend` directory:

```env
# The URL of your live or local backend API
VITE_API_URL=http://localhost:5000/api

```

*(For production, replace this with your deployed backend URL)*

## Available Scripts

Run these commands using `pnpm`:

| Command | Description |
| --- | --- |
| `pnpm dev` | Starts the Vite development server with Hot Module Replacement. |
| `pnpm build` | Type-checks the code (`tsc -b`) and bundles for production. |
| `pnpm preview` | Locally previews the production build. |
| `pnpm lint` | Runs ESLint to check for code quality and unused variables. |

## Deployment

This project is perfectly optimized for **Vercel**.

1. Connect your GitHub repository to Vercel.
2. Select the `frontend` directory as the Root Directory.
3. Add the `VITE_API_URL` to the Environment Variables.
4. Deploy!