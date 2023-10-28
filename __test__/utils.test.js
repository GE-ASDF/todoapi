import {compareString, validateUserOfUser} from "../app/utils/utils.js";

describe("Testando a função compareString", ()=>{
    it("Verifica se duas strings são iguais independente da acentuação", ()=>{
        const result = compareString('NÃO') == compareString('não') ? true:false;
        expect(result).toBe(true);
    })
})

describe("Testando a função validateUserOfUser", ()=>{
    it("Verifica se o usuário informou um user válido", ()=>{
        const user = 'A123';
        const esperado = validateUserOfUser(user);
        expect(esperado).toBe(true);
    })
})

describe("Testando a função validatePasswordOfUser", ()=>{
    it("Verifica se o usuário informou uma senha válida que possui pelo menos 1 caractere", ()=>{
        const password = 'a';
        const esperado = validateUserOfUser(password);
        expect(esperado).toBe(true);
    })
})