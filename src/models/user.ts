import client from '../database'
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();
const { PEPPER, SALT_ROUNDS } = process.env;
//user type 
export type user={
id :number; 
firstName: string; 
lastName: string; 
user_password: string;}
export class userStore {

    //Index [token required]
     async getAllusers(): Promise<string> {
      
    try {
      const conn= await client.connect();
      const sql ='SELECT * FROM users;';
      const result = await conn.query(sql);
      conn.release();
      //return 'user';
      return result.rows
    } catch (err) {
      throw new Error(`Cannot get all users`);
    }
  }
    //Show [token required]
     async showUser(id: number): Promise<user> {
    try {
      const conn= await client.connect();
      const sql ='SELECT * FROM users WHERE id= $1;';
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Cannot get the user`);
    }
  }
    //Create N[token required]
    async createUser(user:user): Promise<user> {
    try {
      const conn= await client.connect();
      const sql ='INSERT INTO users (firstName,lastName,user_password) VALUES ($1, $2, $3) RETURNING *;'
      //hash the password 
      const hash = bcrypt.hashSync(user.user_password + PEPPER,parseInt(SALT_ROUNDS as unknown as string) );
      const result = await conn.query(sql,[user.firstName,user.lastName,hash]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Cannot create user`);
    }
  }
    
    //user password authenticate 
    async authenticate(id: number, password: string): Promise<user| null>{
      try {
        const conn= await client.connect();
        const sql='SELECT user_password FROM users WHERE id=$1;'
        const result= await conn.query(sql,[id]);
        
        if (result.rows.length){
            const {user_password:userPass}=result.rows[0];
            if (bcrypt.compareSync(password+PEPPER,userPass)){
                const userInfo = await conn.query('SELECT * FROM users WHERE id=$1;',[id]);
                return userInfo.rows[0];
            }
        }
        console.log('not found');
        conn.release;
        //user not found 
        return null;
      } catch (err) {
        throw new Error(`Cannot authenticate user`);
      } 
        
    }
}
