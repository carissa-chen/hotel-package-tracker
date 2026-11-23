// ---------------------------------------------------------------
// DM-04 (Issue #72): trackingNumber at the minimum-length edge
// Boundary values: empty, whitespace only, one character
// Expected: blank values return 400; one character is accepted
// ---------------------------------------------------------------
const request = require('supertest');
const app = require('../app');
const Package = require('../models/Package');

// Mock the model so the test needs no database
jest.mock('../models/Package');

const post = (trackingNumber) =>
  request(app)
    .post('/api/packages')
    .send({ trackingNumber, guestName: 'Jane Doe', carrier: 'FedEx' });

describe('DM-04: trackingNumber boundary values', () => {
  beforeEach(() => {
    Package.prototype.save = jest.fn().mockResolvedValue({ _id: 'mock-id', status: 'Logged' });
  });

  it('DM-04a: returns 400 for an empty trackingNumber', async () => {
    const res = await post('');

    expect(res.statusCode).toBe(400);
    expect(Package.prototype.save).not.toHaveBeenCalled();
  });

  it('DM-04b: returns 400 for a whitespace-only trackingNumber', async () => {
    const res = await post('   ');

    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBeDefined();
    expect(Package.prototype.save).not.toHaveBeenCalled();
  });

  it('DM-04c: accepts a one-character trackingNumber', async () => {
    const res = await post('A');

    expect(res.statusCode).toBe(201);
    expect(Package.prototype.save).toHaveBeenCalledTimes(1);
  });
});
