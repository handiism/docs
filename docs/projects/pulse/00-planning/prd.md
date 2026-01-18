# Product Requirements Document (PRD)
## Pulse

---

## 1. Product Overview

**Pulse** is a lightweight real-time interaction platform that enables multiple users to participate in shared activities—such as counters and polls—and see updates instantly.

Pulse emphasizes:
- Immediacy
- Clarity
- Minimal interaction friction

Pulse supports **live collaboration**, **role-based control**, and **media-enhanced interaction** without introducing unnecessary complexity.

---

## 2. Problem Statement

Many live interactions (meetings, demos, classrooms, workshops) require:
- Shared state
- Instant feedback
- Simple control boundaries

Existing tools are often either:
- Too complex for small interactions, or
- Too limited to support real-time collaboration with clear control

Pulse addresses this by combining **real-time updates**, **simple roles**, and **optional media support** in a single focused experience.

---

## 3. Goals and Objectives

### Primary Goals
- Enable shared real-time interaction
- Reflect updates instantly for all users
- Support structured participation via roles

### Secondary Goals
- Enhance interactions with optional media
- Require no onboarding
- Stay usable across desktop and mobile devices

---

## 4. System Diagrams
 
The following diagrams provide visual representations of Pulse system:
 
- **[User Flow Diagram](./diagrams/02-user-flow-diagram.mmd)** - Shows interaction flows for different user roles
- **[Use Case Diagram](./diagrams/03-use-case-diagram.mmd)** - Illustrates actors and their available use cases

---

## 5. Target Users

### Primary Users
- Meeting or workshop participants
- Audience members in live sessions
- Students in interactive classes

### Secondary Users
- Facilitators
- Presenters
- Moderators

---

## 6. User Roles (Conceptual)

- **Admin** – Full control over session and content
- **Moderator** – Manages polls and shared content
- **Participant** – Interacts with polls and counters
- **Viewer** – Observes results only

Roles define *what actions are allowed*, not how the system is implemented.

---

## 7. Core Use Cases

### 6.1 Shared Counter
- One global counter per session
- Participants can increment
- Everyone sees changes instantly

---

### 6.2 Live Polling
- Predefined question with multiple options
- Participants can vote once
- Results update in real time

---

### 6.3 **Poll Options with Media (File Upload)**

**Description**  
Poll options may include an image or document uploaded by a facilitator to provide visual context.

**Example**
- “Which design do you prefer?”
  - Option A → image
  - Option B → image

**User Value**
- Improves clarity
- Reduces ambiguity
- Increases engagement

**Role Expectations**
- Admin / Moderator: upload poll media
- Participants: view media and vote
- Viewers: view results and media

---

### 6.4 Live Material Sharing

**Description**  
During a session, facilitators can share a file (e.g., PDF or image) with all participants.

**User Value**
- Enables quick context sharing
- Supports live explanation or discussion

**Behavior**
- File appears instantly to all users
- Users may download or view

---

## 8. User Stories

### As an Admin
- I want to create polls with images
- I want to control what content is shared

### As a Moderator
- I want to upload images for poll options
- I want participants to immediately see shared material

### As a Participant
- I want to vote on polls with visual context
- I want to see updates without refreshing

### As a Viewer
- I want to observe live results and shared content
- I do not need to interact

---

## 9. User Experience Requirements

### Simplicity
- Single-page interaction
- No account creation
- Clear primary action

### Visual Clarity
- Media should be clearly associated with its context
- Poll results should remain readable even with images

### Responsiveness
- Smooth real-time updates
- Media should not block interaction

---

## 10. Accessibility Requirements

- Images should support descriptive labels
- Content readable on small screens
- Usable without audio

---

## 11. Constraints & Assumptions

- Media uploads are optional
- Files are session-scoped
- Media is static once uploaded
- Interaction remains lightweight

---

## 12. Success Criteria

Pulse is successful if:
- Users understand how to interact immediately
- Media-enhanced polls improve clarity
- Real-time updates feel reliable
- Roles prevent misuse without friction

---

## 13. Out of Scope

- User authentication systems
- Long-term file storage guarantees
- Content moderation workflows
- Analytics or reporting

---

## 14. Future Considerations

- Multiple concurrent sessions
- Media replacement or versioning
- Timed polls
- Session replay mode

---

## 15. Summary

**Pulse** delivers real-time shared interaction with optional media support while remaining intentionally simple.

By adding **file uploads for poll options and session materials**, Pulse enhances clarity and engagement without compromising its lightweight nature.

> Pulse keeps the interaction live, focused, and visually clear — exactly when it matters most.
