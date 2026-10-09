class PickupRecord {
  #signatureData;
  #pickupTime;

  constructor(signatureData, pickupTime) {
    this.#signatureData = signatureData;
    this.#pickupTime = pickupTime;
  }

  captureSignature(signatureData) {
    // TODO: save the signature and record the pickup time
  }
}

module.exports = PickupRecord;