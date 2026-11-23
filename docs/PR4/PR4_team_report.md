# PR4 Team Report

**Team:** Group 15
**Members:** Nishanth Mahendran, Travis Trinidad, Matthew Rohrer, David Martindale

Each member edits only their own file (`<firstname>_<lastname>.md`). Team sections are shared.

---

## 1. Bug Triage Table

One row per failing test.

| Test name | Bucket | Issue link | Severity | Priority | Owner | Status |
|---|---|---|---|---|---|---|
| travis-tt-02: PickupRecord stores signature data and pickup time | Missing feature | #83 | Medium | Medium | Travis | Fixed in PR #87 |
| travis-tt-03: scanResult rejects empty scanned text | Missing feature | #84 | Medium | Medium | Travis | Fixed in PR #87 |
| travis-tt-04: Front desk staff can retrieve complete package information | Missing feature | #85 | Medium | Medium | Travis | Fixed in PR #87 |
| DM-03: POST returns 500 instead of 400 when carrier is missing | Code bug | #71 | Medium | Medium | David | Fixed in PR #89 |
| DM-04: Whitespace-only trackingNumber returns 500 instead of 400 | Code bug | #72 | Medium | Medium | David | Fixed in PR #89 |
| DM-07: Duplicate tracking number is accepted and saved twice | Missing feature | #73 | Medium | Medium | David | Open |
| DM-08: POST accepts requests with no staff credentials | Missing feature | #74 | High | Medium | David | Open |
| DM-09: Malformed JSON returns an HTML stack trace | Code bug | #75 | Low | Low | David | Fixed in PR #89 |
| DM-10: No field to tell apart guests with the same name | Missing feature | #76 | Medium | Low | David | Open, chosen as the final feature |
| matthew-mr-03: GET /api/packages/search returns 500 instead of 400 when q is missing | Code bug | #90 | Medium | Medium | Matthew | Fixed in the final PR4 pull request (fix by David) |
| matthew-mr-04: Search treats special characters as a pattern | Code bug | #91 | Medium | Medium | Matthew | Fixed in the final PR4 pull request (fix by David) |
| nish-form-64: Package form shows success even when saving fails | Code bug | #64 | Medium | Medium | Nishanth | Fixed in PR #88 |
| `npm run lint` fails with 59 ESLint errors | Code bug | #65 | Low | Low | Nishanth | Fixed in PR #92 |

**Bucket definitions used:** Code bug = the test is correct and the code is wrong. Test bug = the code is correct and the test is wrong. Missing feature = the original team never built it. The instructor confirmed that building a missing feature counts as a fix for the bug-fix requirement.

---

## 2. Regression Log

No regressions found. The full suite was run on `main` on Nov 22, after the merges listed below.

| Date | PR merged | Full suite result | Regressions |
|---|---|---|---|
| Nov 22 | #87, #88, #89 | `npm test` on `main` at `2e84b28`: 8 files, 13 of 13 tests passed | None |
| Nov 22 | #92, #93, #94, #95 | `npm test` on `main` at `ce1564e`: 8 files, 13 of 13 tests passed | None |

---

## 3. Final Test Run

`npm test` on Nov 22 with all PR4 work applied (the code merged to `main` in the final PR4 pull request): 11 test files, 20 of 20 tests passed.

![Final test run](screenshots/final_test_run.png)

**Still failing:** None.

---

## 4. Feature Decision

- **Feature name:** Room number on package records
- **User story:** As a front desk staff member, I want each package record to include the guest's room number, so that I can hand the package to the right guest when two guests share a name.
- **Why we chose it:** It comes from the missing-feature bucket (DM-10, #76). The system saves a tracking number, guest name, and carrier, and two guests named John Smith cannot be told apart from those three fields. `src/AdditionalPackageInfo.js` already defines a `roomNo` field that nothing uses. The feature is small enough for one sprint and touches every layer, so each member owns a part.
- **Owners:** David: `roomNumber` in the package model and the POST route. Nishanth: room number field in the Log a Package form. Matthew: search by room number. Travis: automated tests for the feature.
- **Test case 1:** `POST /api/packages` with a tracking number, guest name, carrier, and `roomNumber` "412" returns HTTP 201, and the saved record includes `roomNumber` "412".
- **Test case 2:** With one package logged for John Smith in room 412 and one for John Smith in room 718, `GET /api/packages/search?q=718` returns only the package for room 718.
- **Feature Issue:** #76, labeled `feature`

---

## 5. Board Snapshot

![Board](screenshots/board.png)

---

## 6. Sprint Summary

This sprint the team fixed ten issues: missing-carrier and whitespace validation and JSON error responses in the package API (#71, #72, #75), the PickupRecord, scanResult, and PackageInfo methods that were empty stubs (#83, #84, #85), the form that reported success when a save failed (#64), the lint configuration (#65), and two search bugs found late in the sprint, a missing search term and special characters treated as a pattern (#90, #91). The full suite is 11 files and 20 tests, all passing. Still broken: the startup issues #63 and #66. Duplicate tracking numbers (#73) and staff login (#74) are missing features that we did not choose for the final sprint. Two process gaps remain: the search fixes for #90 and #91 were merged without before and after screenshots, and not every pull request had a teammate's approval before it merged. Next sprint, look first at `router.get('/search')` in `routes/packages.js`, because the room number feature adds search by room to the handler that was just changed.
