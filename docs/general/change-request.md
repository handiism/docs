# Change Request Process

This document outlines the process for managing Change Requests (CRs) effectively during the project initiation and execution phases.

## Overview

A **Change Request (CR)** is a formal proposal to modify any document, deliverable, or baseline. This process is universal and applies to **both technical and non-technical** changes.

### When to use a CR?

- **Non-Technical**: Changes to Business Requirements, Product Specifications, Scope, Timelines, or Policy.
- **Technical**: Changes to System Architecture, Database Schema, API Contracts, or Technology Stack.

## The Flow

1.  **Identify Need**: A team member identifies a need for a change (e.g., new feature, logic update, structural change).
2.  **Draft CR**: The proposer creates a Change Request document in the project's planning folder.
3.  **Review**: The team (and specifically the Lead/Owner) reviews the CR.
    - **RFC (Request for Comments)**: Discuss validity, impact, and feasibility.
4.  **Decision**:
    - **Approved**: The change is accepted. The status is updated, and the change is scheduled for implementation.
    - **Rejected**: The change is denied with a reason.
    - **Deferred**: The change is valid but will be handled later.
5.  **Implementation**: The approved change is executed (code updated, docs updated).
6.  **Close**: The CR is marked as implemented.

## Project Structure

For every project, we maintain a dedicated folder for CRs to keep history and context.

```
docs/projects/<project-name>/
├── 00-planning/
│   ├── change-requests/
│   │   ├── index.md        <-- The Change Request Log
│   │   ├── cr-001-title.md
│   │   └── cr-002-title.md
```

### The Change Request Log (`index.md`)

The `index.md` file in the `change-requests` folder serves as the central log. It must be manually updated when a new CR is added.

**Format:**

| ID                                  | Title              | Status         | Author       | Date       |
| ----------------------------------- | ------------------ | -------------- | ------------ | ---------- |
| [CR-001](./cr-001-add-google-login) | Add Google Login   | ✅ Implemented | @handiism    | 2024-01-02 |
| [CR-002](./cr-002-update-schema)    | Update User Schema | 🟡 Review      | @anotheruser | 2024-01-03 |

**Status Legend:**

- 🔵 **Draft**: Work in progress.
- 🟡 **Review**: Open for comments (RFC).
- 🟢 **Approved**: Accepted, ready for implementation.
- ✅ **Implemented**: Done.
- 🔴 **Rejected**: Denied.

## Change Request Template

When creating a new CR, use the following structure:

### File Name

Format: `cr-<number>-<short-description>.md`
Example: `cr-001-add-social-login.md`

### Content

```markdown
# CR-001: Add Social Login

**Status**: 🟡 Review
**Author**: @yourname
**Date**: 2024-01-02

## Summary

Briefly describe the change.

## Motivation

Why is this change necessary? What problem does it solve?

## Proposed Solution

Detail the technical or functional changes required.

- [ ] Update Auth Service
- [ ] UI changes on Login Screen

## Impact / Risks

What else might break? Are there performance concerns?

## Alternatives Considered

Did you think of other ways? Why is this the best one?
```
