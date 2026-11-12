# Testable Requirements: Hotel Package Tracker

**Team number:** [XX]
**Inherited from:** Team [XX]

## Who Owns What

| Area of the system | Owner | ID prefix |
|---|---|---|
| Package Logging (API) | David Martindale | DM |
| Frontend / UI | Matthew | MR |
| Data Models & Stubs | Travis | TT |
| Search & Retrieval | Nish | NM |

**Part 5 requirements hand-off:**
- CR-1 → David (Package Logging)
- CR-2 → Travis (Data Models)
- CR-3 → Travis (Data Models)
- CR-4 → Travis (Data Models)
- CR-5 → Nish (Search & Retrieval)

**Part 6 tests hand-off:**
- TC-1 → David (Package Logging)
- TC-2 → David (Package Logging)
- TC-3 → David (Package Logging)

<!--
RULES
- Only edit YOUR OWN section below. This keeps merge conflicts away.
- Categories: G = Stakeholder Goal, REQ = Functional, NFR = Non-Functional.
- "From Part 5": write the original CR ID and its text from SYSTEM_MAP.md. Write "New" if you added it this sprint.
- Status: Confirmed or Suspected bug. No Unconfirmed allowed. Every Suspected bug needs a GitHub Issue.
- The test: could a stranger write a Pass or Fail test without asking you a question?
-->

---

## Section: Package Logging (David Martindale)

Covers `routes/packages.js` → `router.post('/')`, `models/Package.js`, `app.js`, and `server.js`.

### Stakeholder Goals

| ID | Stakeholder | Goal |
|---|---|---|
| G-DM-01 | Front desk staff | When a package arrives, I need to record it in a few seconds and trust that the record was saved correctly, so I can find it and hand it to the right guest later. |
| G-DM-02 | Hotel manager | Only hotel staff can create package records, so the log can be trusted when a guest disputes a delivery. |

### Functional Requirements

| ID | Requirement | Status | From Part 5 |
|---|---|---|---|
| REQ-DM-01 | When `POST /api/packages` receives a JSON body with a non-empty `trackingNumber`, `guestName`, and `carrier`, the system shall save one package record and respond HTTP 201 with the saved record, including those three values, an `_id`, and a `createdAt` timestamp. | Confirmed | CR-1 (Confirmed): The system shall create and save package records that contain a tracking number, guest name, and carrier. |
| REQ-DM-02 | When `trackingNumber`, `guestName`, or `carrier` is missing, empty, or only whitespace, the system shall save nothing and respond HTTP 400 with a JSON body containing an `error` message. | Suspected bug | New (CR-1 named three required fields but gave no behavior when one is absent) |
| REQ-DM-03 | The system shall set `status` to `"Logged"` on every newly created package record and ignore any `status` value sent by the client. | Confirmed | New |
| REQ-DM-04 | The system shall remove leading and trailing whitespace from `trackingNumber`, `guestName`, and `carrier` before saving. | Confirmed | New |
| REQ-DM-05 | When `POST /api/packages` receives a `trackingNumber` that matches an already saved record, the system shall save nothing and respond HTTP 409 with a JSON body containing an `error` message. | Suspected bug | New |

### Non-Functional Requirements

| ID | Requirement | Status | From Part 5 |
|---|---|---|---|
| NFR-DM-01 | Security: the system shall reject any `POST /api/packages` request that carries no staff credentials with HTTP 401 and save nothing. | Suspected bug | New |
| NFR-DM-02 | Security: every error response from `/api/packages` shall be a JSON body with an `error` field and shall contain no stack trace and no server file path. | Suspected bug | New |

---

## Section: Frontend / UI (Matthew)

### Stakeholder Goals

| ID | Stakeholder | Goal |
|---|---|---|
| G-MR-01 | | |

### Functional Requirements

| ID | Requirement | Status | From Part 5 |
|---|---|---|---|
| REQ-MR-01 | | | |
| REQ-MR-02 | | | |
| REQ-MR-03 | | | |

### Non-Functional Requirements

| ID | Requirement | Status | From Part 5 |
|---|---|---|---|
| NFR-MR-01 | | | |

---

## Section: Data Models & Stubs (Travis)

### Stakeholder Goals

| ID | Stakeholder | Goal |
|---|---|---|
| G-TT-01 | | |

### Functional Requirements

| ID | Requirement | Status | From Part 5 |
|---|---|---|---|
| REQ-TT-01 | | | CR-2 |
| REQ-TT-02 | | | CR-3 |
| REQ-TT-03 | | | CR-4 |

### Non-Functional Requirements

| ID | Requirement | Status | From Part 5 |
|---|---|---|---|
| NFR-TT-01 | | | |

---

## Section: Search & Retrieval (Nish)

### Stakeholder Goals

| ID | Stakeholder | Goal |
|---|---|---|
| G-NM-01 | | |

### Functional Requirements

| ID | Requirement | Status | From Part 5 |
|---|---|---|---|
| REQ-NM-01 | | | CR-5 |
| REQ-NM-02 | | | |
| REQ-NM-03 | | | |

### Non-Functional Requirements

| ID | Requirement | Status | From Part 5 |
|---|---|---|---|
| NFR-NM-01 | | | |
