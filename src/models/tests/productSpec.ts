import {product,productStore} from '../product'
import db from '../../database'

const store = new productStore();
//test create product 
describe('Product model database action', () => {
    const testProdcut ={
        product_name:'testProduct',
        price:10
    } as product; 

   beforeAll(async ()=>{
    const createdProduct = await store.createProduct(testProdcut);
    testProdcut.id=createdProduct.id;
   });

   afterAll(async ()=>{
    const conn=await db.connect();
    const sql = 'DELETE FROM product;';
    await conn.query(sql);
    conn.release();
   });

   //test index all products
   it('should return a list of all products', async () => {
    const result = await store.getAllProducts();
    console.log(result);
    expect(result).toBeDefined();
});
   //test show one product 
   it('should show that product', async () => {
   const result = await store.showProduct(testProdcut.id);
   console.log(result);
   expect(result.product_name).toEqual(testProdcut.product_name);
});

});

