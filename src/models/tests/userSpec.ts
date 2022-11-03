import {user,userStore} from '../user'
import db from '../../database'

const store = new userStore();

//test authenticate 
describe('authentication model', () => {
    it ('should have authentication method for users', async ()=>{
        expect(store.authenticate).toBeDefined();
    });
});

//test create user 
describe('User model database action', () => {
    const testUser ={
        firstName: 'usertest',
        lastName: 'test',
        user_password: 'test123'
    } as user; 

   beforeAll(async ()=>{
    const createdUser = await store.createUser(testUser);
    testUser.id=createdUser.id;
   });

   afterAll(async ()=>{
    const conn=await db.connect();
    const sql = 'DELETE FROM users;';
    await conn.query(sql);
    conn.release();
   });

   //test index all users
   it('should return a list of all users', async () => {
    const result = await store.getAllusers();
    console.log(result);
    expect(result).toBeDefined();
});
   //test show one user 
   it('should show that user', async () => {
   const result = await store.showUser(testUser.id);
   console.log(result);
   expect(result.id).toEqual(testUser.id);
});

});

