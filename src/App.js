import express from "express";
import cookieParser from "cookie-parser"
import cors from "cors";
import session from "express-session";
import bodyParser from "body-parser";
import {config} from "../config/config.js";
import AuthRoute from "../routes/PublicRoutes/AuthRoute.js"

class App{
   server;
   csrfProtection;
   constructor(){
        this.server = express();
        this.#createApp();
        this.#routes();
   }

   #routes(){
     this.server.use("/auth", AuthRoute)
   }

   #createApp(){
    this.server.use(cors({
           origin:[config.URL_FRONTEND],
           methods:["GET", "POST"],
           credentials:true,
        }))
        this.server.use(cookieParser())
        this.server.use(session(config.SESSION_CONFIG))
        this.server.use(express.static("public"));
        this.server.use(bodyParser.urlencoded({extended: true, limit:"50mb", parameterLimit:50000}))
        this.server.use(bodyParser.json())
   }

}

export default new App;