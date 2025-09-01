# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a relationship tracker web application built with Next.js where couples (or individuals) can track their relationship status, milestones, and feelings over time. The project uses the modern Next.js App Router architecture with TypeScript and Tailwind CSS v4.

## Development Commands

- `pnpm dev` - Start development server with Turbopack (opens on http://localhost:3000)
- `pnpm build` - Build the production application with Turbopack
- `pnpm start` - Start production server (requires build first)
- `pnpm lint` - Run ESLint for code linting

## Architecture & Technology Stack

### Framework & Build Tools
- **Next.js 15.5.2** with App Router architecture
- **Turbopack** enabled for faster development and builds
- **TypeScript** with strict mode enabled and ES2017 target
- **PNPM** v10.15.1 as package manager

### UI Framework & Styling
- **Tailwind CSS v4** with new `@theme inline` syntax and PostCSS plugin
- **Headless UI v2.2.7** for accessible component primitives
- **CSS variables** for theming (supports automatic light/dark mode)
- **Geist fonts** (Sans and Mono variants) via next/font/google optimization

### Code Quality
- **ESLint v9** with Next.js TypeScript configuration
- **Flat config format** (eslint.config.mjs) with Next.js core web vitals rules
- Ignores: node_modules, .next, out, build, next-env.d.ts

## Project Structure

```
src/
  app/                         # Next.js App Router directory
    components/                # Shared UI components
      NavBar.tsx              # Navigation component with routing links
      Footer.tsx              # Footer component with copyright
    layout.tsx                # Root layout with fonts, NavBar, Footer
    page.tsx                  # Home page (currently Next.js starter content)
    globals.css               # Global styles with Tailwind and theme variables
    favicon.ico               # App favicon
public/                       # Static assets (SVG icons, images)
```

## Component Architecture

### Layout System
- **Root Layout** (`layout.tsx`): Configures fonts, metadata, and overall page structure
  - Uses flexbox layout: `min-h-screen flex flex-col`
  - NavBar (sticky header), main content (flex-1), Footer (sticky bottom)
  - Font optimization with Geist Sans and Mono variants

### Navigation Architecture
- **NavBar component**: Sticky header with navigation links
  - Defines routing structure: Dashboard (`/dashboard`), Timeline (`/timeline`), Settings (`/settings`)
  - Uses Next.js Link component for client-side navigation
  - Supports optional icons for nav items

### Styling Architecture
- **Global CSS** (`globals.css`):
  - Tailwind v4 `@theme inline` syntax for theme configuration
  - CSS custom properties: `--background`, `--foreground` with automatic dark mode
  - Font family integration with Geist font variables
  - Main content padding: 4rem top/bottom

## TypeScript Configuration

- **Path mapping**: `@/*` resolves to `./src/*` for clean imports
- **Strict mode** enabled with comprehensive type checking
- **Next.js plugin** integrated for optimal development experience
- **Module resolution**: bundler strategy for modern dependency handling

## Key Dependencies

### Core Framework
- `next@15.5.2` - React framework with App Router
- `react@19.1.0` & `react-dom@19.1.0` - Latest React runtime

### UI & Styling
- `@headlessui/react@2.2.7` - Unstyled, accessible UI components
- `tailwindcss@4` - Utility-first CSS framework
- `@tailwindcss/postcss@4` - PostCSS plugin for Tailwind v4

## Development Notes

- **Current State**: Contains custom NavBar/Footer components but main page still has Next.js starter content
- **Navigation Structure**: Already defines app routes (Dashboard, Timeline, Settings) but pages not yet implemented
- **Theme System**: Fully configured for light/dark mode with CSS custom properties
- **Performance**: Turbopack enabled for fast development and production builds