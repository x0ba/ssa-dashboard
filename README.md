# SSA Members Dashboard

Member portal for SSA with events, resources, and role-based admin controls.

## Tech Stack

Next.js 15 · React 19 · TypeScript · Tailwind CSS v4 · PostgreSQL · Drizzle ORM · Clerk Auth

## Quick Start

**Prerequisites**: Node.js 20+, pnpm, and Prettier (for VS Code)

```bash
# Install pnpm if needed
npm install -g pnpm

# Install dependencies
pnpm install

# Install Prettier extension in VS Code
# Search for "Prettier - Code formatter" in extensions

# Set up environment
cp .env.example .env  # Fill in credentials - ask Daniel for these

# Start dev server
pnpm dev  # Opens http://localhost:3000
```

## Commands

```bash
# Development
pnpm dev              # Start dev server
pnpm build            # Build for production
pnpm check            # Lint + type check

# Code quality
pnpm format:write     # Format code
pnpm lint:fix         # Fix lint errors

# Database
pnpm db:push          # Push schema changes
pnpm db:studio        # Open DB GUI
```

## Features

- Clerk authentication with role-based access (admin/moderator/member)
- Events and links management with search
- Admin dashboard for user management
- Required onboarding flow
- Dark mode support
