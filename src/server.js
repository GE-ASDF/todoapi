import { config } from "../config/config.js";
import App from "./App.js";
import Auth from "../routes/PublicRoutes/AuthRoute.js";
import { verifyJwt } from "../app/middlewares/verifyJWT.js";
import {authMiddleware} from "../app/middlewares/authMiddleaware.js";

const {app} = new App();

app.use("/", Auth)

app.listen(config.PORT_BACKEND, async ()=>{
    console.log("Backend rodando "+ config.PORT_BACKEND)
})
