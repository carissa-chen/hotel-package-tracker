# Test Cases: David M

**Team number:** [XX]
**My area:** Package Logging (API): `routes/packages.js` → `router.post('/')`, `models/Package.js`, `app.js`, `server.js`

## How these tests were run

- **Code tested:** commit `3e1ffb4` on `main`, with no code changes.
- **Run:** 2026-11-15, `server.js` unmodified, Node 22.23.4, MongoDB 7.0.34, real HTTP requests against the running server.
- **Database:** the server was started with `PORT=5055` and `MONGO_URI` pointing at a scratch database, so no existing package records were touched. The steps below use the default address, `http://127.0.0.1:5000`.

**Standard setup** (the precondition for every test that needs the server):

1. MongoDB is running locally.
2. `npm start` is running and its terminal shows "Connected to MongoDB".
3. The `packages` collection is empty. This command deletes every package record in the local `hotel-tracker` database: `mongosh hotel-tracker --quiet --eval "db.packages.deleteMany({})"`

Send requests with any HTTP client (curl, Postman, the VS Code REST Client).

## Results

| Test ID | Type | Traces to | Status | GitHub Issue |
|---|---|---|---|---|
| DM-01 | Unit | REQ-DM-01 | Pass | N/A |
| DM-02 | Integration | REQ-DM-01 | Pass | N/A |
| DM-03 | Negative | REQ-DM-02 | Fail | #71 |
| DM-04 | Boundary Value | REQ-DM-02, REQ-DM-01 | Fail | #72 |
| DM-05 | Security | REQ-DM-03 | Pass | N/A |
| DM-06 | Unit | REQ-DM-04 | Pass | N/A |
| DM-07 | Negative | REQ-DM-05 | Fail | #73 |
| DM-08 | Security | NFR-DM-01 | Fail | #74 |
| DM-09 | Negative | NFR-DM-02 | Fail | #75 |
| DM-10 | Acceptance | G-DM-01 | Fail | #76 |

4 passed, 6 failed. Test types used: Unit, Integration, Negative, Boundary Value, Security, Acceptance.

---

**Test ID:** DM-01  
**From Part 6:** TC-1  
**Written by:** David Martindale  
**Title:** Valid package POST returns 201 with the tracking number (route handler, model mocked)  
**Traces to:** REQ-DM-01  
**Test type:** Unit  
**Preconditions:** `npm install` has been run. No server or database is needed, because `tests/package.test.js` mocks `models/Package.js`.  
**Test data:**

```json
{ "trackingNumber": "TRK987654321", "guestName": "Jane Doe", "carrier": "FedEx" }
```

**Steps:**
1. In the project root, run `npx jest tests/package.test.js -t "should create and save a new package record when given valid input"`.
2. Read the Jest summary.

**Expected result:** Jest reports that test as passed: the response status is 201 and `res.body.trackingNumber` equals `TRK987654321`. No test fails.  
**Actual result:** Jest reported 1 passed, 3 skipped (the other tests in the file), 0 failed. Part 6 predicted Pass. Because the model is mocked, this test does not prove a record is saved; DM-02 covers that.  
**Status:** Pass  
**Severity:** N/A  
**V or V:** N/A  
**GitHub Issue:** N/A  

---

**Test ID:** DM-02  
**From Part 6:** New  
**Written by:** David Martindale  
**Title:** A logged package is stored in MongoDB and returned by GET /api/packages  
**Traces to:** REQ-DM-01  
**Test type:** Integration  
**Preconditions:** Standard setup. `packages` collection empty.  
**Test data:**

```json
{ "trackingNumber": "TRK987654321", "guestName": "Jane Doe", "carrier": "FedEx" }
```

**Steps:**
1. Send `POST http://127.0.0.1:5000/api/packages` with header `Content-Type: application/json` and the test data as the body.
2. Send `GET http://127.0.0.1:5000/api/packages`.
3. Count the documents in the collection: `mongosh hotel-tracker --quiet --eval "db.packages.countDocuments()"`.

