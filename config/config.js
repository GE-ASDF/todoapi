import dotenv from "dotenv"
dotenv.config();

export const config = {
    URL_FRONTEND: process.env.URL_FRONTEND,
    PORT_BACKEND: process.env.PORT_BACKEND,
    APP_SECRET: process.env.APP_SECRET,
    DB_CONFIG:{
        host:process.env.HOST_DB,
        user:process.env.USER_DB,
        password:process.env.PASS_DB,
        database:process.env.DBNAME,
        port:process.env.PORT_DB
    }
}