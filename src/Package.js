class Package {
  #packageId;
  #recipientName;
  #roomNumber;
  #status;

  constructor(packageId, recipientName, roomNumber, status) {
    this.#packageId = packageId;
    this.#recipientName = recipientName;
    this.#roomNumber = roomNumber;
    this.#status = status;
  }

  getDetails() {
    return `ID: ${this.#packageId}, Recipient: ${this.#recipientName}, Room: ${this.#roomNumber}, Status: ${this.#status}`;
  }
}

module.exports = Package;
