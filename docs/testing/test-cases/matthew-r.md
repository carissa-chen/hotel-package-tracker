# Test Cases: [Your First Name Last Initial]

**Team number:** 15

**My area:** Search & Retrieval: `packages.js`, `PackageInfo.js`, `PackageRepository.js`

<!--
HOW TO USE THIS FILE
1. Copy this file. Name the copy with your first name and last initial, like  maria-g.md
2. Leave TEMPLATE.md untouched for your teammates.
3. If a Part 6 test belongs to your area, upgrade it first and put it in the first block.
   Write at least 4 test cases using at least 3 test types. Include 1 Acceptance test that traces to your Stakeholder Goal.
   Run every test on the inherited system. Every Fail gets a GitHub Issue.
4. Copy the block between the lines for each new test case.
5. Test IDs: use your initials plus a number, like  MG-01, MG-02. This keeps IDs unique across your team.
   "Traces to" must name one of YOUR requirement IDs, like REQ-MG-02.
6. See docs/TESTING_FIELD_GUIDE.md for the sample test case TC-00.
-->

---

**Test ID:** MR-01

**From Part 6:** TC-2

**Written by:** Matthew Rohrer

**Title:** Package entry that is missing data fails and returns HTTP 400

**Traces to:** REQ-MR-01

**Test type:** Negative

**Preconditions:** `npm install` and `npm run dev` have been run to start the front-end of the program. No database needed because `tests/package.test.js` mocks packages.

**Test data:**

```json
{ "guestName": "Jane Doe" }
```

**Steps:**
1. In project terminal, run `npx tests/package.test.js -t "should return HTTP 400 if required fields are missing"`.
2. Read Jest summary.

**Expected result:** Jest says test passed, response status is 400.

**Actual result:** Jest says 1 test passed, 3 skipped, 4 total. Response status is 400.

**Status:** Pass

**Severity:** N/A

**V or V:** N/A

**GitHub Issue:** N/A

---

**Test ID:** MR-02

**From Part 6:** New

**Written by:** Matthew Rohrer

**Title:** Hotel staff should be able to search for packages

**Traces to:** G-MR-01

**Test type:** Acceptance

**Preconditions:** Both front-end and back-end of the program are running. `packages` holds at least one package.

**Test data:**

```json
{ "trackingNumber": "U1230984", "guestName": "John Smith", "carrier": "USPS" }
```

**Steps:**
1. Send `POST http://127.0.0.1:5000/api/packages` with header `Content-Type: application/json` with test data
2. Send `GET http://127.0.0.1:5000/api/packages/search`.
3. Staff should be able to search for the package based on package data.

**Expected result:** Search returns HTTP 200 and package data that was found.

**Actual result:** Correct package data was found and returned with HTTP 200.

**Status:** Pass

**Severity:** N/A

**V or V:** N/A

**GitHub Issue:** N/A

---

**Test ID:** MR-03

**From Part 6:** New

**Written by:** David Martinsdale, for Matthew Rohrer's area

**Title:** GET api/packages/search returns 500 instead of 400 when query is missing

**Traces to:**

**Test type:** Negative

**Preconditions:** Both front-end and back-end of the program are running

**Test data:**

**Steps:**
1. Have MongoDB running
2. Send GET http://127.0.0.1:5000/api/packages/search with no q parameter

**Expected result:** HTTP 400 with a JSON error message saying a search term is required

**Actual result:** HTTP 500 with {"error":"Server Error: Unable to search packages."}

**Status:** Fail

**Severity:** Medium

**V or V:** Verification

**GitHub Issue:** #90

---

**Test ID:** MR-04

**From Part 6:** New

**Written by:** Matthew Rohrer

**Title:** Search treats special characters as a pattern. "(" returns 500 and "1.5" matches the wrong package

**Traces to:**

**Test type:** Unit

**Preconditions:** Have MongoB running with two packages with tracking numbers `1Z-125-XY` and `ABC1.5`

**Test data:**

**Steps:**
1. Have MongoDB running
2. Log two packages with tracking numbers `1Z-125-XY` and `ABC1.5`
3. Send `GET http://127.0.0.1:5000/api/packages/search?q=(`
4. Send `GET http://127.0.0.1:5000/api/packages/search?q=1.5`

**Expected result:** Search text is matched. Step 3 returns HTTP 200 with an empty list. Step 4 returns only `ABC 1.5`

**Actual result:** Step 3 returns HTTP 500 and `{"error":"Server Error: Unable to search packages."}`. Step 4 returns both packages because `.` matches any character. Searching for `.` alone brings up every package

**Status:** Fail

**Severity:** Medium

**V or V:** Verification

**GitHub Issue:** #91

---
