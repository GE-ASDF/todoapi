import AuthController from "../../app/Controllers/PublicControllers/AuthController.js";
import { Router } from "express";
import AuthService from "../../app/services/AuthService.js";
import UsersValidations from "../../app/validations/UsersValidations/UsersValidations.js"
import { csrfProtection } from "../../app/utils/utils.js";
const AuthRoute = Router();

AuthRoute.get("/:user?/:password?/",UsersValidations.auth, UsersValidations.checkRules, csrfProtection, AuthService.auth)

AuthRoute.get("/csrfToken", csrfProtection, (req, res)=> {
    return res.status(200).json({
        status:"success",
        csrfToken:req.csrfToken()
    });
})

export default AuthRoute



