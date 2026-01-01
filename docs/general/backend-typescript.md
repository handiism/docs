---
sidebar_position: 5
---

# TypeScript Backend Guidelines

These guidelines are specific to TypeScript (Node.js) backend services at Techave.

## 1. Environment & Setup

- **Runtime:** Use Node.js LTS versions.
- **PackageManager:** Use `pnpm` or `npm`.
- **Transpilation:** Use `tsx` for development and `tsc` for production builds.

## 2. Code Standards

- **Linter:** Use `eslint` with the recommended TypeScript rules.
- **Formatter:** Use `prettier` for consistent code formatting.
- **Strict Mode:** `strict: true` is mandatory in `tsconfig.json`.

## 3. Type Safety

- **Avoid `any`:** Use `unknown` or specific interfaces/types instead.
- **Prisma:** Use Prisma for type-safe database access.
- **Zod:** Use Zod for runtime schema validation (input validation, environment variables).

## 4. Architecture

- **Dependency Injection:** Use a lightweight approach or a library like `awilix` or `inversify` if needed.
- **Error Handling:** Use a custom `AppError` class that extends `Error` to include HTTP status codes and operational flags.

## 5. Performance

- Use `fastify` or `express` (if legacy) with proper middleware.
- Avoid blocking the Event Loop with heavy synchronous operations.
- Use `worker_threads` for CPU-intensive tasks.

---

_Created: 2026-01-02_
