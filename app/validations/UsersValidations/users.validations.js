import {validationResult, check} from "express-validator";
import {validateUserOfUser, validatePasswordOfUser} from "../../helpers/validateUserOfUser.js"
export const UsersCreateValidations = [
    check('name').trim().notEmpty().withMessage('O nome não pode estar vazio').isLength({min:2, max:255}).escape(),
    check('user').trim().notEmpty().withMessage('O usuário não pode estar vazio').isLength({min:2}).custom(validateUserOfUser).escape(),
    check('password').trim().isLength({min:6}).withMessage("A senha deve ter no mínimo 6 caracteres").custom(validatePasswordOfUser).withMessage('A senha deve possuir pelo menos 1 caractere.').escape()
]