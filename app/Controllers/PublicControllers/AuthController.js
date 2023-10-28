import Users from "../../models/Users.js";

class AuthController{
    async verify(req, res){
        if(req.session.user != undefined){
            return res.status(200).json({
                status:'success',
                error:false,
                data: req.session.user,
            })
        }else{
            return res.status(200).json({
                status:'success',
                error:true,
                message: 'Não há sessão de usuário ativa',
            })
        }
    }
}

export default new AuthController;