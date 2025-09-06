# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a relationship tracker web application built with Next.js where couples (or individuals) can track their relationship status, milestones, and feelings over time. The project uses the modern Next.js App Router architecture with TypeScript and Tailwind CSS v4.

## Development Commands

- `pnpm dev` - Start development server with Turbopack (opens on http://localhost:3000)
- `pnpm build` - Build the production application with Turbopack
- `pnpm start` - Start production server (requires build first)
- `pnpm lint` - Run ESLint for code linting
- `pnpm typecheck` - Run TypeScript type checking
- `pnpm format:check` - Check code formatting with Prettier
- `pnpm check` - Run full validation suite (install, lint, typecheck, format, build)

## Architecture & Technology Stack

### Framework & Build Tools
- **Next.js 15.5.2** with App Router architecture
- **Turbopack** enabled for faster development and builds
- **TypeScript** with strict mode enabled and ES2022 target
- **PNPM** v10.15.1 as package manager

### Database & Authentication
- **Prisma ORM** with PostgreSQL database
- **NextAuth.js v5** with Google OAuth provider and database sessions
- **Generated Prisma Client** in `src/generated/prisma/` (auto-generated, do not edit)
- **Database schema** includes Users, Relationships, TimelineEntries, Milestones, and MoodEntries

### UI Framework & Styling
- **Tailwind CSS v4** with new `@theme inline` syntax and PostCSS plugin
- **Headless UI v2.2.7** for accessible component primitives
- **Heroicons v2** and **React Icons v5** for iconography
- **CSS variables** for theming (supports automatic light/dark mode)
- **Geist fonts** (Sans and Mono variants) via next/font/google optimization

### Code Quality
- **ESLint v9** with TypeScript configuration and flat config format (eslint.config.mjs)
- **Prettier** with plugins for import organization and Tailwind class sorting
- **TypeScript ESLint** with type-aware linting and strict rules
- Comprehensive validation pipeline with `pnpm check` command

## Project Structure

```
src/
  app/                         # Next.js App Router directory
    auth/                      # Authentication pages (signin, error)
    dashboard/                 # Dashboard page with stats and actions
      components/              # Dashboard-specific components
    timeline/                  # Timeline page with entry management
      components/              # Timeline-specific components
    api/auth/[...nextauth]/    # NextAuth.js API route
    layout.tsx                 # Root layout with auth, fonts, NavBar, Footer
    page.tsx                   # Home page with landing content
    globals.css                # Global styles with Tailwind and theme variables
  components/                  # Shared UI components
    auth/                      # Auth-related components
    providers/                 # Context providers (SessionProvider)
    NavBar.tsx                # Navigation component with auth integration
    Footer.tsx                # Footer component
  lib/                        # Utilities and configurations
    prisma.ts                 # Prisma client instance
  types/                      # TypeScript type definitions
    auth.d.ts                 # Extended NextAuth types
  auth.ts                     # NextAuth configuration
  generated/                  # Auto-generated files (Prisma client)
prisma/
  schema.prisma               # Database schema with relationship models
```

## Component Architecture

### Authentication System
- **NextAuth.js v5** with database adapter for persistent sessions
- **Google OAuth** integration with custom sign-in pages
- **Session management** via SessionProvider wrapping the app
- **Auth components** for sign-in/sign-out functionality

### Database Schema
- **User model** with NextAuth.js integration and relationship connections
- **Relationship model** connecting two users with status, dates, and settings
- **Timeline entries** for memories, milestones, and activities
- **Mood tracking** with intensity ratings and notes
- **Comprehensive enums** for relationship status, milestone categories, and mood types

### Layout System
- **Root Layout** (`layout.tsx`): Configures auth, fonts, metadata, and page structure
  - Uses flexbox layout: `min-h-screen flex flex-col`
  - NavBar (sticky header with auth), main content (flex-1), Footer (sticky bottom)
  - SessionProvider integration for auth state management

### Navigation Architecture
- **NavBar component**: Sticky header with navigation links and auth integration
  - Routes: Dashboard (`/dashboard`), Timeline (`/timeline`)
  - AuthButton component for sign-in/sign-out functionality
  - Responsive design with mobile navigation support

### Styling Architecture
- **Global CSS** (`globals.css`):
  - Tailwind v4 `@theme inline` syntax for theme configuration
  - CSS custom properties: semantic color tokens with automatic dark mode
  - Theme colors: primary, milestone, photo, note, memory, love
  - Font family integration with Geist font variables

## TypeScript Configuration

- **Path mapping**: `@/*` resolves to `./src/*` for clean imports
- **Strict mode** enabled with comprehensive type checking
- **ES2022 target** with modern module resolution (bundler strategy)
- **Next.js plugin** integrated for optimal development experience
- **Extended NextAuth types** in `src/types/auth.d.ts`

## Key Dependencies

### Core Framework
- `next@15.5.2` - React framework with App Router
- `react@19.1.0` & `react-dom@19.1.0` - Latest React runtime

### Database & Auth
- `prisma@6.15.0` & `@prisma/client@6.15.0` - Database ORM and client
- `next-auth@5.0.0-beta.29` - Authentication framework
- `@auth/prisma-adapter@2.10.0` - Prisma adapter for NextAuth.js

### UI & Styling
- `@headlessui/react@2.2.7` - Unstyled, accessible UI components
- `@heroicons/react@2.2.0` & `react-icons@5.5.0` - Icon libraries
- `tailwindcss@4` - Utility-first CSS framework
- `@tailwindcss/postcss@4` - PostCSS plugin for Tailwind v4

## Database Operations

- **Prisma Client** available via `@/lib/prisma` import
- **Generated client** located in `src/generated/prisma/` (do not modify)
- **Schema changes** require running `prisma generate` (automatically runs on `pnpm install`)
- **Database migrations** managed through Prisma CLI

## Development Notes

- **Current State**: Functional landing page with auth system, dashboard and timeline page implementations
- **Authentication**: Google OAuth with database sessions fully configured
- **Database**: Complex relationship tracking schema with comprehensive models
- **Theme System**: Fully configured for light/dark mode with semantic color tokens
- **Performance**: Turbopack enabled for fast development and production builds
- **Code Quality**: Comprehensive linting, formatting, and type-checking pipeline