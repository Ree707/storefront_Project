import {Router, Request, Response }from 'express';
import * as handlers from '../../handlers/orderProductsHandler';
import validateToken from '../../middleware/authentication.middleware'

const orderProductsRoute  = Router();

orderProductsRoute.post('/create',validateToken,handlers.createOrder);;
orderProductsRoute.get('/show',validateToken,handlers.show);

orderProductsRoute.get('/',  (req: Request, res: Response) =>{
    res.send('order_products routes');
});

export default orderProductsRoute;