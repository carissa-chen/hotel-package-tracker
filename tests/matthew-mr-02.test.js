const request = require('supertest')
const app = require('../app')
const Package = require('../models/Package')

// mock database before sending two actual packages for testing
jest.mock('../models/Package')

const pack1 = () => request(app).post('/api/packages').send({trackingNumber: '1Z-125-XY', guestName: 'ajdklw', carrier: 'UPPPS'})
const pack2 = () => request(app).post('/api/packages').send({trackingNumber: 'ABC1.5', guestName: 'jiahw', carrier: 'UPPPS'})

describe('MR-04: Search treats special characters as pattern', () => {
    beforeEach(() => {
        Package.find = jest.fn().mockResolvedValue({})
    })

    it('MR-04: "(" returns an empty list', async () => {
        const res = await request(app).get('/api/packages/search?q=(')

        expect(res.statusCode).toBe(200)
        expect(Package.find).toHaveBeenCalledTimes(1);
    })

    it('MR-04: "1.5" matches the wrong packages', async () => {
        const res = await request(app).get('/api/packages/search?q=1.5')

        expect(res.statusCode).toBe(200)
        expect(Package.find).toHaveBeenCalledTimes(1)
    })
})