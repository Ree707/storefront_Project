import {order,orderStore} from '../order'
import {user,userStore} from '../user'
import {product,productStore} from '../product'
import db from '../../database'

const store = new orderStore();
const uStore = new userStore;
const pStore = new productStore;

describe('order model database action', () => {
    //create user and product then create active order for that user 
    const testUser ={
        firstName: 'usertest',
        lastName: 'test',
        user_password: 'test123'
    } as user; 

    const testProdcut ={
        product_name:'testProduct',
        price:10
    } as product; 

   beforeAll(async ()=>{
    const createdUser = await uStore.createUser(testUser);
    testUser.id=createdUser.id;
    const createdProduct = await pStore.createProduct(testProdcut);
    testProdcut.id=createdProduct.id;
    //create order for that user 
    const conn=await db.connect();
    const sql = 'INSERT INTO orders (product_id, userid,quantity,order_status) VALUES ($1,$2,$3,$4) RETURNING *;';
    await conn.query(sql,[testProdcut.id,testUser.id,1,'active',]);
    conn.release();
   });

   afterAll(async ()=>{
    const conn=await db.connect();
    const sql = 'DELETE FROM orders; DELETE FROM users; DELETE FROM PRODUCT';
    await conn.query(sql);
    conn.release();
   });

    //test get active order for user 
   it('should return a list of all active order to that user', async () => {
    const result = await store.getActiveOrder(testUser.id);
    console.log(result[0].order_status)
    expect(result[0].order_status).toEqual('active');
});
});