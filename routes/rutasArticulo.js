import articuloControlador from "../controllers/articuloControlador.js"
import { Router } from "express"
import passport from "passport"

const routerArticulo= Router()

routerArticulo.post("/",
    passport.authenticate("jwt", {session: false}),
    articuloControlador.postArticulo)

routerArticulo.get("/",
    passport.authenticate("jwt", {session: false}),
    articuloControlador.getArticulo)

routerArticulo.get("/:id",
    passport.authenticate("jwt", {session: false}),
    articuloControlador.getDetalleArticulo)

routerArticulo.put("/:id",
    passport.authenticate("jwt", {session: false}),
    articuloControlador.putArticulo)

routerArticulo.delete("/:id",
    passport.authenticate("jwt", {session: false}),
    articuloControlador.deleteArticulo)

export default routerArticulo