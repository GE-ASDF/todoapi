import {matchedData} from "express-validator"
import Users from "../models/Users.js";
import {messages} from "../../constants/messages.js"
import { passwordVerify } from "../utils/utils.js";
import {generateJwt} from "../helpers/helpers.js";

class AuthService{
 
    async auth(req, res){
        const data = matchedData(req);
        const user = await Users.setUserOfUser(data.user)
        if(user.error == false){
            if(user.metadata.rowsCount > 0){
                const passVerify = await passwordVerify(user.data[0].password, data.password);
                if(!passVerify){
                    return res.status(200).json({
                        status:"success",
                        error: true,
                        message: messages.INVALID_PASS_OR_USER
                    })
                }
                delete user.data[0].password;
                const token = generateJwt(user.data[0])
                user.data[0].token = token;
                req.session.user = user.data[0];
                return res.status(200).json({
                    status:"success",
                    error: user.error,
                    data:{
                        metadata: user.metadata,
                        data: user.data
                    },  
                })
            }else{
                return res.status(200).json({
                    status:"success",
                    error: true,
                    message: messages.USER_NOT_FOUND
                })
            }
        }
        return res.status(400).json(user)
    }
   
}

export default new AuthService;