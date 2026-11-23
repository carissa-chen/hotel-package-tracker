const request = require('supertest')
const app = require('../app')
const Package = require('../models/Package')

// Search request has no query so no database needed, mock with jest
jest.mock('../models/Package')

describe('MR-03: GET api/packages/search with no query returns 500 instead of 400', () => {
    beforeEach(() => {
        Package.find = jest.fn().mockResolvedValue({})
    })

    it('MR-03: return 400 when q is missing', async () => {
        const res = await request(app).get('/api/packages/search')

        expect(res.statusCode).toBe(400)
        expect(res.body.error).toBeDefined()
        expect(Package.find).not.toHaveBeenCalled()
    })

    it('MR-03: still returns 400 for normal search', async () => {
        const res = await request(app).get('/api/packages/search?q=jane')

        expect(res.statusCode).toBe(200)
        expect(Package.find).toHaveBeenCalledTimes(1)
    })
})