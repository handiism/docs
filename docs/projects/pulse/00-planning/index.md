# Planning Documentation - Pulse

This directory contains the planning documentation for the Pulse project.

## Document Structure

### Planning Documents
- **[PRD](./prd.md)** - Product Requirements Document
- **[TRD](./trd.md)** - Technical Requirements Document (comprehensive)
- **[Backend](./backend/)** - Backend-Specific Technical Requirements
- **[Frontend](./frontend/)** - Frontend-Specific Technical Requirements

### Diagrams
```
diagrams/
├── 01-architecture-diagram.mmd  # Hexagonal architecture and monorepo structure
├── 02-user-flow-diagram.mmd     # User interaction flows
├── 03-use-case-diagram.mmd      # Actors and use cases
├── 04-erd.mmd                   # Entity Relationship Diagram
├── 05-sequence-diagram.mmd      # Interaction flows
├── 06-state-diagram.mmd         # Lifecycle states
├── 07-deployment-diagram.mmd    # Infrastructure and deployment
└── 08-c4-diagram.mmd            # C4 Context and Container diagrams
```

### Backend Documentation
```
backend/
└── index.md                    # Backend-specific technical requirements
```

### Frontend Documentation
```
frontend/
└── index.md                    # Frontend-specific technical requirements
```

## Document Hierarchy

1. **PRD** - Defines what we're building (product requirements)
2. **TRD** - Defines the comprehensive technical architecture and requirements
3. **Backend** - Defines backend-specific technical requirements
4. **Frontend** - Defines frontend-specific technical requirements

## Reading Order

For new team members, we recommend reading in this order:

1. PRD - Understand the product vision
2. TRD - Understand the overall technical architecture
3. Backend or Frontend - Depending on your focus area

## Contribute

When making changes to planning documents:

1. Update the relevant TRD (backend, frontend, or shared)
2. Update diagrams if needed
3. Cross-reference related documents
4. Update this index if structure changes
