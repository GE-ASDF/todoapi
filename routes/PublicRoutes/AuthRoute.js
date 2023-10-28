import {Router} from "express";
import AuthController from "../../app/Controllers/PublicControllers/AuthController.js";

const Auth = Router();

Auth.get("/", AuthController.auth);

export default Auth;
