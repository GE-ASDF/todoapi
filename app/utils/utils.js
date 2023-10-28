/**
 * Esta função usa as funções trim, normalize e toLowerCase para limpar uma string de acordo com Unicode Standard Annex #15
 * @param {string} string - String a ser convertida
 * @returns string
 */
export const compareString = (string)=> string.trim().normalize('NFC').toLowerCase();
    
export const validateUserOfUser = (user)=> /^^[a-zA-z][0-9]*$/g.test(user)

export const validatePasswordOfUser =  (pass)=> /[a-zA-Z]/.test(pass)