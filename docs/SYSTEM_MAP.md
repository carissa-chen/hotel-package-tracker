# Trace the Click: System Map

**Team:** Group15  
**Inherited project:** `hotel-package-tracker`  
**User action traced:** Create a package record

## Team and Roles

| Role | Owns | Name |
|---|---|---|
| Product Analyst | Part 1 and questions in Part 4 | Nish |
| Architect | Part 2 and mismatches in Part 4 | Travis |
| Frontend Tracer | Part 3, client side | Matthew |
| Backend Tracer | Part 3, server side | David |
| Candidate Requirements | Part 5 | Matthew |
| Unit Test Cases | Part 6 | Nish |

## Part 1: Purpose
This system lets hotel front desk staff record and search for guest packages so the packages can stay organized and be found when a guest comes to pick one up.

The user action we traced is creating a package record. A staff member enters the guest's name, tracking number, and shipping carrier, then submits the form. The information is sent to the server and saved as a package record.

## Part 2: As-Built Architecture

Part 2: As-built architecture diagram

[react + vite client] --http post /api/packages (json package fields)--> [express api]
[express api] --new Package(...) + save()--> [mongoose Package model]
[mongoose Package model] --write package document--> [mongodb]
[mongodb] --saved document--> [mongoose Package model]
[mongoose Package model] --savedPackage--> [express api]
[express api] --http 201 (saved package json)--> [react + vite client]

[express server] --mongoose.connect(MONGO_URI)--> [mongodb]
[github actions] --npm test on push / pr to main--> [jest + supertest tests]


## Part 3: Trace the click

| Step | Layer | File and function | Data in / data out | Notes or surprises |
|---|---|---|---|---|
| 1 | Frontend | `src/form.jsx` → `handleSubmit(event)` | Form fields → JSON POST request to `/api/packages` | Combines first and last name into `guestName`; sends `trackingNumber` and `carrier` too. |
| 2 | API route | `app.js` → `app.use('/api/packages', packageRoutes)` | POST `/api/packages` → package router | `express.json()` parses the request body. |
| 3 | Backend logic | `routes/packages.js` → `router.post('/')` | Request body → new `Package` object | Checks that `trackingNumber` and `guestName` are present. |
| 4 | Database | `routes/packages.js` → `newPackage.save()` | Package object → saved MongoDB document | The stored package schema is defined in `models/Package.js`. |
| 5 | Response back | `routes/packages.js` → `res.status(201).json(savedPackage)` | Saved package → HTTP 201 response with JSON | `src/form.jsx` reads the response and displays a success alert. |

## Part 4: Reality check and open questions

Open the handoff UML and compare it to your diagram. Circle every mismatch on your diagram.

**What the handoff docs got wrong or left out:**

1. The log-package sequence diagram shows PackageInfo.logPackage() calling AdditionalPackageInfo.updateAdditionalInfo(). In the running code, the react form sends POST /api/packages to the express route, which creates and saves a mongoose Package. The two methods shown in the sequence diagram are still TODO stubs and are not used in that request path.
2. The class diagram treats PackageInfo as the package record, but the record actually saved to mongodb is defined in models/Package.js. Its fields include guestName, trackingNumber, carrier, status, and createdAt. the UML's PackageInfo fields and methods do not describe that stored model.

**Three questions for the original team.** For each, note whether it is about intent ("was this on purpose?") or design ("why is it built this way?").

1. What’s the intent in choosing to run a server instead of store data locally? 
2. Why did you create another field for specifying package carrier? 
3. Why is it orange? 

## Part 5: Candidate Requirements

## Part 5 - Matthew

| ID | Candidate requirement | Type | Source | Status | Acceptance criterion |
|---|---|---|---|---|---|
| CR-1 | The system shall create and save package records that contain a tracking number, guest name, and carrier. | Functional | routes -> packages.js | Confirmed | Created record is returned with HTTP 201. |
| CR-2 | The system shall create package objects containing package info and functions related to package storage. | Functional | src -> PackageInfo.js | Confirmed | All methods in PackageInfo.js work properly. |
| CR-3 | The system shall create records of package pick-ups containing signature data and a pick up time. | Functional | src -> PickupRecord.js | Confirmed | A PickupRecord object is created containing a signature data and recorded time. |
| CR-4 | The system shall scan packages and record customers’ first names, last names, and the package tracking number. | Functional | src -> scanResult.js | Confirmed | parseText reads scanned text and parses out relevant information to the scanResult object. |
| CR-5 | The system shall search for packages in its data using a tracking number and guest name. | Functional | routes -> packages.js | Confirmed | Found package object is returned with HTTP 200 created. |

## Part 6: Three Unit Test Cases

| ID | Requirement | Kind | Unit under test (file and function) | Input | Expected output | Predicted result today |
|---|---|---|---|---|---|---|
| TC-1 | CR-1 | Positive | `routes/packages.js` → `router.post('/')` | `POST /api/packages` with `{ trackingNumber: 'TRK987654321', guestName: 'Jane Doe', carrier: 'FedEx' }` | The server should return HTTP 201 and the response should include the saved package information, including the tracking number, guest name, and carrier. | Pass; the current test confirms the HTTP 201 response and checks that the tracking number is returned. |
| TC-2 | CR-2 | Negative | `routes/packages.js` → `router.post('/')` | `POST /api/packages` with `{ guestName: 'Jane Doe', carrier: 'FedEx' }` | HTTP 400 with a validation error because `trackingNumber` is missing | Pass; this is covered by `tests/package.test.js`. |
| TC-3 | CR-3 | Boundary | `routes/packages.js` → `router.post('/')` and `models/Package.js` → `packageSchema` | Valid package data with no `status` field | The saved package should contain `status: 'Logged'`, the default value at the edge of the optional status input | Pass is expected when the real Mongoose model is used; the current mocked route test supplies the status in the mock result. |

## Ownership

- Part 1: Nish
- Part 2: Travis
- Part 3 client side: Matthew
- Part 3 server side: David
- Part 4 mismatches: Travis
- Part 5 candidate requirements: matthew
- Part 6 unit test cases: Nish
