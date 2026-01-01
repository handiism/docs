# Go Backend Guidelines

These guidelines are specific to Go (Golang) backend services at Techave.

## 1. Project Structure

- Follow **Clean Architecture** or **Hexagonal Architecture**.
- Use `cmd/` for application entry points.
- Use `internal/` for private code (logic, use cases, repositories).
- Use `pkg/` for code that is safe for other projects to import (optional).

## 2. Code Standards

- **Linter:** Use `golangci-lint` with the project's `.golangci.yml`.
- **Formatting:** Code must be formatted with `gofmt` or `goimports`.
- **Naming:**
  - Use `camelCase` for internal variables.
  - Use `PascalCase` for exported symbols.
  - Keep interfaces small (usually 1-3 methods).

## 3. Concurrency

- Only use goroutines when necessary for performance or async tasks.
- Always use `context.Context` for cancellation and timeouts.
- Use channels for communication between goroutines; avoid shared state where possible.

## 4. Error Handling

- Use the standard `errors` package or `fmt.Errorf` with `%w` for wrapping.
- Check errors immediately: `if err != nil { return err }`.
- Avoid `panic()` in production code unless it's a fatal startup error.

## 5. Testing

- Use the built-in `testing` package.
- Use `testify/assert` and `testify/mock` for better assertions and mocking.
- Table-driven tests are the preferred way to test multiple scenarios.

---

_Created: 2026-01-02_
