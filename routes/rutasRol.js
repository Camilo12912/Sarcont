import rolControlador from "../controllers/rolControlador.js"
import { Router } from "express"
import passport from "passport"

const routerRol= Router()

routerRol.post("/",
    passport.authenticate("jwt", {session: false}),
    rolControlador.postRol)

    routerRol.get("/",
    passport.authenticate("jwt", {session: false}),
    rolControlador.getRol)

    routerRol.get("/:id",
    passport.authenticate("jwt", {session: false}),
    rolControlador.getDetalleRol)

    routerRol.put("/:id",
    passport.authenticate("jwt", {session: false}),
    rolControlador.putRol)

    routerRol.delete("/:id",
    passport.authenticate("jwt", {session: false}),
    rolControlador.deleteRol)

export default routerRol