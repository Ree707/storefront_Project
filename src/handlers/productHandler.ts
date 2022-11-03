//In each handler file, create RESTful endpoints for each model method.
import express, { Request, Response } from 'express'
import {productStore} from '../models/product';

//export const productHandler = express.Router();
const Product: productStore =new productStore();

//index all products
export const index = async (_req: Request, res: Response) =>{
     try {
           const products= await Product.getAllProducts();
           res.json(products);
    } catch (err) {
         res.status(400)
        res.json(err)
    }
}

//show one product by id
export const show = async (req: Request, res: Response) =>{
     try {
         const id: Number = parseInt(req.body.id);
         const prduct= await Product.showProduct(id);
         res.json(prduct);
    } catch (err) {
         res.status(400)
        res.json(err)
    }
}

//create new product 
export const create = async (req: Request, res: Response) =>{
     try {
         const product = await Product.createProduct(req.body);
         res.json(product);
    } catch (err) {
         res.status(400)
        res.json(err)
    }
}
