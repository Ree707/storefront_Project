//Create a test suite that covers each endpoint with Jasmine.
import supertest from "supertest";
import app from '../../server';

const request = supertest(app);

describe('test user endpoint api', ()=> {
    it('get the endpoint to show all users', async ()=>{
        const response = await request.get('/api/users/all');
        expect(response.status).toBe(200);
    })
    it('get the endpoint to create users', async ()=>{
        const response = await request.post('/api/users/create');
        expect(response.status).toBe(200);
    })
    it('get the endpoint to show one user', async ()=>{
        const response = await request.get('/api/users/user');
        expect(response.status).toBe(200);
    })
   
})

