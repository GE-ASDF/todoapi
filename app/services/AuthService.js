import {matchedData} from "express-validator"
import Users from "../models/Users.js";
class AuthService{
    async auth(req, res){
        const data = matchedData(req);
        const user = await Users.setUserOfUser(data.user)
        if(user.error == false){
            return res.status(200).json({
                status:"success",
                error: user.error,
                data:{
                    metadata: user.metadata,
                    data: user.data
                },  
            })
        }
        return res.status(400).json(user)
    }
}

export default new AuthService;