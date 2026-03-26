# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A basic expense tracker React app used as a starter project for a Claude Code course. The codebase is intentionally simple with all logic in a single App.jsx file. Per the README, it intentionally contains bugs, poor UI, and messy code that are fixed throughout the course.

## Commands

```bash
npm run dev      # Start Vite dev server at http://localhost:5173
npm run build    # Build for production
npm run lint     # Run ESLint
npm run preview  # Preview production build
```

## Architecture

- **Framework**: React 19 + Vite 7
- **Styling**: Plain CSS (src/index.css, src/App.css)
- **State**: Local component state via useState (no external state management)
- **Routing**: None (single-page app)
- **Backend**: None (client-side only, data persists only in memory)

## Component Structure

```
src/
  App.jsx              # Main container: holds all state, passes down via props
  main.jsx             # React entry point
  components/
    TransactionForm.jsx # Add transaction form
    TransactionList.jsx # Transactions table with filtering
```

State lives in `App.jsx` and is passed down to child components via props.

## Key Files

- `src/App.jsx` — Main app component (state container)
- `src/components/TransactionForm.jsx` — Transaction add form
- `src/components/TransactionList.jsx` — Transaction list with filters
- `src/main.jsx` — React entry point
- `vite.config.js` — Vite configuration with React plugin
- `eslint.config.js` — ESLint flat config with react-hooks and react-refresh rules

## Notes

- This is a starter/educational project — bugs and code quality issues are expected
- No test framework is configured
- Transaction amounts are stored as strings but converted with `Number()` for arithmetic
