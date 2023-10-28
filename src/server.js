import { config } from "../config/config.js";
import App from "./app.js";

App.server.listen(config.PORT_BACKEND, async ()=>{
    console.log("Backend rodando "+ config.PORT_BACKEND)
})

