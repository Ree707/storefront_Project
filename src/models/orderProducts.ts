import client from '../database'


export type order_products={
id :number; 
product_id: number;
order_id: number; 
quantity: number; 
}

export class orderProductsStore {
    //Show [token required]
    async showOrder(id: number): Promise<order_products> {
        try {
          const conn= await client.connect();
          const sql ='SELECT * FROM order_products WHERE id= $1;';
          const result = await conn.query(sql, [id]);
          conn.release();
          return result.rows[0];
        } catch (err) {
          throw new Error(`Cannot get the order details`);
        }
      }
        //Create N[token required]
        async createOrder(order_products:order_products): Promise<order_products> {
        try {
          const conn= await client.connect();
          const sql ='INSERT INTO order_products (product_id,order_id,quantity) VALUES ($1, $2, $3) RETURNING *;'
          //hash the password 
          const result = await conn.query(sql,[order_products.product_id,order_products.order_id,order_products.quantity]);
          conn.release();
          return result.rows[0];
        } catch (err) {
          throw new Error(`Cannot create order`);
        }
      }
}