**Expected result:** Step 1 returns HTTP 201 and a body with the three values sent, `"status": "Logged"`, an `_id`, and a `createdAt` timestamp. Step 2 returns HTTP 200 and an array of exactly one record with the same `_id` and the same three values. Step 3 prints `1`.  
**Actual result:** Step 1 returned 201 with `trackingNumber` `TRK987654321`, `guestName` `Jane Doe`, `carrier` `FedEx`, `status` `Logged`, an `_id`, and a `createdAt`. Step 2 returned 200 and one record with the same `_id` and values. The collection held 1 document.  
**Status:** Pass  
**Severity:** N/A  
**V or V:** N/A  
**GitHub Issue:** N/A  

---

**Test ID:** DM-03  
**From Part 6:** New  
**Written by:** David Martindale  
**Title:** A request with no carrier is rejected with HTTP 400  
**Traces to:** REQ-DM-02  
**Test type:** Negative  
**Preconditions:** Standard setup. `packages` collection empty.  
**Test data:**

```json
{ "trackingNumber": "TRK-DM-03", "guestName": "Jane Doe" }
```

**Steps:**
1. Send `POST http://127.0.0.1:5000/api/packages` with header `Content-Type: application/json` and the test data as the body.
2. Count the documents in the collection: `mongosh hotel-tracker --quiet --eval "db.packages.countDocuments()"`.

**Expected result:** HTTP 400 with a JSON body that has an `error` message. Step 2 prints `0`.  
**Actual result:** HTTP 500 with body `{"error":"Server Error: Unable to save package record."}`. Nothing was saved (count 0). Cause: `routes/packages.js` checks only `trackingNumber` and `guestName`. The missing `carrier` is caught later by the Mongoose schema, and the route's `catch` block reports every save error as 500.  
**Status:** Fail  
**Severity:** Major  
**V or V:** Verification  
**GitHub Issue:** #71  

---

**Test ID:** DM-04  
**From Part 6:** New  
**Written by:** David Martindale  
**Title:** trackingNumber at the minimum-length edge: empty, whitespace only, one character  
**Traces to:** REQ-DM-02 (values A and B), REQ-DM-01 (value C)  
**Test type:** Boundary Value  
**Preconditions:** Standard setup. `packages` collection empty.  
**Test data:**

`guestName` is `"Jane Doe"` and `carrier` is `"FedEx"` in all three requests. `trackingNumber` is:
- A: `""` (length 0)
- B: `"   "` (three spaces; length 0 after trimming)
- C: `"A"` (length 1)

**Steps:**
1. Send `POST http://127.0.0.1:5000/api/packages` with header `Content-Type: application/json` and value A.
2. Repeat with value B.
3. Repeat with value C.
4. Count the documents in the collection: `mongosh hotel-tracker --quiet --eval "db.packages.countDocuments()"`.

**Expected result:** A returns HTTP 400 with a JSON `error` message. B returns HTTP 400 with a JSON `error` message. C returns HTTP 201 with `"trackingNumber": "A"`. Step 4 prints `1`.  
**Actual result:** A returned 400 with `{"error":"Validation Error: trackingNumber and guestName are required."}`. B returned HTTP 500 with `{"error":"Server Error: Unable to save package record."}`. C returned 201 with `"trackingNumber": "A"`. Count was 1, so A and B saved nothing. The test fails on B: the route checks the value before it is trimmed, so three spaces pass the route check and fail in the schema.  
**Status:** Fail  
**Severity:** Major  
**V or V:** Verification  
**GitHub Issue:** #72  

---

**Test ID:** DM-05  
**From Part 6:** New  
**Written by:** David Martindale  
**Title:** A client cannot set the status of a new package  
**Traces to:** REQ-DM-03  
**Test type:** Security  
**Preconditions:** Standard setup. `packages` collection empty.  
**Test data:**

