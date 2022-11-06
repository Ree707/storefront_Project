import supertest from "supertest";
import app from '../../server';

const request = supertest(app);
describe('test user endpoint api', ()=> {

    it('get the endpoint to create order', async ()=>{
        const response = await request.post('/api/order_products/create');
        expect(response.status).toBe(200);
    })
    it('get the endpoint to show one order details', async ()=>{
        const response = await request.get('/api/order_products/show');
        expect(response.status).toBe(200);
    })
   
})

