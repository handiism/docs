# Technical Requirements Document (TRD)
## Pulse

---

## 1. Overview

This document defines the **technical architecture and requirements** for **Pulse**, a real-time interactive application supporting:

- HTTP
- WebSocket
- GraphQL
- Server-Sent Events (SSE)

Pulse is built with a **TypeScript backend**, **Next.js frontend**, **Hexagonal Architecture**, **RBAC + ACL**, and a **Turborepo-based monorepo**.

The system focuses on **direct implementation** with clear communication between teams.

---

## 2. System Diagrams

The following diagrams provide visual representations of the Pulse technical architecture:
  
- **[Architecture Diagram](./diagrams/01-architecture-diagram.mmd)** - Hexagonal architecture and monorepo structure
- **[User Flow Diagram](./diagrams/02-user-flow-diagram.mmd)** - Shows interaction flows for different user roles
- **[Use Case Diagram](./diagrams/03-use-case-diagram.mmd)** - Illustrates actors and their available use cases
- **[ERD](./diagrams/04-erd.mmd)** - Entity Relationship Diagram for database schema
- **[Sequence Diagram](./diagrams/05-sequence-diagram.mmd)** - Interaction flows for key operations
- **[State Diagram](./diagrams/06-state-diagram.mmd)** - Lifecycle states for sessions, polls, and connections
- **[Deployment Diagram](./diagrams/07-deployment-diagram.mmd)** - Infrastructure and deployment architecture
- **[C4 Diagram](./diagrams/08-c4-diagram.mmd)** - C4 Context and Container diagrams

---

## 3. Technology Stack Overview

See **[Backend](./backend/)** and **[Frontend](./frontend/)** for platform-specific technology stacks.

### Monorepo Tooling
- **Monorepo**: Turborepo
- **Package Manager**: pnpm / npm / yarn
- **Shared Packages**: domain, auth, db, ui

---

## 4. High-Level Architecture

pulse/
├── apps/
│ ├── api/ # Fastify backend
│ └── web/ # Next.js frontend
├── packages/
│ ├── domain/ # Core business logic
│ ├── auth/ # RBAC & ACL policies
│ ├── db/ # Prisma + Kysely
│ └── ui/ # Shared UI components (optional)
├── turbo.json
├── package.json
└── tsconfig.base.json

---

## 5. Architectural Style: Hexagonal Architecture

Pulse follows **Hexagonal Architecture** to ensure:

- Business rules are framework-agnostic
- APIs are replaceable adapters
- Database and transport concerns are isolated

### Layer Overview

┌──────────────────────────┐
│ Adapters │ ← HTTP / WS / GraphQL / SSE
│ (Contract-driven) │
└─────────────┬────────────┘
│
┌─────────────▼────────────┐
│ Application Layer │ ← Use cases, authorization
└─────────────┬────────────┘
│
┌─────────────▼────────────┐
│ Domain Layer │ ← Entities, invariants
└─────────────┬────────────┘
│
┌─────────────▼────────────┐
│ Infrastructure Layer │ ← Prisma, Kysely, storage
└──────────────────────────┘

---

## 6. API Strategy

### Approach
Direct implementation without formal API contract specifications.

### Communication
- Backend and frontend teams coordinate directly on API changes
- Type definitions shared through TypeScript types
- Documentation updated alongside implementation

### Benefits
- Faster iteration during initial development
- Reduced overhead
- Flexibility to evolve APIs rapidly

---

## 7. Domain Responsibilities

### Core Domain Concepts
- Session
- Counter
- Poll
- PollOption
- MediaFile
- Role
- Permission

### Domain Rules
- All mutations go through use cases
- RBAC evaluated before ACL
- ACL evaluated per action
- Media is immutable once published

---

## 11. Turborepo Configuration

### Responsibilities
- Task orchestration
- Incremental builds
- Shared caching
- Unified developer workflow

### Pipelines
```json
{
  "pipeline": {
    "dev": { "cache": false },
    "build": { "dependsOn": ["^build"] },
    "lint": { "outputs": ["dist/**", ".next/**"] },
    "test": { "outputs": ["coverage/**"] },
    "typecheck": { "outputs": ["dist/**"] }
  }
}
```

---

## 12. Shared Packages

### `packages/domain/`
Core business logic shared between backend and frontend.

**Contents:**
- Domain entities (Session, Poll, Counter, etc.)
- Value objects
- Domain events
- Business rules and invariants

