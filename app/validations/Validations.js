import {validationResult} from "express-validator"

export default class Validations{
    constructor(){
        if (this.constructor == Validations) {
            throw new Error("Abstract classes can't be instantiated.");
        }
    }
    checkRules(req, res, next){
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            errors.status = 'failed';
            return res.status(400).json(errors);
        }
        next();
    }
}