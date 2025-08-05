import express from 'express'
import { addToCart,removeFromCart,getCart } from '../controllers/cartController.js'
import authMiddleware from '../middleware/auth.js';


const carRouter = express.Router();

carRouter.post("/add",authMiddleware,addToCart)
carRouter.post("/remove",authMiddleware,removeFromCart)
carRouter.post("/get",authMiddleware,getCart)



export default carRouter;