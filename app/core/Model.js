import mysql2 from "mysql2/promise";
import { config } from "../../config/config.js";


export default class Model{
    constructor(){
        if (this.constructor == Model) {
            throw new Error("Abstract classes can't be instantiated.");
        }
        this.connection = null;
    }
    async connect(){
        try{
            this.connection = await mysql2.createConnection(config.DB_CONFIG);
            console.log("Conexão com o banco de dados iniciada.")
        }catch(err){
            return {
                error:true,
                message:"Não foi possível estabelecer a conexão com o banco de dados no momento.",
                err:err,
            }
        }
    }
    async disconnect(){
        if(this.connection){
            await this.connection.end();
            console.log("Conexão com o banco de dados encerrada")
        }
    }
}
