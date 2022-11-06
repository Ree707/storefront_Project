import {Router, Request, Response }from 'express';
import * as handlers from '../../handlers/productHandler';
import validateToken from '../../middleware/authentication.middleware'

const productRoute  = Router();

productRoute.get('/all',validateToken,handlers.index);
productRoute.get('/product',validateToken,handlers.show);
productRoute.post('/create',validateToken,handlers.create);

productRoute.get('/',  (req: Request, res: Response) =>{
    res.send('product routes');
});

export default productRoute;