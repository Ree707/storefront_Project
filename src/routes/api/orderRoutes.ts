import {Router, Request, Response }from 'express';
import * as handlers from '../../handlers/orderHandler';
import validateToken from '../../middleware/authentication.middleware'

const orderRoute  = Router();

orderRoute.get('/orders',validateToken,handlers.getOrders);;

orderRoute.get('/',  (req: Request, res: Response) =>{
    res.send('order routes');
});

export default orderRoute;