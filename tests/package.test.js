const request = require('supertest');
const app = require('../app');
const Package = require('../models/Package');

// Mock the Mongoose Package model to avoid live DB connections
jest.mock('../models/Package');

describe('REQ-1: Log Packages Endpoint', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should create and save a new package record when given valid input', async () => {
    const payload = {
      trackingNumber: 'TRK987654321',
      recipientName: 'Jane Doe',
      carrier: 'FedEx'
    };

    // Mock Package constructor and save method behavior
    Package.prototype.save = jest.fn().mockResolvedValue({
      _id: '6512a3b4c5d6e7f8a9b0c1d2',
      ...payload,
      status: 'Logged',
      createdAt: new Date().toISOString()
    });

    const res = await request(app)
      .post('/api/packages')
      .send(payload);

    expect(res.statusCode).toBe(201);
    expect(res.body.trackingNumber).toBe('TRK987654321');
  });

  it('should return HTTP 400 if required fields are missing', async () => {
    const res = await request(app)
      .post('/api/packages')
      .send({ recipientName: 'Jane Doe' });

    expect(res.statusCode).toBe(400);
  });
});
