class PickupRecord {
  #signatureData;
  #pickupTime;
  #status;

  constructor(signatureData, pickupTime, status) {
    this.#signatureData = signatureData;
    this.#pickupTime = pickupTime;
    this.#status = status;
  }

  markAsRetrieved() {
    // TODO: set the status to Retrieved
  }

  captureSignature(signatureData) {
    // TODO: save the signature and record the pickup time
  }
}

module.exports = PickupRecord;