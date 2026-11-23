// ---------------------------------------------------------------
// MR-03 (Issue #90): GET /api/packages/search with no q parameter
// Expected: HTTP 400, a JSON error message, no database search
// ---------------------------------------------------------------
const request = require('supertest');
const app = require('../app');
const Package = require('../models/Package');

// Mock the model so the test needs no database
jest.mock('../models/Package');

describe('MR-03: search with no q parameter', () => {
  beforeEach(() => {
    Package.find = jest.fn().mockResolvedValue([]);
  });

  it('MR-03: returns 400 and does not search when q is missing', async () => {
    const res = await request(app).get('/api/packages/search');

    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBeDefined();
    expect(Package.find).not.toHaveBeenCalled();
  });

  it('MR-03: still returns 200 for a normal search', async () => {
    const res = await request(app).get('/api/packages/search?q=Jane');

    expect(res.statusCode).toBe(200);
    expect(Package.find).toHaveBeenCalledTimes(1);
  });
});
