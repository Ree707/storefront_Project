import client from '../database'


export type order={
id :number; 
product_id: number; 
quantity: number; 
user_id: number; 
order_status: string; 
}

export class orderStore {

//get current Order by user (args: user id)[token required]
 async getActiveOrder(user_id: number): Promise<order> {
    try {
      const conn= await client.connect();
      const sql ="SELECT * FROM orders WHERE userid = $1 AND order_status = 'active';";
      const result = await conn.query(sql, [user_id]);
      conn.release();
      return result.rows
    } catch (err) {
      throw new Error(`Cannot get current orders`);
    }
  }
}