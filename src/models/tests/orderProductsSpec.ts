import {order_products,orderProductsStore} from '../orderProducts'
import {order,orderStore} from '../order'
import {user,userStore} from '../user'
import {product,productStore} from '../product'
import db from '../../database'

const store = new orderProductsStore();
const oStore = new orderStore();
const uStore = new userStore;
const pStore = new productStore;

//test create user 
describe('orderProducts model database action', () => {
    const testUser ={
        firstName: 'usertest',
        lastName: 'test',
        user_password: 'test123'
    } as user; 

    const testProdcut ={
        product_name:'testProduct',
        price:10
    } as product; 
    const testOrder ={
        product_id:testProdcut.id,
        user_id:testUser.id,
        quantity:1,
        order_status: 'active'
    } as order;
    const testOrderProduct ={
        product_id: testProdcut.id,
        order_id: testOrder.id,
        quantity: 1
    } as order_products

   beforeAll(async ()=>{
    const createdUser = await uStore.createUser(testUser);
    testUser.id=createdUser.id;
    const createdProduct = await pStore.createProduct(testProdcut);
    testProdcut.id=createdProduct.id;
    const conn=await db.connect();
    const sql = 'INSERT INTO orders (product_id, userid,quantity,order_status) VALUES ($1,$2,$3,$4) RETURNING *;';
    const createdOrder= await conn.query(sql,[testProdcut.id,testUser.id,1,'active',]);
    conn.release();    
    testOrder.id = createdOrder.rows[0].id;
    //create order for that user 
    testOrder.product_id=testProdcut.id;
    testOrder.user_id=testUser.id;
    testOrderProduct.order_id=testOrder.id;
    testOrderProduct.product_id=testProdcut.id;
    const orderProductsStore = await store.createOrder(testOrderProduct);
    testOrderProduct.id=orderProductsStore.id;
   });

   afterAll(async ()=>{
    const conn=await db.connect();
    const sql = 'DELETE FROM orders; DELETE FROM users; DELETE FROM PRODUCT;DELETE FROM order_products;';
    await conn.query(sql);
    conn.release();
   });

   it('should show order_product that just created', async () => {
    const result = await store.showOrder(testOrderProduct.id);
    expect(result.product_id).toEqual(testProdcut.id);
});
});