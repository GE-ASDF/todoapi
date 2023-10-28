import jwt from "jsonwebtoken"
import {config} from "../../config/config.js";

/**
 * Gera um token JWT para um usuário
 * @param {object} user 
 * @returns string
 */
export const generateJwt = (user)=>{
    return jwt.sign({user}, config.APP_SECRET, {expiresIn:'1d'})
}