```json
{ "trackingNumber": "TRK-DM-05", "guestName": "Eve Adams", "carrier": "DHL", "status": "Delivered" }
```

**Steps:**
1. Send `POST http://127.0.0.1:5000/api/packages` with header `Content-Type: application/json` and the test data as the body.
2. Send `GET http://127.0.0.1:5000/api/packages` and read the `status` of the stored record.

**Expected result:** Step 1 returns HTTP 201 with `"status": "Logged"`. The stored record in step 2 also has `"status": "Logged"`.  
**Actual result:** Step 1 returned 201 with `"status": "Logged"`. The stored record has `status` `Logged`. The `Delivered` value sent by the client was ignored.  
**Status:** Pass  
**Severity:** N/A  
**V or V:** N/A  
**GitHub Issue:** N/A  

---

**Test ID:** DM-06  
**From Part 6:** New  
**Written by:** David Martindale  
**Title:** The Package schema trims leading and trailing whitespace  
**Traces to:** REQ-DM-04  
**Test type:** Unit  
**Preconditions:** `npm install` has been run. No server or database is needed; the test builds a `Package` document in memory.  
**Test data:**

`trackingNumber` `"  TRK-DM-06  "`, `guestName` `"  John Smith "`, `carrier` `" UPS "`

**Steps:**
1. In the project root, run:
   ```
   node -e "const P=require('./models/Package');const p=new P({trackingNumber:'  TRK-DM-06  ',guestName:'  John Smith ',carrier:' UPS '});console.log(JSON.stringify([p.validateSync()||null,p.trackingNumber,p.guestName,p.carrier]))"
   ```
2. Read the printed line.

**Expected result:** The command prints `[null,"TRK-DM-06","John Smith","UPS"]`: no validation error, and all three values trimmed.  
**Actual result:** Printed `[null,"TRK-DM-06","John Smith","UPS"]`.  
**Status:** Pass  
**Severity:** N/A  
**V or V:** N/A  
**GitHub Issue:** N/A  

---

**Test ID:** DM-07  
**From Part 6:** New  
**Written by:** David Martindale  
**Title:** A tracking number that is already logged is rejected with HTTP 409  
**Traces to:** REQ-DM-05  
**Test type:** Negative  
**Preconditions:** Standard setup. `packages` collection empty.  
**Test data:**

```json
{ "trackingNumber": "TRK-DM-07", "guestName": "Jane Doe", "carrier": "FedEx" }
```

**Steps:**
1. Send `POST http://127.0.0.1:5000/api/packages` with header `Content-Type: application/json` and the test data as the body.
2. Send the identical request a second time.
3. Send `GET http://127.0.0.1:5000/api/packages` and count the records with `trackingNumber` `TRK-DM-07`.

**Expected result:** Step 1 returns HTTP 201. Step 2 returns HTTP 409 with a JSON `error` message. Step 3 shows exactly one record.  
**Actual result:** Step 1 returned 201. Step 2 also returned 201, with a new `_id`. Step 3 showed two records with `trackingNumber` `TRK-DM-07`. Cause: `models/Package.js` has no unique index on `trackingNumber`, and the route does not look for an existing record.  
**Status:** Fail  
**Severity:** Major  
**V or V:** Verification  
**GitHub Issue:** #73  

---

**Test ID:** DM-08  
**From Part 6:** New  
**Written by:** David Martindale  
**Title:** A request with no staff credentials cannot create a package record  
**Traces to:** NFR-DM-01 (serves G-DM-02)  
**Test type:** Security  
**Preconditions:** Standard setup. `packages` collection empty.  
**Test data:**

Headers: `Content-Type: application/json` and `Origin: http://evil.example`. No `Authorization` header and no cookies.
```json
{ "trackingNumber": "TRK-DM-08", "guestName": "Not Staff", "carrier": "UPS" }
```

**Steps:**
1. Send `POST http://127.0.0.1:5000/api/packages` with the headers and body in the test data.
2. Count the documents in the collection: `mongosh hotel-tracker --quiet --eval "db.packages.countDocuments()"`.

