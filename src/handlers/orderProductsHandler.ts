import express, { Request, Response } from 'express'
import {orderProductsStore} from '../models/orderProducts';

const order_products: orderProductsStore =new orderProductsStore();

export const createOrder = async (req: Request, res: Response) =>{
    try {
        const userOrder= await order_products.createOrder(req.body);
        res.json(userOrder);
   } catch (err) {
        res.status(400)
       res.json(err)
   }
}

export const show = async (req: Request, res: Response) =>{
    try {
        const id: number = parseInt(req.body.id);
        const order= await order_products.showOrder(id);
        if (order===undefined){
           res.json('no order found') 
         }
        res.json(order);
   } catch (err) {
        res.status(400)
       res.json(err)
   }
}