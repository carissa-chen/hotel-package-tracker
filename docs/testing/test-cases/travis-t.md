# Test Cases: [Travis T.]

**Team number:** [15]
**My area:** Data Models & Stubs

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
**Preconditions:** The "src/PackageInfo.js" file is available, and the "PackageInfo" class can be imported into a test.
**Test data:**
First name: Jane
Last name: Doe
Tracking number: TRK123456
Delivery date: 2026-11-11
Delivery time: 3:00 PM
Status: Logged

**Steps:**
1. Load the "PackageInfo" class from "src/PackageInfo.js".
2. Create a new "PackageInfo" object using the test data: Jane Doe, tracking number "TRK123456", delivery date "2026-11-11", delivery time "3:00 PM", and status "Logged".
3. Check whether the object stores the correct values in "firstName", "lastName", "trackingNo", "deliveryDate", "deliveryTime", and "status".

**Expected result:**
The "PackageInfo" object is created successfully, and its six fields contain the correct values:

- "firstName" is "Jane"
- "lastName" is "Doe"
- "trackingNo" is "TRK123456"
- "deliveryDate" is "2026-11-11"
- "deliveryTime" is "3:00 PM"
- "status" is "Logged"
**Actual result:** The "PackageInfo" object was created successfully and all six fields stored the expected values.
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
**Preconditions:** The "src/PickupRecord.js" file is available, and the "PickupRecord" class can be imported into a test.
**Test data:**
- Signature data: Jane Doe signature
- Pickup time: 2026-11-11 3:00 PM

**Steps:**
1. Load the "PickupRecord" class from "src/PickupRecord.js".
2. Create a new "PickupRecord" object using the signature data and pickup time.
3. Call "captureSignature("Jane Doe signature")".
4. Check whether the pickup record stores the signature data and pickup time.

**Expected result:** The "PickupRecord" object is created successfully, and it stores the signature data "Jane Doe signature" and the pickup time "2026-11-11 3:00 PM". The "captureSignature()" method updates the record with the provided signature data and pickup time.

**Actual result:** The test failed because "pickupRecord.signatureData" returned "undefined" instead of "Jane Doe signature". The test stopped at this assertion, so the pickup time could not be verified. The "captureSignature()" method is unfinished, and the signature data is stored in a private field that cannot be accessed by the test.
**Status:** Fail
**Severity:** Major
**V or V:** Verification
**GitHub Issue:** #83

---

**Test ID:** TT-03
**From Part 6:** New
**Written by:** Travis Trinidad
**Title:** scanResult rejects an empty scanned text value
**Traces to:** REQ-TT-03
**Test type:** Boundary Value
**Preconditions:** The "src/scanResult.js" file is available, and the "scanResult" class can be imported into a test.
**Test data:**
- Raw scanned text: """" (empty text)

**Steps:**
1. Load the "scanResult" class from "src/scanResult.js".
2. Create a new "scanResult" object.
3. Pass an empty string into "parseText("")".
4. Call "isValid()" to check whether the scan result is valid.

**Expected result:** The "scanResult" object should reject the empty scanned text. The first name, last name, and tracking number should remain empty, and "isValid()" should return "false".

**Actual result:** The scan result fields remained empty after passing an empty string to "parseText("")". However, "isValid()" returned "undefined" instead of "false".

**Status:** Fail
**Severity:** Major
**V or V:** Verification
**GitHub Issue:** #84

---

**Test ID:** TT-04
**From Part 6:** New
**Written by:** Travis Trinidad
**Title:** Front desk staff can retrieve complete package information
**Traces to:** G-TT-01; NFR-TT-01
**Test type:** Acceptance
**Preconditions:** The "src/PackageInfo.js" file is available, and the "PackageInfo" class can be imported into a test.
**Test data:**
- First name: Jane
- Last name: Doe
- Tracking number: TRK123456
- Delivery date: 2026-11-11
- Delivery time: 3:00 PM
- Status: Logged

**Steps:**
1. Create a "PackageInfo" object using the package information provided by the front desk staff member.
2. Request the complete package information by calling "getDetails()".
3. Check whether the returned information includes the correct guest name, tracking number, delivery date, delivery time, and status.

**Expected result:** The system returns the complete package information accurately, including Jane Doe’s name, tracking number "TRK123456", delivery date "2026-11-11", delivery time "3:00 PM", and status "Logged".

**Actual result:** The `PackageInfo` object was created, but `getDetails()` returned `undefined` instead of returning the package’s complete information.

**Status:** Fail
**Severity:** Major
**V or V:** Validation
**GitHub Issue:** #85

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
