# Test Cases: [Travis T.]

**Team number:** [15]
**My area:** [from REQUIREMENTS.md]

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

**Test ID:** TT-01
**From Part 6:** new
**Written by:** Travis Trinidad  
**Title:** The PackageInfo creates an object with the required package information fields 
**Traces to:** REQ-TT-01
**Test type:** Unit 
**Preconditions:** The `src/PackageInfo.js` file is available, and the `PackageInfo` class can be imported into a test.
**Test data:**
First name: Jane
Last name: Doe
Tracking number: TRK123456
Delivery date: 2026-11-11
Delivery time: 3:00 PM
Status: Logged

**Steps:**
1. Load the `PackageInfo` class from `src/PackageInfo.js`.
2. Create a new `PackageInfo` object using the test data: Jane Doe, tracking number `TRK123456`, delivery date `2026-11-11`, delivery time `3:00 PM`, and status `Logged`.
3. Check whether the object stores the correct values in `firstName`, `lastName`, `trackingNo`, `deliveryDate`, `deliveryTime`, and `status`.

**Expected result:**
The `PackageInfo` object is created successfully, and its six fields contain the correct values:

- `firstName` is `Jane`
- `lastName` is `Doe`
- `trackingNo` is `TRK123456`
- `deliveryDate` is `2026-11-11`
- `deliveryTime` is `3:00 PM`
- `status` is `Logged`
**Actual result:** The `PackageInfo` object was created successfully and all six fields stored the expected values.
**Status:** Pass
**Severity:** N/A
**V or V:** N/A
**GitHub Issue:** N/A

---

**Test ID:** TT-02
**From Part 6:** New
**Written by:** Travis Trinidad
**Title:** PickupRecord creates a pickup record with signature data and pickup time
**Traces to:** REQ-TT-02
**Test type:** Unit
**Preconditions:** The `src/PickupRecord.js` file is available, and the `PickupRecord` class can be imported into a test.
**Test data:**
- Signature data: Jane Doe signature
- Pickup time: 2026-11-11 3:00 PM

**Steps:**
1. Load the `PickupRecord` class from `src/PickupRecord.js`.
2. Create a new `PickupRecord` object using the signature data and pickup time.
3. Call `captureSignature("Jane Doe signature")`.
4. Check whether the pickup record stores the signature data and pickup time.

**Expected result:** The `PickupRecord` object is created successfully, and it stores the signature data `Jane Doe signature` and the pickup time `2026-11-11 3:00 PM`. The `captureSignature()` method updates the record with the provided signature data and pickup time.

**Actual result:**
**Status:**
**Severity:**
**V or V:**
**GitHub Issue:**

---

**Test ID:**
**From Part 6:** (old test number, or New)
**Written by:**
**Title:**
**Traces to:**
**Test type:**
**Preconditions:**
**Test data:**

**Steps:**
1.
2.
3.

**Expected result:**
**Actual result:**
**Status:**
**Severity:**
**V or V:**
**GitHub Issue:**

---

**Test ID:**
**From Part 6:** (old test number, or New)
**Written by:**
**Title:**
**Traces to:**
**Test type:**
**Preconditions:**
**Test data:**

**Steps:**
1.
2.
3.

**Expected result:**
**Actual result:**
**Status:**
**Severity:**
**V or V:**
**GitHub Issue:**

---
