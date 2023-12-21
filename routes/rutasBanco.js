import passport from "passport"
import bancoControlador from "../controllers/bancoControlador.js"
import { Router } from "express"

const routerBanco= Router()

routerBanco.post("/",
    passport.authenticate("jwt", {session: false}),
    bancoControlador.postBanco)

    routerBanco.get("/",
    passport.authenticate("jwt", {session: false}),
    bancoControlador.getBanco)

    routerBanco.get("/:id",
    passport.authenticate("jwt", {session: false}),
    bancoControlador.getDetalleBanco)

    routerBanco.put("/:id",
    passport.authenticate("jwt", {session: false}),
    bancoControlador.putBanco)

    routerBanco.delete("/:id",
    passport.authenticate("jwt", {session: false}),
    bancoControlador.deleteBanco)

export default routerBanco