**Expected result:** HTTP 401. Step 2 prints `0`.  
**Actual result:** HTTP 201 with the saved record. Count was 1. The response carried `Access-Control-Allow-Origin: *`, so a page on any website can make this request from a visitor's browser. The system has no login and no credential check: `app.js` mounts the routes behind only `cors()` and `express.json()`.  
**Status:** Fail  
**Severity:** Critical  
**V or V:** Verification  
**GitHub Issue:** #74  

---

**Test ID:** DM-09  
**From Part 6:** New  
**Written by:** David Martindale  
**Title:** Malformed JSON gets a JSON error with no stack trace  
**Traces to:** NFR-DM-02  
**Test type:** Negative  
**Preconditions:** Standard setup, with the server started by `npm start` (which does not set `NODE_ENV`). `packages` collection empty.  
**Test data:**

Raw request body, cut off on purpose so it is not valid JSON:
```
{"trackingNumber": "TRK-DM-09",
```

**Steps:**
1. Send `POST http://127.0.0.1:5000/api/packages` with header `Content-Type: application/json` and the raw test data as the body.
2. Read the status code, the `Content-Type` response header, and the body.

**Expected result:** HTTP 400. `Content-Type` is `application/json`. The body is JSON with an `error` field and contains no stack trace and no server file path.  
**Actual result:** HTTP 400, but `Content-Type` was `text/html; charset=utf-8`. The body was an HTML page: `SyntaxError: Expected double-quoted property name in JSON at position 31`, followed by a ten-line stack trace with absolute server paths such as `.../hotel-package-tracker/node_modules/body-parser/lib/types/json.js:96:19`. Nothing was saved. Cause: `app.js` has no error-handling middleware, so Express's default handler answers, and it prints the stack whenever `NODE_ENV` is not `production`.  
**Status:** Fail  
**Severity:** Minor  
**V or V:** Verification  
**GitHub Issue:** #75  

---

**Test ID:** DM-10  
**From Part 6:** New  
**Written by:** David Martindale  
**Title:** Staff can tell apart packages for two guests who share a name  
**Traces to:** G-DM-01 (requirement checked: REQ-DM-01)  
**Test type:** Acceptance  
**Preconditions:** Standard setup. `packages` collection empty. Scenario: two different guests named John Smith are staying, one in room 412 and one in room 718. Each has one package.  
**Test data:**

A:
```json
{ "trackingNumber": "TRK-DM-10A", "guestName": "John Smith", "carrier": "UPS", "roomNo": "412" }
```
B:
```json
{ "trackingNumber": "TRK-DM-10B", "guestName": "John Smith", "carrier": "FedEx", "roomNo": "718" }
```

**Steps:**
1. Send `POST http://127.0.0.1:5000/api/packages` with header `Content-Type: application/json` and body A.
2. Repeat with body B.
3. Send `GET http://127.0.0.1:5000/api/packages`.
4. The John Smith from room 718 asks for his package. Using only the two records from step 3, decide which package is his.

**Expected result:** Each record carries a value that identifies the guest beyond the name, such as the room number, so staff can pick `TRK-DM-10B` for the guest in room 718.  
**Actual result:** Both requests returned 201 and both records were saved. Each record holds only `_id`, `trackingNumber`, `guestName`, `carrier`, `status`, `createdAt`, and `__v`. The `roomNo` values were discarded. The two records show the same `guestName` and nothing else about the guest, so staff cannot tell which package belongs to which John Smith. REQ-DM-01 is met exactly as CR-1 wrote it (tracking number, guest name, carrier), but those three fields do not let staff "hand it to the right guest" as G-DM-01 requires. `src/AdditionalPackageInfo.js` defines a `roomNo` field, but it is an unused stub.  
**Status:** Fail  
**Severity:** Major  
**V or V:** Validation  
**GitHub Issue:** #76  

---
