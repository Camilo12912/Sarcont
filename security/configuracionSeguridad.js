import passport from "passport"
import usuarioAutenticacion from "./usuarioAutenticacion.js"
import router from "../routes/rutas.js"
import tokenAutorizacion from "./tokenAutorizacion.js"

const configuracionSeguridad= (app)=>{
    app.use("/", router)
    passport.use(usuarioAutenticacion.localEstrategia)
    passport.use(tokenAutorizacion.jwtEstrategia)
}

export {configuracionSeguridad}