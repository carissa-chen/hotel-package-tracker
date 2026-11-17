class PickupRecord {
  constructor(signatureData, pickupTime) {
    this.signatureData = signatureData;
    this.pickupTime = pickupTime;
  }

  captureSignature(signatureData) {
    this.signatureData = signatureData;
  }
}

module.exports = PickupRecord;