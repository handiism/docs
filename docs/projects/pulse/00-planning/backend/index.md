# Technical Requirements Document (TRD) - Backend
## Pulse

---

## 1. Overview

This document defines the **backend technical architecture and requirements** for **Pulse**, supporting:

- HTTP
- WebSocket
- GraphQL
- Server-Sent Events (SSE)

The backend is built with **TypeScript**, **Fastify**, and **Hexagonal Architecture**.

---

## 2. Backend System Diagrams

The following diagrams provide visual representations of Pulse backend architecture:

- **[Architecture Diagram](../diagrams/01-architecture-diagram.mmd)** - Hexagonal architecture and monorepo structure
- **[ERD](../diagrams/04-erd.mmd)** - Entity Relationship Diagram for database schema
- **[Sequence Diagram](../diagrams/05-sequence-diagram.mmd)** - Interaction flows for key operations
- **[State Diagram](../diagrams/06-state-diagram.mmd)** - Lifecycle states for sessions, polls, and connections
- **[Deployment Diagram](../diagrams/07-deployment-diagram.mmd)** - Infrastructure and deployment architecture
- **[C4 Diagram](../diagrams/08-c4-diagram.mmd)** - C4 Context and Container diagrams (shared)

---

## 3. Backend Technology Stack

### Language & Runtime
- **Language**: TypeScript
- **Runtime**: Node.js

### Framework & Architecture
- **Framework**: Fastify
- **Architecture**: Hexagonal (Ports & Adapters)

### Database & Data Access
- **ORM / Query Layer**:
  - Prisma 7 (schema, migrations, type generation)
  - Kysely (type-safe query builder)

### Supported Protocols
- HTTP (REST)
- WebSocket
- GraphQL
- Server-Sent Events (SSE)

---

## 4. Backend High-Level Structure

pulse/
├── apps/
│ └── api/ # Fastify backend
├── packages/
│ ├── domain/ # Core business logic
│ ├── auth/ # RBAC & ACL policies
│ └── db/ # Prisma + Kysely
├── turbo.json
├── package.json
└── tsconfig.base.json

---

## 5. Backend Hexagonal Architecture

The backend follows **Hexagonal Architecture** to ensure:

- Business rules are framework-agnostic
- APIs are replaceable adapters
- Database and transport concerns are isolated

### Layer Overview

┌──────────────────────────┐
│ Adapters │ ← HTTP / WS / GraphQL / SSE
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

## 6. Backend API Strategy

### Approach
Direct implementation without formal API contract specifications.

### Communication
- Coordinate with frontend team on API changes
- Document APIs inline with implementation
- Update TypeScript types as needed

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

## 8. Database & Data Access Layer

### Prisma 7 Responsibilities
- Schema definition
- Migrations
- Type generation
- Referential integrity

### Kysely Responsibilities
- Complex reads
- Aggregations
- Optimized queries
- Transaction orchestration

### Pattern
- Prisma defines schema
- Kysely executes queries
- Repositories hide implementation details
- Domain depends only on interfaces

---

## 9. File Upload Technical Requirements

### Purpose
- Poll option media
- Session material sharing

### Constraints
- HTTP only
- ACL enforced before accept
- Metadata broadcast via WS/SSE
- Binary data never streamed

### Domain Events
- `MediaUploaded`
- `PollMediaAttached`

---

## 10. Backend (Fastify) Requirements

### Adapter Layer
- REST routes
- WebSocket handlers
- GraphQL server
- SSE endpoints

### Application Layer
- Use cases
- Authorization enforcement
- Domain event emission

### Infrastructure Layer
- Prisma client
- Kysely DB instance
- File storage adapter
- Event dispatcher

---

## 11. References

### Related Documents
- **[PRD](../prd.md)** - Product Requirements Document
- **[Frontend](../frontend/)** - Frontend Technical Requirements
- **[TRD](../trd.md)** - Technical Requirements Document

### Documentation
- **[Fastify Documentation](https://fastify.dev/docs/latest/)**
- **[Prisma 7 Documentation](https://www.prisma.io/docs/)**
- **[Kysely Documentation](https://kysely.dev/)**
- **[Hexagonal Architecture](https://alistair.cockburn.us/hexagonal-architecture/)**
- **[Turborepo Documentation](https://turbo.build/repo/docs)**

### Diagrams
See Section 2 for links to all architecture diagrams.

---

## 12. Summary

**Pulse Backend** adopts a **hexagonal architecture** powered by:

- Fastify + TypeScript
- Prisma 7 + Kysely
- HTTP, WebSocket, GraphQL, SSE

This ensures **clarity at the edges**, **safety in the core**, and **confidence in real-time behavior**.

> Pulse backend speaks clearly — to frontend, to database, and to the future.
