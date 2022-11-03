//Create a test suite that covers each endpoint with Jasmine.
import supertest from "supertest";
import app from '../../server';

const request = supertest(app);

describe('test order endpoint api', ()=> {
    it('get the endpoint to show active order for user', async ()=>{
        const response = await request.get('/api/order/orders');
        expect(response.status).toBe(200);
    })
})
