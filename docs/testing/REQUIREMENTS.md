# Testable Requirements: Hotel Package Tracker

**Team number:** [XX]
**Inherited from:** Team [XX]

## Who Owns What

| Area of the system | Owner | ID prefix |
|---|---|---|
| Package Logging (API) | David Martindale | DM |
| Search & Retrieval | Matthew | MR |
| Data Models & Stubs | Travis | TT |
| Frontend / UI | Nish | NM |

**Part 5 requirements hand-off:**
- CR-1 → David (Package Logging)
- CR-2 → Travis (Data Models)
- CR-3 → Travis (Data Models)
- CR-4 → Travis (Data Models)
- CR-5 → Matthew (Search & Retrieval)

**Part 6 tests hand-off:**
- TC-1 → David (Package Logging)
- TC-2 → Nish (Package Logging)
- TC-3 → Matthew (Package Logging)

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

## Section: Frontend / UI (Nish)

### Stakeholder Goals

| ID      | Stakeholder | Goal |
|---------|---|---|
| G-NM-01 | Front desk staff | Front desk staff need to log a guest package quickly and know whether it was actually saved so they can retrieve it later. |

### Functional Requirements

| ID        | Requirement | Status | From Part 5 |
|-----------|---|---|---|
| REQ-NM-01 | When a user enters a first name, last name, tracking number, and carrier and submits the form, the frontend shall send a POST request to /api/packages containing the combined guest name, tracking number, and carrier as JSON. | Confirmed | New |
| REQ-NM-02 | When the server responds with HTTP 201 and a saved package record, the frontend shall display the message "Package logged successfully!". | Confirmed | New |
| REQ-NM-03 | When the server responds with an HTTP error such as 400 or 500, the frontend shall display an error message and shall not display "Package logged successfully!". | Suspected bug | New |

### Non-Functional Requirements

| ID        | Requirement | Status | From Part 5 |
|-----------|---|---|---|
| NFR-NM-01 | Ease of use: the form shall require the first name, last name, tracking number, and carrier fields before allowing submission. | Confirmed | New |

---

## Section: Data Models & Stubs (Travis)

### Stakeholder Goals

| ID | Stakeholder | Goal |
|---|---|---|
| G-TT-01 | Hotel front desk staff | Front desk staff need package data to be stored completely and accurately so package information can be recorded, updated, and retrieved without losing important details. |

### Functional Requirements

| ID | Requirement | Status | From Part 5 |
|---|---|---|---|
| REQ-TT-01 | The `PackageInfo` class shall create an object containing `firstName`, `lastName`, `trackingNo`, `deliveryDate`, `deliveryTime`, and `status` fields, and shall provide the methods `logPackage()`, `markAsRetrieved()`, `applyScanResult()`, and `getDetails()`. | Suspected bug | CR-2: The system shall create package objects containing package info and functions related to package storage. |  which may alter the outcome 
| REQ-TT-02 | The `PickupRecord` class shall create a pickup record containing `signatureData` and `pickupTime`. Its `captureSignature(signatureData)` method shall store the provided signature data and record the pickup time. | Suspected bug | CR-3: The system shall create records of package pick-ups containing signature data and a pick up time. | 
| REQ-TT-03 | The `scanResult` class shall use `parseText(rawText)` to extract and store the customer’s first name, last name, and tracking number. Its `isValid()` method shall confirm whether all three values are present. | Suspected bug | CR-4: The system shall scan packages and record customers’ first names, last names, and the package tracking number. |
| REQ-TT-04 | The `scanResult.isValid()` method shall return `true` only when `guestFirstName`, `guestLastName`, and `trackingNo` all contain values, and shall return `false` when any of those fields is empty or missing. | Suspected bug | New, derived from CR-4 |



### Non-Functional Requirements

| ID | Requirement | Status | From Part 5 |
|---|---|---|---|
| NFR-TT-01 | Data accuracy: When valid package values are supplied to a data-model class, the class shall preserve each value unchanged and return the complete information through its public methods. | Suspected bug | New |

---

## Section: Search & Retrieval (Matthew)

### Stakeholder Goals

| ID      | Stakeholder                          | Goal                                                                                 |
|---------|--------------------------------------|--------------------------------------------------------------------------------------|
| G-MR-01 | Hotel staff responsible for packages | Hotel staff in charge of handling packages should be able to search for the package. |

### Functional Requirements

| ID        | Requirement                                                                                                                                                                                                                                                                                         | Status    | From Part 5 |
|-----------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------|-------------|
| REQ-MR-01 | When POST api/packages receives a JSON object containing a `trackingNumber`, `guestName`, and `carrier`, the system will create and save a package record, then respond HTTP 201 with the saved record that includes the three mentioned values, an `_id`, a `status`, and a `createdAt` timestamp. | Confirmed | CR-1        |
| REQ-MR-02 | `PackageInfo.js` creates an object with 6 fields: `firstName`, `lastName`, `trackingNo`, `deliveryDate`, `deliveryTime`, and `status`, including 4 methods: `logPackage()`, `markAsRetrieved()`, `applyScanResults()`, `getDetails()`.                                                              | Confirmed | CR-2        |
| REQ-MR-03 | `PackageRepository.js` creates an object with a `connectionString` and sets `dbConnection` to null, and includes a method `findPackagesByCriteria` that returns an array of packages matching a `query` and `filter`.                                                                               | Confirmed | CR-5        |

### Non-Functional Requirements

| ID        | Requirement                                                | Status    | From Part 5 |
|-----------|------------------------------------------------------------|-----------|-------------|
| NFR-MR-01 | Employees can scan packages to enter them into the system. | Confirmed | CR-4        |
