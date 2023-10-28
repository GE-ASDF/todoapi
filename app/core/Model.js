import mysql2 from "mysql2/promise";
import { config } from "../../config/config.js";

export default class Model{
    constructor(){
        if (this.constructor == Model) {
            throw new Error("Abstract classes can't be instantiated.");
        }
    }
    connection(){
        try{
            if(global.conexao && global.conexao.state != "disconected"){
                return global.conexao;
            }
            const con = mysql2.createConnection(config.DB_CONFIG);
            global.conexao = con;
            return con;
        }catch(error){
            return error;
        }
    }
}
