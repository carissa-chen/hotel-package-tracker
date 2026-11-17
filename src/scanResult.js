class scanResult {
  constructor() {
    this.guestFirstName = '';
    this.guestLastName = '';
    this.trackingNo = '';
  }

  parseText(rawText) {
    if (!rawText) {
      return;
    }

    const values = rawText.split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
    if (values.length >= 3) {
      [this.guestFirstName, this.guestLastName, this.trackingNo] = values;
    }
  }

  isValid() {
    return Boolean(
      this.guestFirstName &&
      this.guestLastName &&
      this.trackingNo
    );
  }
}

module.exports = scanResult;