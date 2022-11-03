//Create a test suite that covers each endpoint with Jasmine.
import supertest from "supertest";
import app from '../../server';

const request = supertest(app);

describe('test product endpoint api', ()=> {
    it('get the endpoint to show all product', async ()=>{
        const response = await request.get('/api/product/all');
        expect(response.status).toBe(200);
    });
    it('get the endpoint to create product', async ()=>{
        const response = await request.post('/api/product/create');
        expect(response.status).toBe(200);
    });
    it('get the endpoint to show one product', async ()=>{
        const response = await request.get('/api/product/product');
        expect(response.status).toBe(200);
    });
   
});