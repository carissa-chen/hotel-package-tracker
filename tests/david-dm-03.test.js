// ---------------------------------------------------------------
// DM-03 (Issue #71): POST /api/packages with no carrier
// Expected: HTTP 400, a JSON error message, nothing saved
// ---------------------------------------------------------------
const request = require('supertest');
const app = require('../app');
const Package = require('../models/Package');

// Mock the model so the test needs no database
jest.mock('../models/Package');

describe('DM-03: missing carrier', () => {
  beforeEach(() => {
    Package.prototype.save = jest.fn().mockResolvedValue({ _id: 'mock-id', status: 'Logged' });
  });

  it('DM-03: returns 400 and saves nothing when carrier is missing', async () => {
    const res = await request(app)
      .post('/api/packages')
      .send({ trackingNumber: 'TRK-DM-03', guestName: 'Jane Doe' });

    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBeDefined();
    expect(Package.prototype.save).not.toHaveBeenCalled();
  });
});
