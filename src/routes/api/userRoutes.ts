import {Router, Request, Response }from 'express';
import * as handlers from '../../handlers/userHandler';
import validateToken from '../../middleware/authentication.middleware'

const userRoute  = Router();

userRoute.get('/all',validateToken,handlers.index);
userRoute.get('/user',validateToken,handlers.show);
userRoute.post('/create',validateToken,handlers.create);
userRoute.post('/authenticate',handlers.authenticate);

userRoute.get('/',  (req: Request, res: Response) =>{
    res.send('users routes');
});

export default userRoute;