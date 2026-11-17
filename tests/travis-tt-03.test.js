//this imports the ScanResult class from the source folder so the tests can use it
const ScanResult = require("../src/scanResult");

//this test checks that a ScanResult rejects empty scanned text and stays invalid
test("scanResult rejects empty scanned text", () =>
{
    //this creates a new ScanResult object with no data in it yet
    const scanResult = new ScanResult();

    //this parses an empty string to simulate a scan that found no text
    scanResult.parseText("");

    //this checks that the guest first name was left empty
    expect(scanResult.guestFirstName).toBe("");

    //this checks that the guest last name was left empty
    expect(scanResult.guestLastName).toBe("");

    //this checks that the tracking number was left empty
    expect(scanResult.trackingNo).toBe("");

    //this checks that the scan result is marked as invalid
    expect(scanResult.isValid()).toBe(false);
});