# Open Diagram

This repository is a legacy fork of the original [mxGraph](https://github.com/jgraph/mxgraph) JavaScript code used by draw.io-style editors.

## Why this fork exists

I forked this codebase to keep a known and stable drawing engine while adding product-specific features that are not part of the upstream legacy project.

The upstream code is reliable, but it reflects older browser-era assumptions and does not include the storage workflow and app-level integrations I want for my own editor experience.

## Project pace

This is a side project. Development happens when I have time available outside my main work, so progress is intentionally incremental.

## What I want to do with it

### 1) Add custom Supabase-backed functionality

I want to integrate Supabase to support project persistence and board management, including:

- storing and loading projects/boards from Supabase
- managing project metadata (title, timestamps, ownership, etc.)
- adding a preview URL field to stored boards so each saved board can be linked and previewed easily

### 2) Modernize the legacy core for 2026+ browsers

I want to incrementally modernize the core library while preserving compatibility and editor behavior, including:

- updating legacy patterns to be friendlier to modern browser APIs and tooling
- reducing browser-specific legacy assumptions that are no longer needed
- improving maintainability and long-term stability for modern environments

### 3) Add PWA and touch-first tablet support

I want this editor to work well as a Progressive Web App (PWA), especially on iPads and other touch devices, including:

- installing and running as a PWA for app-like usage
- refining the existing touch input interactions for canvas editing (pan, zoom, select, drag)
- supporting stylus workflows (including Apple Pencil) through pointer/touch event handling
- making key editor actions usable on tablet screens without requiring desktop-only interactions

### 4) Modernize the UI while keeping the original vibe

I want to refresh the interface so it feels cleaner and more current, but still recognizably faithful to the classic draw.io/mxGraph experience, including:

- keeping the existing layout mental model (sidebar, toolbar, canvas, format panels)
- improving spacing, typography, and visual clarity without changing core workflows
- updating icons, controls, and dialogs carefully so the app feels familiar to existing users
- improving responsiveness for modern desktop and tablet screen sizes

## Direction

This fork is intentionally pragmatic:

- keep the proven legacy graph behavior
- add modern application features around it
- modernize the interface without losing the original product feel
- prioritize PWA-quality touch and stylus usability on tablets
- evolve internals carefully to run well in current and future browsers
