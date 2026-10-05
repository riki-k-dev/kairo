# Kairo - Backend API

The robust API engine powering Kairo. Built with Node.js, Express, TypeScript, and Drizzle ORM, backed by a Serverless Neon PostgreSQL database.

## Architecture & Security

- **Domain-Driven Design**: Features are strictly split into isolated modules (`auth`, `users`, `tasks`) containing their own routes, controllers, services, and Zod validation schemas.
- **Robust Security**: 
  - Password hashing via `bcryptjs`.
  - Stateless API authentication using `jsonwebtoken` (JWT).
  - Built-in API rate-limiting (`express-rate-limit`) to prevent brute-force attacks.
- **Serverless Database**: Drizzle ORM connected to NeonDB via `neon-http` for lightweight, serverless edge compatibility.
- **Type-Safe Payloads**: Request body and parameters are strictly validated at runtime using `zod` middleware.

## Project Structure

```text
server/
├── drizzle/              # Auto-generated SQL migrations
├── src/
│   ├── config/           # Environment variable validation and parsing
│   ├── db/               # Database connection instance and Drizzle schema
│   ├── middleware/       # Auth guards, global error handling, and rate limiting
│   ├── modules/          # Feature-based modular architecture
│   │   ├── auth/         # Signup, signin, and token generation
│   │   ├── tasks/        # Task creation, updates, and filtering
│   │   └── users/        # Profile updates and account deletion
│   ├── utils/            # Helper functions (JWT signing, password hashing)
│   ├── app.ts            # Express application setup and CORS config
│   └── server.ts         # Entry point and server initialization
├── drizzle.config.ts     # Configuration for Drizzle Kit
└── package.json          # Backend dependencies and scripts

```

## Environment Variables

Create a `.env` file in the root of the `server` directory:

```env
# Server Port (Render will automatically assign this in production)
PORT=5000

# Frontend URL for CORS (Required to accept requests from your frontend)
CLIENT_URL="http://localhost:5173"

# Neon DB Connection String
DATABASE_URL="postgresql://user:password@host:port/dbname?sslmode=require"

# Secure 64-character hex string for signing JWTs
JWT_SECRET="your-secure-hex-key"

```

## Available Scripts

Run these commands using `pnpm`:

| Command | Description |
| --- | --- |
| `pnpm dev` | Starts the development server in watch mode using `tsx`. |

## Database Management (Drizzle)

Manage your PostgreSQL database directly from the `server` directory using Drizzle Kit:

```bash
# Generate SQL migrations based on changes in src/db/schema.ts
pnpm dlx drizzle-kit generate

# Push schema changes directly to your Neon database
pnpm dlx drizzle-kit push

```

## API Endpoints Overview

| Module | Endpoint | Method | Description |
| --- | --- | --- | --- |
| **Auth** | `/api/auth/signup` | `POST` | Register a new user account |
| **Auth** | `/api/auth/signin` | `POST` | Login and receive JWT token |
| **Users** | `/api/users/me` | `GET` | Get authenticated user profile |
| **Users** | `/api/users/me` | `PATCH` | Update user profile details |
| **Users** | `/api/users/me` | `DELETE` | Permanently delete user account |
| **Tasks** | `/api/tasks` | `GET` | Fetch all tasks for the user |
| **Tasks** | `/api/tasks` | `POST` | Create a new task |
| **Tasks** | `/api/tasks/:id` | `PATCH` | Update task (status, text, etc.) |
| **Tasks** | `/api/tasks/:id` | `DELETE` | Delete a specific task |

## Deployment

This backend is optimized for deployment as a Web Service on **Render**. Ensure you set the Start Command to `pnpm run dev` (or compile using `tsc` for production) and provide all necessary environment variables in the Render dashboard.