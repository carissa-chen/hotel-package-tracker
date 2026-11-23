// ---------------------------------------------------------------
// MR-04 (Issue #91): search terms that contain special characters
// Expected: the term is matched as plain text, never as a pattern
// ---------------------------------------------------------------
const request = require('supertest');
const app = require('../app');
const Package = require('../models/Package');

// Mock the model so the test needs no database
jest.mock('../models/Package');

// Returns the pattern the route passed to the database for a search term
const patternFor = async (term) => {
  const res = await request(app).get('/api/packages/search').query({ q: term });
  const filter = Package.find.mock.calls[0][0];
  return { status: res.statusCode, pattern: filter.$or[0].trackingNumber.$regex };
};

describe('MR-04: special characters in the search term', () => {
  beforeEach(() => {
    Package.find = jest.fn().mockResolvedValue([]);
  });

  it('MR-04a: escapes "." so 1.5 does not match 125', async () => {
    const { status, pattern } = await patternFor('1.5');

    expect(status).toBe(200);
    expect(pattern).toBe('1\\.5');
  });

  it('MR-04b: escapes "(" so the search does not fail', async () => {
    const { status, pattern } = await patternFor('(');

    expect(status).toBe(200);
    expect(pattern).toBe('\\(');
  });

  it('MR-04c: leaves a plain term unchanged', async () => {
    const { status, pattern } = await patternFor('Jane');

    expect(status).toBe(200);
    expect(pattern).toBe('Jane');
  });
});
