import passport from "passport"
import usuarioControlador from "../controllers/usuarioControlador.js"
import { Router } from "express"


const routerUsuario= Router()

routerUsuario.post("/",
    usuarioControlador.postUsuario)

routerUsuario.get("/",
    passport.authenticate("jwt", {session: false}),
    usuarioControlador.getUsuario)

routerUsuario.get("/:id",
    passport.authenticate("jwt", {session: false}),
    usuarioControlador.getDetalleUsuario)

routerUsuario.put("/:id",
    passport.authenticate("jwt", {session: false}),
    usuarioControlador.putUsuario)

routerUsuario.put("/password/:id",
    passport.authenticate("jwt", {session: false}),
    usuarioControlador.putPasswordUsuario)

routerUsuario.delete("/:id",
    passport.authenticate("jwt",{ session :false }),
    usuarioControlador.deleteUsuario)

routerUsuario.post("/login",
    passport.authenticate("local", {session:false}),
    usuarioControlador.postSignin)

export default routerUsuario