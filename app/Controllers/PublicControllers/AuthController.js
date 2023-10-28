import Users from "../../models/Users.js";


export default class AuthController{
    static async auth(req, res){
        
        const users = await Users.setUserUser()
        return res.json(users);
    }
}