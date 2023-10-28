import { messages } from "../../constants/messages.js";

export const authMiddleware = (req, res, next)=>{
    if(req.session.user == undefined){
        return res.status(401).json({status:'failed', message:messages.NOT_LOGGED})
    }
    next();
}