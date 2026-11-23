class PickupRecord {
  #signatureData;
  #pickupTime;

  constructor(signatureData, pickupTime) {
    this.#signatureData = signatureData;
    this.#pickupTime = pickupTime;
  }

  // read-only access to the signature captured at pickup
  get signatureData() {
    return this.#signatureData;
  }

  // read-only access to the time the package was picked up
  get pickupTime() {
    return this.#pickupTime;
  }

  // saves the guest's signature and records the pickup time
  // if no pickup time was set yet, the current time is used
  captureSignature(signatureData) {
    this.#signatureData = signatureData;

    if (!this.#pickupTime) {
      this.#pickupTime = new Date().toISOString();
    }
  }
}

module.exports = PickupRecord;
