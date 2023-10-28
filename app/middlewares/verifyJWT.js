import jwt from "jsonwebtoken";
import {config} from "../../config/config.js";
import {messages} from "../../constants/messages.js";

/**
 * 
 * @param {Request} req 
 * @param {Response} res 
 * @param {*} next 
 */

export const verifyJwt = (req, res, next)=>{
    const tokenJWT = req.header("Authorization");

    if(!tokenJWT){
        return res.status(401).json({
            error:true,
            message: messages.NOT_JWT_TOKEN
        })
    }
    
    try{
        const decoded = jwt.verify(tokenJWT, config.APP_SECRET)
        req.user = decoded.user;
        if(decoded.exp < Date.now() / 1000){
            return res.status(401).json({error:true,message:messages.EXPIRED_JWT_TOKEN})
        }
        next();
    }catch(error){
        return res.status(401).json({error:true,message:messages.INVALID_JWT_TOKEN})
    }
}