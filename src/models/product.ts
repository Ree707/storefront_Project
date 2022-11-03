import client from '../database'

export type product={
id :number; 
product_name: string; 
price: number; 
}

export class productStore {

//Index 
 async getAllProducts(): Promise<product[]> {
    try {
      const conn= await client.connect();
      const sql ='SELECT * FROM product;';
      const result = await conn.query(sql);
      conn.release();
      return result.rows
    } catch (err) {
      throw new Error(`Cannot get all products`);
    }
  }
    //Show (args: product id)
     async showProduct(id: Number): Promise<product> {
    try {
      const conn= await client.connect();
      const sql ='SELECT * FROM product WHERE id= ($1);';
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Cannot get all products`);
    }
  }
    //Create (args: Product)[token required]
    async createProduct(product:product): Promise<product> {
    try {
      const conn= await client.connect();
      const sql ='INSERT INTO product (product_name,price) VALUES ($1, $2) RETURNING *;';
      const result = await conn.query(sql,[product.product_name,product.price,]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Cannot create product`);
    }
  }

}
    
