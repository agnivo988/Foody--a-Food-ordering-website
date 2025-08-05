import jwt from 'jsonwebtoken'
import express from 'express'
import 'dotenv/config.js'
import userModel from '../models/userModel.js'
import orderModel from '../models/orderModel.js'

const authMiddleware = async (req,res,next) => {

        const {token} = req.headers;
        if(!token){
            return res.json({success:false,message:"Not authorized Login again"})
        }
        try {
           const token_decode = jwt.verify(token, process.env.JWT_SECRET);
    req.body = req.body || {};
    req.body.userId = token_decode.id;
    next();
            
            
        } catch (error) {
            console.log(error);
            res.json({success:false,message:"Error"})
        }

}

export default authMiddleware;