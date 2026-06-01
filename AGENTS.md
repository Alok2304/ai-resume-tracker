# AGENTS.md

## Project Overview

This repository contains a production-ready SaaS web application called CareerFlow.

CareerFlow is an AI-powered resume review and job application tracking platform that helps users:

* Upload resumes
* Receive AI-generated resume feedback
* Track job applications
* Monitor interview progress
* View analytics about job search performance
* Generate insights to improve hiring outcomes

The application is intended to be portfolio-worthy, production-ready, scalable, and recruiter-impressive.

---

## Tech Stack

Frontend:

* Next.js 16 App Router
* TypeScript
* Tailwind CSS v4
* Shadcn UI
* Framer Motion

Backend:

* Next.js Route Handlers
* Server Actions

Database:

* MongoDB Atlas
* Mongoose

Authentication:

* Auth.js

Validation:

* Zod

Forms:

* React Hook Form

State Management:

* Zustand

Charts:

* Recharts

File Uploads:

* UploadThing

Monitoring:

* Sentry
* PostHog

Deployment:

* Vercel

---

## Development Philosophy

Always prioritize:

1. Type Safety
2. Accessibility
3. Performance
4. Security
5. Reusability
6. Maintainability
7. Scalability

Avoid quick hacks.

Favor long-term maintainable solutions.

---

## Folder Structure

src/

app/
components/
features/
actions/
hooks/
lib/
models/
services/
validators/
types/
utils/
store/
middleware/

---

## Component Rules

Prefer Server Components.

Only use "use client" when required.

Keep components:

* Small
* Reusable
* Single responsibility

Maximum component size target:
300 lines.

Extract reusable logic into hooks.

---

## Styling Rules

Use Tailwind CSS.

Do not use inline styles unless necessary.

Prefer:

* Utility classes
* Design tokens
* Reusable component variants

Maintain:

* Consistent spacing
* Consistent typography
* Responsive layouts

---

## Naming Conventions

Components:
kebab-case

Example:
user-profile.tsx

Hooks:
useCamelCase

Example:
useCurrentUser.ts

Utilities:
camelCase

Example:
formatDate.ts

Types:
PascalCase

Example:
ResumeAnalysis.ts

---

## API Standards

Use RESTful conventions.

Examples:

GET /api/jobs

POST /api/jobs

GET /api/jobs/[id]

PATCH /api/jobs/[id]

DELETE /api/jobs/[id]

Always validate requests using Zod.

Never trust client-side validation.

---

## Database Standards

Use Mongoose schemas.

All collections must include:

createdAt

updatedAt

Use indexes when appropriate.

Avoid N+1 query patterns.

---

## Security Requirements

Must implement:

* Input validation
* Authentication checks
* Authorization checks
* Secure cookies
* Environment variable protection
* Rate limiting

Never expose secrets.

---

## Performance Requirements

Target Lighthouse score:

Performance > 90

Accessibility > 90

SEO > 90

Best Practices > 90

Use:

* Dynamic imports
* Code splitting
* Image optimization
* Lazy loading

---

## Testing Requirements

Unit Tests:
Jest

Component Tests:
React Testing Library

E2E Tests:
Playwright

Critical user flows must be tested.

---

## Git Workflow

Branch naming:

feature/*
bugfix/*
hotfix/*

Commit convention:

feat:
fix:
refactor:
docs:
test:
chore:

---

## Definition of Done

A task is complete only if:

* Functionality works
* Types are correct
* No lint errors
* No TypeScript errors
* Responsive on mobile
* Accessible
* Tested
* Documented
* Production-ready

Never mark incomplete work as complete.
