import express, { Router,Request, Response,NextFunction } from 'express'
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const { TOKEN_SECRET } = process.env;

const validateToken= (req: Request, res: Response, next: NextFunction) => {
try {
const authHeader = req.get('Authorization');
console.log(authHeader);
if (authHeader){
    const bearer=authHeader.split(' ')[0].toLowerCase();
    const token=authHeader.split(' ')[1];
    if (token && bearer === 'bearer'){
        const decode = jwt.verify(token,TOKEN_SECRET as unknown as string );
        if (decode){
            next();
        } else {
            //authentication failed 
            res.send('failed to authenticate, unauthorized access');
        }
    }
    else{
        //token type not bearer 
        res.send('no token, unauthorized access');
    }
    //no token 
}else {
    res.send('no token, unauthorized access');
}
}catch (error) {

}
};

export default validateToken;