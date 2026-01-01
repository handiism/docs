# Contributing to Techave Docs

Welcome! This guide will help you understand how to organize and contribute to our project documentation.

---

## Folder Naming Rules

### Prefixes: Controlling Sidebar Order

We use **numeric prefixes** to control the order in which folders appear in the sidebar. Docusaurus sorts folders alphabetically, so prefixes ensure logical ordering:

| Prefix Range | Purpose                   | Example                              |
| ------------ | ------------------------- | ------------------------------------ |
| `00-`        | Planning & Specifications | `00-planning`, `00-research`         |
| `10-`        | Frontend Applications     | `10-web-frontend`, `10-mobile-app`   |
| `20-`        | Backend Services          | `20-backend-core`, `20-backend-auth` |
| `30-`        | Infrastructure & DevOps   | `30-infrastructure`, `30-deployment` |
| `40-`        | Testing & QA              | `40-testing`, `40-qa-procedures`     |
| `99-`        | Incidents & Post-Mortems  | `99-incidents`                       |

**Key Points:**

- Prefixes are **required** for all top-level project folders
- Use increments of 10 to allow for future insertions (e.g., `10-`, `20-`, `30-`)
- The prefix determines sidebar order, not the folder name itself

### Casing: Enforce kebab-case

All files and folders **must** use `kebab-case`:

✅ **Correct:**

- `project-a-superapp`
- `00-planning`
- `backend-authentication-service`
- `incident-2024-01-15.md`

❌ **Incorrect:**

- `ProjectASuperApp` (PascalCase)
- `project_a_superapp` (snake_case)
- `00 Planning` (spaces)
- `Backend-Authentication-Service` (mixed case)

**Why kebab-case?**

- URL-friendly (no encoding needed)
- Consistent across all platforms
- Easy to read and type
- Standard in web development

---

## Standard Folder Map

Use this table as a reference when creating new project documentation:

| Prefix | Folder Name         | Purpose             | What Goes Here                                              |
| ------ | ------------------- | ------------------- | ----------------------------------------------------------- |
| `00-`  | `00-planning`       | Specs & Research    | PRDs, TRDs, ADRs, competitive analysis, user research       |
| `10-`  | `10-web-frontend`   | Web Applications    | React/Vue/Angular apps, web UI documentation                |
| `10-`  | `10-mobile-app`     | Mobile Applications | iOS/Android apps, mobile-specific features                  |
| `20-`  | `20-backend-<name>` | Backend Services    | APIs, microservices, database schemas, service architecture |
| `30-`  | `30-infrastructure` | Infrastructure      | Cloud resources, deployment configs, CI/CD pipelines        |
| `40-`  | `40-testing`        | Testing & QA        | Test plans, QA procedures, automated test documentation     |
| `99-`  | `99-incidents`      | Post-Mortems        | Incident reports, post-mortem analyses, lessons learned     |

### Backend Services Naming

For backend services, use the pattern: `20-backend-<service-name>`

Examples:

- `20-backend-core` - Core API and shared services
- `20-backend-auth` - Authentication and authorization service
- `20-backend-payments` - Payment processing service
- `20-backend-notifications` - Notification service

---

## Creating a New Project

### Manual Creation

1. Create a new folder under `docs/projects/` using `kebab-case`:

   ```
   docs/projects/my-new-project/
   ```

2. Create an `index.md` file with a project overview and table of contents

3. Add numbered folders based on your project's architecture:

   ```
   docs/projects/my-new-project/
   ├── index.md
   ├── 00-planning/
   ├── 10-web-frontend/
   ├── 20-backend-core/
   └── 99-incidents/
   ```

4. Update the navbar in `docusaurus.config.ts` to add your project to the dropdown

### Using the Scaffolding Script

We provide an interactive script to automate project creation:

```bash
pnpm run create-project
```

The script will:

- Prompt you for the project name (automatically converted to kebab-case)
- Ask which layers you need (Web, Mobile, Backend)
- Generate the correct folder structure with proper prefixes
- Create a standard `index.md` with a table of contents

---

## Incident Documentation

### Creating Incident Reports

1. Navigate to your project's `99-incidents/` folder
2. Copy the template: `template-incident.md`
3. Rename it with the incident ID and date: `inc-001-2024-01-15-database-outage.md`
4. Fill in all sections of the template

### Incident Severity Levels

Use Docusaurus admonitions to indicate severity:

**Critical (Production Down):**

```markdown
:::danger Critical Severity
Production services are completely unavailable
:::
```

**Major (Degraded Performance):**

```markdown
:::warning Major Severity
Services are degraded but partially functional
:::
```

**Minor (Limited Impact):**

```markdown
:::info Minor Severity
Minor issue with limited user impact
:::
```

---

## Best Practices

### File Naming

- Use descriptive names: `authentication-flow.md` not `auth.md`
- Include dates for time-sensitive docs: `migration-plan-2024-q1.md`
- Use consistent naming within each section

### Documentation Structure

- Always include an `index.md` in each folder
- Use markdown tables for structured data
- Link between related documents
- Keep documents focused and concise

### Markdown Guidelines

- Use proper heading hierarchy (H1 → H2 → H3)
- Include code blocks with language specification
- Use admonitions for important notes, warnings, and tips
- Add alt text to images for accessibility

---

## Questions?

If you have questions about documentation structure or naming conventions, please:

1. Check this guide first
2. Look at existing projects for examples
3. Ask in the team chat
