// ---------------------------------------------------------------
// DM-09 (Issue #75): POST /api/packages with malformed JSON
// Expected: HTTP 400 as JSON with an error field, no stack trace
// ---------------------------------------------------------------
const request = require('supertest');
const app = require('../app');

// Mock the model so the test needs no database
jest.mock('../models/Package');

describe('DM-09: malformed JSON body', () => {
  it('DM-09: returns a JSON error with no stack trace', async () => {
    const res = await request(app)
      .post('/api/packages')
      .set('Content-Type', 'application/json')
      .send('{"trackingNumber": "TRK-DM-09",');

    expect(res.statusCode).toBe(400);
    expect(res.headers['content-type']).toMatch(/application\/json/);
    expect(res.body.error).toBeDefined();
    expect(res.text).not.toMatch(/node_modules/);
    expect(res.text).not.toMatch(/\bat .+\(/);
  });
});
