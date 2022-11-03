//In each handler file, create RESTful endpoints for each model method.
import express, { Router,Request, Response,NextFunction } from 'express'
import {userStore} from '../models/user';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const { TOKEN_SECRET } = process.env;
//export const userHandler = express.Router();
const user_store: userStore =new userStore();

//index all users 
export const index = async (req: Request, res: Response) =>{

    console.log('index');
     try {
         const users= await user_store.getAllusers();
         res.json({ status:'success',
         data: {users},
         message:'display all users in database'
         });
    } catch (err) {
         res.status(400)
        res.json(err)
    }
}

//show one user by id 
export const show = async (req: Request, res: Response) =>{
     try {
         const id: number = parseInt(req.body.id);
         const user= await user_store.showUser(id);
         if (user===undefined){
            res.json('no user found') 
          }
         res.json(user);
    } catch (err) {
         res.status(400)
        res.json(err)
    }
}

//create new user
export const create = async (req: Request, res: Response, next: NextFunction) =>{
     try {
         const user = await user_store.createUser(req.body);
        // var token = jwt.sign({user:user}, process.env.TOKEN_SECRET);
         res.json(user);
    } catch (err) {
         res.status(400)
        res.json(err)
    }
}

//token authenticate 
export const authenticate = async (req: Request, res: Response) => {
  const user= {
    id: req.body.id,
    password: req.body.password,
  }
  try {
      const u = await user_store.authenticate(user.id, user.password)
      const token = jwt.sign({ u }, TOKEN_SECRET as unknown as string);

      //if user not authenticated 
      if (!u){
        console.log('an error');
        return res.status(401).json({
            status:'error',
            message:'the id and password do not match'
        });
      }
      //if user is authenticated 
      return res.json({
        status:'success',
        data: {...u,token},
        message: 'user authenticated successfully',
      });

  } catch(error) {
      res.status(401)
      res.json({ error })
  }
}


 
