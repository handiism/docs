# General Backend Guidelines Standard

This document outlines the general technical guidelines and architectural standards for backend services.

## 1. Architectural Principles

- **Clean Architecture:** Prioritize separation of concerns (Entities, Use Cases, Adapters, Infrastructure).
- **Statelessness:** Backend services must be stateless to allow horizontal scaling.
- **Single Responsibility:** Each microservice or module should have a clearly defined scope.

## 2. Infrastructure & Operations

- **Containerization:** All services must be Dockerized.
- **CI/CD:** Automated builds, tests, and deployments are mandatory.
- **Configuration:** Use environment variables for all environment-specific settings (12-Factor App rules).

## 3. Data Integrity & Persistence

- **Migrations:** All database schema changes must be versioned and applied via migration scripts.
- **Relational Integrity:** Use foreign keys and constraints appropriately.
- **Backups:** Critical data must have automated daily backups with a tested recovery process.

## 4. Observability

- **Structured Logging:** Use JSON logging for easier parsing by log aggregators.
- **Health Checks:** Implement `/health` or `/ready` endpoints for container orchestration.
- **Distributed Tracing:** Include request IDs in all logs and downstream calls.

## 5. Security

- **Least Privilege:** Services should only have the minimum necessary permissions to perform their tasks.
- **Secret Management:** Never commit secrets to version control. Use a secret manager (K8s Secrets, Vault, etc.).
- **Dependency Scanning:** Regularly scan for vulnerable packages in the build pipeline.

## 6. Language-Specific Guidelines

For detailed implementation rules and patterns specific to each programming language, please refer to:

- [Go Backend Guidelines](./backend-go.md)
- [TypeScript Backend Guidelines](./backend-typescript.md)

---

_Created: 2026-01-02_
