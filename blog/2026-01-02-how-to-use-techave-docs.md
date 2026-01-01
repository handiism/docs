---
slug: how-to-use-techave-docs
title: How to Use Techave Docs
authors: [techave-team]
tags: [guide, docusaurus, scaffolding]
---

Welcome to **Techave Docs**! This guide will walk you through how to use this repository to manage documentation for all our projects.

## Introduction

This repository is built with [Docusaurus](https://docusaurus.io/) and serves as the central hub for all Techave technical documentation. It is designed to scale with our organization, providing a structured way to document everything from planning to incident reports.

<!-- truncate -->

## Getting Started

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (version 20 or higher)
- [pnpm](https://pnpm.io/) (recommended package manager)

To set up the repository locally:

1.  Clone the repository.
2.  Install dependencies:

```bash
pnpm install
```

## Creating a New Project

We have a custom scaffolding tool to help you set up new documentation projects quickly and consistently. This tool ensures that every project follows our standard layer structure.

To create a new project, run:

```bash
pnpm run create-project
```

### Interactive Prompts

The script will guide you through the following steps:

1.  **Project Name**: Enter the display name of your project (e.g., "Super App"). The script will automatically generate a kebab-case slug (e.g., `super-app`).
2.  **Select Layers**: Choose the documentation layers your project needs. The available layers are:
    - **Planning**: PRDs, TRDs, and research.
    - **Web Frontend**: Web application documentation.
    - **Mobile App**: Mobile application documentation.
    - **Backend**: Backend service documentation.
    - **Infrastructure**: DevOps and infrastructure docs.
    - **Testing**: QA and testing guides.
    - **Incidents**: Post-mortems and incident reports.
3.  **Backend Configuration**: If you selected "Backend", you will be asked for the number of services and their names (e.g., `core`, `auth`, `payment`).

Once confirmed, the tool will generate the folder structure in `docs/projects/<project-slug>`.

## Project Structure

Our documentation follows a layered approach using numbered prefixes to ensure consistent ordering in the sidebar:

- `00-planning`: High-level planning documents.
- `10-web-frontend`: Frontend web docs.
- `10-mobile-app`: Mobile app docs.
- `20-backend-*`: Backend service docs (one folder per service).
- `30-infrastructure`: Infrastructure docs.
- `40-testing`: Testing docs.
- `99-incidents`: Incident reports.

Each folder comes with an `index.md` to get you started.

## Running Locally

To start the local development server:

```bash
pnpm start
```

This will open the documentation site at `http://localhost:3000`. Most changes are reflected live without restarting the server.

## Deployment

We use a standard Docusaurus build process.

To build the static files:

```bash
pnpm run build
```

To deploy (if configured):

```bash
pnpm run deploy
```

---

That's it! You are now ready to contribute to Techave Docs. If you have any questions, reach out to the platform engineering team.
