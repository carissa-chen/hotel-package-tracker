const request = require('supertest');
const app = require('../app'); // Imports your Express app instance

describe('REQ-1: Log Packages Endpoint', () => {
  
  it('should create and save a new package record when given valid input', async () => {
    const payload = {
      trackingNumber: 'TRK987654321',
      recipientName: 'Jane Doe',
      carrier: 'UPS'
    };

    const response = await request(app)
      .post('/api/packages')
      .send(payload);

    // 1. Check HTTP Status
    expect(response.statusCode).toBe(201);

    // 2. Verify returned record matches expected data
    expect(response.body).toHaveProperty('_id');
    expect(response.body.trackingNumber).toBe('TRK987654321');
    expect(response.body.recipientName).toBe('Jane Doe');
    expect(response.body.carrier).toBe('UPS');
    expect(response.body.status).toBe('Logged');
  });

  it('should return HTTP 400 if required fields are missing', async () => {
    const invalidPayload = {
      trackingNumber: 'TRK987654321'
      // Missing recipientName and carrier
    };

    const response = await request(app)
      .post('/api/packages')
      .send(invalidPayload);

    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty('error');
  });

});
