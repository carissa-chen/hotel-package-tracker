# Test Cases: Nish M

Team number: Group15

My area: Frontend / UI

Written by: Nish Mahendran

---

## Test Case 1

Test ID: NM-01

From Part 6: TC-2

Title: The package form prevents submission when the tracking number is missing

Traces to: NFR-NM-01

Test type: Negative

Preconditions:
- The backend and frontend are running.
- The browser is open to the package form.
- The local package database is empty.

Test data:
- First name: Jane
- Last name: Doe
- Tracking number: Leave blank
- Carrier: FedEx

Steps:
1. Enter Jane in the first name field.
2. Enter Doe in the last name field.
3. Leave the tracking number field blank.
4. Enter FedEx in the carrier field.
5. Click Submit.
6. Check whether a package record was saved.

Expected result:
The browser should stop the form from submitting because the tracking number is required. No success message should appear, no request should be sent to the server, and no package record should be saved.

Actual result:
I entered Jane, Doe, left the tracking number blank, and entered FedEx. When I clicked Submit, the browser displayed a required-field message for the tracking number. The form did not submit, no success message appeared, and no package was saved.

Status:
Pass

Severity:
N/A

V or V:
N/A

GitHub Issue:
N/A

---

## Test Case 2

Test ID: NM-02

From Part 6: New

Title: A front desk employee can successfully log a package

Traces to: G-NM-01

Test type: Acceptance

Preconditions:
- The backend and frontend are running.
- The browser is open to the package form.
- The local package database is empty.

Test data:
- First name: Jane
- Last name: Doe
- Tracking number: TRK-NM-002
- Carrier: FedEx

Steps:
1. Enter Jane in the first name field.
2. Enter Doe in the last name field.
3. Enter TRK-NM-002 in the tracking number field.
4. Enter FedEx in the carrier field.
5. Click Submit.
6. Check the message shown by the form.
7. Count the saved package records in the database.

Expected result:
The frontend should send the package information to the server. The server should return HTTP 201, the form should display “Package logged successfully!”, and one package record should be saved with the guest name Jane Doe, tracking number TRK-NM-002, and carrier FedEx.

Actual result:
Predicted result based on the current code: the server should return HTTP 201 with the saved package record, including Jane Doe, TRK-NM-002, FedEx, an ID, status, and timestamp. The form should display “Package logged successfully!” and the database should contain one record. This test could not be confirmed because MongoDB was not running locally.

Status:
Pass (predicted, not run)

Severity:
N/A

V or V:
N/A

GitHub Issue:
N/A

---

## Test Case 3

Test ID: NM-03

From Part 6: New

Title: The form should show an error when the server cannot save the package

Traces to: REQ-NM-03

Test type: Negative

Preconditions:
- The backend and frontend are running.
- The browser is open to the package form.
- The local package database is empty.

Test data:
- First name: Jane
- Last name: Doe
- Tracking number: Three spaces
- Carrier: FedEx

Steps:
1. Enter Jane in the first name field.
2. Enter Doe in the last name field.
3. Enter three spaces in the tracking number field.
4. Enter FedEx in the carrier field.
5. Click Submit.
6. Check the message shown by the form.
7. Count the saved package records in the database.

Expected result:
The frontend should recognize that the package was not saved and should display an error message. It should not display “Package logged successfully!”, and no package record should be saved.

Actual result:
Predicted result based on the current code: the server should return HTTP 500 with a JSON error because the tracking number contains only spaces. However, the frontend will still display “Package logged successfully!” because it does not check whether the response was successful. No package should be saved.

Status:
Fail

Severity:
Major

V or V:
Verification

GitHub Issue:
#64

---

## Test Case 4

Test ID: NM-04

From Part 6: New

Written by: Nish Mahendran

Title: The form shows a connection error when the backend is unavailable

Traces to: REQ-NM-03

Test type: System

Preconditions:
- The frontend is running.
- The backend server is stopped.
- The browser is open to the package form.

Test data:
- First name: Alex
- Last name: Smith
- Tracking number: TRK-NM-004
- Carrier: UPS

Steps:
1. Enter Alex in the first name field.
2. Enter Smith in the last name field.
3. Enter TRK-NM-004 in the tracking number field.
4. Enter UPS in the carrier field.
5. Make sure the backend server is stopped.
6. Click Submit.
7. Check the message shown by the form.

Expected result:
The form should display “Could not connect to the server.” It should not display “Package logged successfully!”

Actual result:
When the backend was unavailable, the form displayed “Could not connect to the server.” The success message did not appear.

Status:
Pass

Severity:
N/A

V or V:
N/A

GitHub Issue:
N/A