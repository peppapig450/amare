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
- **TypeScript** with strict mode enabled
- **PNPM** as package manager

### Styling
- **Tailwind CSS v4** with new `@theme inline` syntax and PostCSS plugin
- **CSS variables** for theming (supports light/dark mode)
- **Geist fonts** (Sans and Mono variants) via next/font/google

### Code Quality
- **ESLint** with Next.js TypeScript configuration
- **Flat config format** (eslint.config.mjs) with Next.js core web vitals rules

## Project Structure

```
src/
  app/                    # Next.js App Router directory
    layout.tsx           # Root layout with font configuration and metadata
    page.tsx             # Home page component  
    globals.css          # Global styles with Tailwind imports and CSS variables
    favicon.ico          # App favicon
public/                  # Static assets (SVG icons, images)
```

## Key Architectural Details

### Styling System
- Uses Tailwind CSS v4's new inline theme syntax in globals.css
- CSS custom properties for colors: `--background`, `--foreground`
- Automatic dark mode support via `prefers-color-scheme`
- Font variables from Next.js font optimization: `--font-geist-sans`, `--font-geist-mono`

### TypeScript Configuration
- Path mapping: `@/*` resolves to `./src/*`
- Strict mode enabled with ES2017 target
- Next.js plugin integrated for optimal TypeScript experience

### Package Management
- Uses PNPM with workspace configuration
- React 19.1.0 with latest Next.js 15.5.2
- Minimal dependencies focused on core functionality

## Development Notes

- The project currently contains the default Next.js starter content and needs to be customized for the relationship tracking functionality
- Turbopack is enabled for both development and production builds for improved performance
- All SVG assets are optimized and use Next.js Image component for performance