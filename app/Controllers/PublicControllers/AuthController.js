import Users from "../../models/Users.js";

class AuthController{
    async verify(req, res){
        return res.status(200).json({
            status:'success',
            data: req.session.user,
        })
    }
}

export default new AuthController;