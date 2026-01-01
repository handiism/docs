---
id: incident-template
title: "[INCIDENT-XXX] Brief Incident Title"
sidebar_label: "INC-XXX: Title"
---

:::danger Critical Severity
**Use this admonition for Critical incidents**
:::

:::warning Major Severity
**Use this admonition for Major incidents**
:::

## Incident Metadata

| Field           | Value                                          |
| --------------- | ---------------------------------------------- |
| **Incident ID** | INC-XXX                                        |
| **Date**        | YYYY-MM-DD                                     |
| **Status**      | Investigating / Resolved / Monitoring          |
| **Component**   | Component Name (e.g., Backend API, Mobile App) |
| **Severity**    | Critical / Major / Minor                       |
| **Duration**    | XX hours XX minutes                            |
| **Impact**      | Brief description of user impact               |

---

## Summary

Provide a brief, high-level summary of what happened. This should be 2-3 sentences explaining:

- What went wrong
- When it occurred
- What the immediate impact was

---

## Timeline

Document the incident timeline in chronological order:

| Time (UTC) | Event                      |
| ---------- | -------------------------- |
| 14:00      | Initial alert triggered    |
| 14:05      | Engineering team notified  |
| 14:15      | Root cause identified      |
| 14:30      | Fix deployed to production |
| 14:45      | Services fully restored    |

---

## Root Cause

### Technical Details

Explain the technical root cause of the incident:

- What specifically failed or malfunctioned
- Why it failed (configuration issue, code bug, infrastructure problem, etc.)
- Any contributing factors

### Why It Wasn't Caught Earlier

- Why didn't monitoring catch this?
- Why didn't testing catch this?
- What gaps existed in our processes?

---

## Resolution

### Immediate Fix

Describe what was done to restore service:

- Emergency patches applied
- Services restarted
- Traffic rerouted
- etc.

### Permanent Fix

Describe the long-term solution:

- Code changes
- Configuration updates
- Infrastructure improvements
- Process changes

---

## Action Items

| Action                    | Owner     | Due Date   | Status                                |
| ------------------------- | --------- | ---------- | ------------------------------------- |
| Add monitoring for X      | @engineer | YYYY-MM-DD | ✅ Done / 🔄 In Progress / ⏳ Pending |
| Update deployment process | @devops   | YYYY-MM-DD | ✅ Done / 🔄 In Progress / ⏳ Pending |
| Add integration tests     | @qa       | YYYY-MM-DD | ✅ Done / 🔄 In Progress / ⏳ Pending |

---

## Lessons Learned

### What Went Well

- Quick detection and response
- Effective communication
- etc.

### What Could Be Improved

- Better monitoring coverage
- Faster rollback procedures
- etc.

### Prevention Measures

List specific measures to prevent this from happening again:

1. Add automated tests for scenario X
2. Implement circuit breakers for service Y
3. Update runbooks with new procedures
