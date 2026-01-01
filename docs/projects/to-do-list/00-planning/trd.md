# Technical Requirement Document (TRD) - To Do List

## Architecture

The application follows a client-server architecture.

### Frontend

- **Framework**: Next.js
- **Styling**: Vanilla CSS
- **State Management**: React Hooks / Context API

### Backend

- **Language**: Go
- **API Style**: RESTful or GraphQL
- **Database**: PostgreSQL or MongoDB (to be decided)

## Data Model

- **Task**:
  - ID: UUID
  - Title: String
  - Description: String
  - Status: Enum (Pending, In Progress, Completed)
  - DueDate: DateTime
  - CreatedAt: DateTime
  - UpdatedAt: DateTime

## Security

- JWT-based authentication.
- Input validation on both frontend and backend.
- Rate limiting for API endpoints.
