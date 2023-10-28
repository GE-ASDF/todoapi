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
        this.connect();
    }
    
    #verifyTable(table){
        if(!table.trim() && compareString(table) != compareString(Users.name)){
            this.table = Users.name.toLocaleLowerCase();           
        }else{
            this.table = compareString(table);
        }
    }
    /**
     * Define o user do usuário que deverá ser buscado e retorna um usuário caso encontrado
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
    async setUserOfUser(user, options = {}){
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
        let sql = `SELECT ${[...fields]} FROM ${this.table} ${where ? `WHERE ${where}`:''} ${groupBy ? `GROUP BY ${groupBy}`:''} ${orderBy ? `ORDER BY ${orderBy}`:''} ${limit ? `LIMIT ${limit}`:''}`.trim();
        try{
            const [users] = await this.connection.execute(sql, data);
            return {
                error:false,
                rowsCount: users.length,
                data:users,
            };
        }catch(err){
            return {
                error:true,
                message:"Não foi possível obter todos os usuários no momento.",
                err:err,
            }
        }
    }
    async #getUserByUser({table=Users.name, fields=["*"], groupBy='', orderBy='', limit=''} = ''){
        if(!this.getUserUser()){
            throw new Error("É preciso informar o id do usuário com o método setUserId")
        }
        this.#verifyTable(table);
        let sql = `SELECT ${[...fields]} FROM ${this.table} WHERE user = ? ${groupBy ? `GROUP BY ${groupBy}`:''} ${orderBy ? `ORDER BY ${orderBy}`:''} ${limit ? `LIMIT ${limit}`:''}`.trim();
        try{
            const [user] = await this.connection.execute(sql, [this.getUserUser()]);
            return {
                error:false,
                metadata:{
                    rowsCount: user.length,
                },
                data:user,
            };
        }catch(err){
            return {
                error:true,
                message:"Não foi possível obter o usuário pelo user no momento.",
            }
        }
    }
    async #getUserById({table=Users.name, fields=["*"], groupBy='', orderBy='', limit=''} = ''){
        if(!this.getUserId()){
            throw new Error("É preciso informar o id do usuário com o método setUserId")
        }
        this.#verifyTable(table);
        let sql = `SELECT ${[...fields]} FROM ${this.table} WHERE id = ? ${groupBy ? `GROUP BY ${groupBy}`:''} ${orderBy ? `ORDER BY ${orderBy}`:''} ${limit ? `LIMIT ${limit}`:''}`.trim();
        try{

            const [user] = await this.connection.execute(sql, [this.getUserId()]);
            return {
                error:false,
                rowsCount: user.length,
                data:user,
            };
        }catch(err){
            return {
                error:true,
                message:"Não foi possível obter o usuário pelo id no momento",
                err:err,
            }
        }

    }
}

export default new Users;