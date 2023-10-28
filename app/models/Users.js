import Model from "../core/Model.js";
import {compareString} from "../utils/utils.js";

/**
 * WHERE
 * GROUP BY
 * ORDER BY
 * LIMIT
 */
class Users extends Model{
    constructor(){
        super(); 
    }
    #verifyTable(table){
        if(!table.trim() && compareString(table) != compareString(Users.name)){
            this.table = Users.name.toLocaleLowerCase();           
        }else{
            this.table = cleanNfdAndLowerString(table);
        }
    }
    /**
     * Define o user do usuário que deverá ser buscado e retorna  
     * @param {string | number} user 
     * @param {object} options - table=Users.name | string, fields= array | '*', groupBy= string | '', orderBy= string | '', limit= string | ''
     * @returns Promise<getUserById()>
     */
    async setUserId(id, options = {}){
        this.userId = id;  
        return await this.#getUserById(options);
    }
    /**
     * Define o user do usuário que deverá ser buscado e retorna  
     * @param {string | number} user 
     * @param {object} options - table=Users.name | string, fields= array | '*', groupBy= string | '', orderBy= string | '', limit= string | ''
     * @returns Promise<getUserByUser()>
     */
    async setUserUser(user, options = {}){
        this.user = user;
        return await this.#getUserByUser(options);
    }
    getUserUser(){
        return this.user;
    }
    getUserId(){
        return this.userId;
    }
    /**
     * Retorna todos os usuários cadastrados no banco de dados
     * @param {string} table,
     * @param {Array} fields 
     * @returns
     */
       async getAllUsers({table=Users.name, fields=["*"], data=[], where='', groupBy='', orderBy='', limit=''} = ''){
        this.#verifyTable(table);
        const con = await this.connection();
        let sql = `SELECT ${[...fields]} FROM ${this.table} ${where ? `WHERE ${where}`:''} ${groupBy ? `GROUP BY ${groupBy}`:''} ${orderBy ? `ORDER BY ${orderBy}`:''} ${limit ? `LIMIT ${limit}`:''}`.trim();
        try{
            const [users] = await con.query(sql, data);
            return {
                error:false,
                rowsCount: users.length,
                data:users,
            };
        }catch(error){
            throw new Error("Ocorreu um erro na hora de buscar os usuários");
        }
    }
    async #getUserByUser({table=Users.name, fields=["*"], groupBy='', orderBy='', limit=''} = ''){
        if(!this.getUserUser()){
            throw new Error("É preciso informar o id do usuário com o método setUserId")
        }
        this.#verifyTable(table);
        const con = await this.connection();
        let sql = `SELECT ${[...fields]} FROM ${this.table} WHERE user = ? ${groupBy ? `GROUP BY ${groupBy}`:''} ${orderBy ? `ORDER BY ${orderBy}`:''} ${limit ? `LIMIT ${limit}`:''}`.trim();
        try{
            const [user] = await con.query(sql, [this.getUserUser()]);
            return {
                error:false,
                rowsCount: user.length,
                data:user,
            };
        }catch(error){
            throw new Error("Ocorreu um erro na hora de buscar os usuários");
        }
    }
    async #getUserById({table=Users.name, fields=["*"], groupBy='', orderBy='', limit=''} = ''){
        if(!this.getUserId()){
            throw new Error("É preciso informar o id do usuário com o método setUserId")
        }
        this.#verifyTable(table);
        const con = await this.connection();
        let sql = `SELECT ${[...fields]} FROM ${this.table} WHERE id = ? ${groupBy ? `GROUP BY ${groupBy}`:''} ${orderBy ? `ORDER BY ${orderBy}`:''} ${limit ? `LIMIT ${limit}`:''}`.trim();
        try{
            const [user] = await con.query(sql, [this.getUserId()]);
            return {
                error:false,
                rowsCount: user.length,
                data:user,
            };
        }catch(error){
            throw new Error("Ocorreu um erro na hora de buscar os usuários");
        }
    }
}

export default new Users;