import {check, validationResult} from "express-validator"
import Validations from "../Validations.js";

class UsersValidations extends Validations{
    constructor(){
        super();
        this.auth = [
            check('user').trim().notEmpty().escape(),
            check('password').trim().notEmpty().escape()
        ]
    }    
}

export default new UsersValidations;