import csrf from "csurf";
import bcrypt from "bcrypt";

/**
 * Esta função usa as funções trim, normalize e toLowerCase para limpar uma string de acordo com Unicode Standard Annex #15
 * @param {string} string - String a ser convertida
 * @returns string
 */
export const compareString = (string)=> string.trim().normalize('NFC').toLowerCase();
    
export const validateUserOfUser = (user)=> /^^[a-zA-z][0-9]*$/g.test(user)

export const validatePasswordOfUser =  (pass)=> /[a-zA-Z]/.test(pass)

export const csrfProtection = csrf({cookie:true})

export const passwordHash = async (notEncryptedString, salts = 10)=> await bcrypt.hashSync(notEncryptedString, salts)

export const passwordVerify =  async (encryptedString, notEncryptedString)=> await bcrypt.compare(notEncryptedString, encryptedString)