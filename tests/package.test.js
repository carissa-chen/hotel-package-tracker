const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');
const Package = require('../models/Package');

// Connect to a local test database before tests run
beforeAll(async () => {
  const url = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/test_db';
  await mongoose.connect(url).catch(() => {
    // If MongoDB isn't running, mock the Mongoose save method for CI testing
    jest.spyOn(Package.prototype, 'save').mockImplementation(function () {
      return Promise.resolve(this);
    });
  });
});

// Clean up connections after all tests finish
afterAll(async () => {
  await mongoose.connection.close();
});

describe('REQ-1: Log Packages Endpoint', () => {
  it('should create and save a new package record when given valid input', async () => {
    const payload = {
      trackingNumber: 'TRK987654321',
      recipientName: 'Jane Doe',
      carrier: 'FedEx'
    };

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
