import express from "express";
import cookieParser from "cookie-parser"
import cors from "cors";
import session from "express-session";
import csrf from "csurf"
import bodyParser from "body-parser";
import {config} from "../config/config.js";

export default class App{
   app = express();
   #csrfProtection;
   constructor(){
        this.app.use(cors({
           origin:[config.URL_FRONTEND],
           methods:["GET", "POST"],
           credentials:true,
        }))
        this.app.use(cookieParser())
        this.app.use(session({
            key:"LOGIN_USER",
            secret:"LOGIN_USER",
            resave:false,
            saveUninitialized:false,
            cookie:{
                maxAge:3600 * 1000 * 24,
                httpOnly:false
            }
        }))
        this.app.use(express.static("public"));
        this.app.use(bodyParser.urlencoded({extended: true, limit:"50mb", parameterLimit:50000}))
        this.app.use(bodyParser.json())
   }

   getCsrfProtection(){
        this.#csrfProtection = csrf({cookie:true})
        return this.#csrfProtection;
   }
}


