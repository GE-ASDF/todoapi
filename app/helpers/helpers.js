import jwt from "jsonwebtoken"
import {config} from "../../config/config";

/**
 * Gera um token JWT para um usuário
 * @param {object} user 
 * @returns string
 */
export const generateJwt = (user)=>{
    return jwt.sign(config.APP_SECRET, user, {expiresIn:"1d"})
}