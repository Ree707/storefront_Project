//In each handler file, create RESTful endpoints for each model method.
import express, { Request, Response } from 'express'
import {orderStore} from '../models/order';

//export const orderHandler = express.Router();
const Order: orderStore =new orderStore();

//get current order by user
export const getOrders = async (req: Request, res: Response) =>{
     try {
         const userID: number =parseInt(req.body.userID);
         console.log('orders',userID);
         const userOrder= await Order.getActiveOrder(userID);
         res.json(userOrder);
    } catch (err) {
         res.status(400)
        res.json(err)
    }
}
