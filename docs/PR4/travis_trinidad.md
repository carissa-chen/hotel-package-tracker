# Travis Trinidad

**Team:** Group 15
**Branch:** `travis`

---

## Bug fix 1: Issue #84, scanResult rejects empty scanned text

- **Issue:** [#84](https://github.com/carissa-chen/hotel-package-tracker/issues/84) (TT-03)
- **PR:** [#87](https://github.com/carissa-chen/hotel-package-tracker/pull/87)
- **Test:** `tests/travis-tt-03.test.js`
- **Before:** ![before](screenshots/travis_trinidad_issue84_before.png)
- **After:** ![after](screenshots/travis_trinidad_issue84_after.png)
- **Bucket:** Missing feature. The `parseText` and `isValid` methods are empty `// TODO` bodies, and the README lists this as planned, not built. The instructor confirmed that building a missing feature counts as a fix.

---

## Bug fix 2: Issue #85, PackageInfo returns complete package information

- **Issue:** [#85](https://github.com/carissa-chen/hotel-package-tracker/issues/85) (TT-04)
- **PR:** [#87](https://github.com/carissa-chen/hotel-package-tracker/pull/87)
- **Test:** `tests/travis-tt-04.test.js`
- **Before:** ![before](screenshots/travis_trinidad_issue85_before.png)
- **After:** ![after](screenshots/travis_trinidad_issue85_after.png)
- **Bucket:** Missing feature. `getDetails()` is an empty `// TODO` body, and the README lists this as planned, not built. The instructor confirmed that building a missing feature counts as a fix.

---

## Bug fix 3 (optional): Issue #83, PickupRecord stores signature data and pickup time

The assignment requires two fixes per student. This third fix was optional, and I chose to complete it so every one of my tests passes.

- **Issue:** [#83](https://github.com/carissa-chen/hotel-package-tracker/issues/83) (TT-02)
- **PR:** [#87](https://github.com/carissa-chen/hotel-package-tracker/pull/87)
- **Test:** `tests/travis-tt-02.test.js`
- **Before:** ![before](screenshots/travis_trinidad_issue83_before.png)
- **After:** ![after](screenshots/travis_trinidad_issue83_after.png)
- **Bucket:** Missing feature. `captureSignature` is an empty `// TODO` body, and the signature and pickup time are private fields with no way to read them back. The instructor confirmed that building a missing feature counts as a fix.

---

## AI disclosure

TODO: 

- claude helped me understand what my issues we're and how they relate with other issues
- when fixing the issues, claude guided me towards the direction in which while fixing the issues it wouldn't
negativly impact other issues.
- helped format both travis_trinidad.md file and the main PR4 file.     