**Usage:**
- Backend: Implement use cases
- Frontend: Type definitions, validation

### `packages/auth/`
Authentication and authorization policies.

**Contents:**
- Role definitions
- Permission definitions
- RBAC policies
- ACL policies
- Permission checking utilities

**Usage:**
- Backend: Enforce authorization
- Frontend: Permission-aware UI

### `packages/db/`
Shared database types and utilities.

**Contents:**
- Prisma client
- Kysely types
- Migration scripts
- Database utilities

**Usage:**
- Backend: Execute queries
- Frontend: Type definitions (optional)

### `packages/ui/` (Optional)
Shared UI components.

**Contents:**
- Reusable components
- Design system
- Styled components
- Accessibility utilities

**Usage:**
- Frontend: Import and use components

---

## 13. TypeScript Configuration

### Base Configuration (`tsconfig.base.json`)
```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "lib": ["ES2022"],
    "moduleResolution": "bundler",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "declaration": true,
    "declarationMap": true
  }
}
```

### Package-Specific Configs
Each package extends the base config with specific settings.

---

## 14. Shared Code Quality Standards

### Linting
- ESLint with TypeScript support
- Shared ESLint config in root
- Enforce code style and best practices

### Formatting
- Prettier for consistent formatting
- Shared Prettier config in root
- Auto-format on save (recommended)

### Testing
- Vitest for unit tests
- Playwright for E2E tests
- Shared test utilities

---

## 15. Shared Build & CI/CD

### Build Pipeline
```bash
# Install dependencies
pnpm install

# Run all tests
pnpm test

# Lint all packages
pnpm lint

# Type-check all packages
pnpm typecheck

# Build all packages
pnpm build
```

### CI/CD
- GitHub Actions (recommended)
- Run tests on pull requests
- Build and deploy on merge
- Use Turborepo caching for faster builds

---

## 16. Versioning Strategy

### Semantic Versioning
- Follow SemVer for packages
- Major: Breaking changes
- Minor: New features, backward compatible
- Patch: Bug fixes, backward compatible

### Deprecation Process
1. Mark as deprecated in documentation
2. Support old version for at least one major release
3. Remove in next major version

---

## 17. Documentation Strategy

### Code Documentation
- JSDoc comments for public APIs
- Inline comments for complex logic
- Type definitions as documentation

### API Documentation
- Document APIs inline with implementation
- Update documentation alongside code changes
- Hosted on public URL (optional)

### Developer Documentation
- README for each package
- Contribution guidelines
- Architecture decision records (ADRs)

---

## 18. Non-Functional Requirements

### Performance
- Low-latency real-time updates
- Efficient database access

### Reliability
- Safe concurrent writes
- Graceful reconnect handling

### Maintainability
- Contract-driven changes
- Strong separation of concerns

---

## 19. Out of Scope

- Auth providers
- Multi-region deployments
- Advanced analytics
- CDN-level media optimization

---

## 20. Future Enhancements

- CQRS split (Kysely read / Prisma write)
- Event replay
- Background workers
- API contract specification and code generation

---

## 21. Summary

**Pulse** adopts a **hexagonal architecture** powered by:

- Turborepo monorepo
- Shared packages (domain, auth, db, ui)
- TypeScript

This ensures **developer productivity**, **type safety**, and **maintainability** across the entire stack.

For platform-specific details, see **[Backend](./backend/)** and **[Frontend](./frontend/)** documentation.

> Pulse speaks clearly — to humans, to machines, and to the future.

---

## 22. References

### Related Documents
- **[PRD](./prd.md)** - Product Requirements Document
- **[Backend](./backend/)** - Backend Technical Requirements
- **[Frontend](./frontend/)** - Frontend Technical Requirements

### Documentation
- **[Fastify Documentation](https://fastify.dev/docs/latest/)**
- **[Next.js Documentation](https://nextjs.org/docs)**
- **[Prisma 7 Documentation](https://www.prisma.io/docs/)**
- **[Kysely Documentation](https://kysely.dev/)**
- **[Hexagonal Architecture](https://alistair.cockburn.us/hexagonal-architecture/)**
- **[Turborepo Documentation](https://turbo.build/repo/docs)**
- **[pnpm Documentation](https://pnpm.io/)**
- **[TypeScript Handbook](https://www.typescriptlang.org/docs/)**

### Diagrams
See Section 2 for links to all architecture diagrams.
