import {Router, Request, Response }from 'express';
import userRoute from './api/userRoutes';
import orderRoute from './api/orderRoutes';
import productRoute from './api/productRoutes';
import orderProductsRoute from './api/orderProductsRoute';


const routes = Router();

routes.use('/users',userRoute);
routes.use('/order',orderRoute);
routes.use('/product',productRoute);
routes.use('/order_products',orderProductsRoute);

routes.get('/',  (req: Request, res: Response) =>{
    res.send('api');
});
export default routes; 