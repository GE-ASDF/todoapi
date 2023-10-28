import { messages } from "../../constants/messages.js";

export const authMiddleware = (req, res, next)=>{
    if(req.session.user != undefined){
        next();
    }
    return res.status(401).json({error:true, message:messages.NOT_LOGGED})
}