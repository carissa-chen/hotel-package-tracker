//this imports the PickupRecord class from the source folder so the tests can use it
const PickupRecord = require("../src/PickupRecord");

//this test checks that a PickupRecord stores the signature data and the pickup time
test("PickupRecord stores signature data and pickup time", () =>
{
    //this creates a PickupRecord object with a sample signature and pickup time
    const pickupRecord = new PickupRecord(
        "Jane Doe signature",
        "2026-11-11 3:00 PM"
    );

    //this captures the signature on the record using the captureSignature method
    pickupRecord.captureSignature("Jane Doe signature");

    //this checks that the signature data was stored correctly
    expect(pickupRecord.signatureData).toBe("Jane Doe signature");

    //this checks that the pickup time was stored correctly
    expect(pickupRecord.pickupTime).toBe("2026-11-11 3:00 PM");
});