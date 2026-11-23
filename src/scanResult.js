class scanResult {
  constructor() {
    this.guestFirstName = '';
    this.guestLastName = '';
    this.trackingNo = '';
  }

  // Parses text read from a shipping label.
  // Expected format: the guest's name on the first non-empty line
  // ("First Last") and the tracking number on the next non-empty line.
  // Empty or non-string input leaves every field empty.
  parseText(rawText) {
    this.guestFirstName = '';
    this.guestLastName = '';
    this.trackingNo = '';

    if (typeof rawText !== 'string' || rawText.trim() === '') {
      return;
    }

    const lines = rawText
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter((line) => line !== '');

    const nameParts = (lines[0] || '').split(/\s+/);
    this.guestFirstName = nameParts[0] || '';
    this.guestLastName = nameParts.slice(1).join(' ');
    this.trackingNo = lines[1] || '';
  }

  // A scan is valid only when first name, last name, and tracking number are all present.
  isValid() {
    return this.guestFirstName !== '' &&
      this.guestLastName !== '' &&
      this.trackingNo !== '';
  }
}

module.exports = scanResult;
