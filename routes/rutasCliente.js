import passport from "passport"
import clienteControlador from "../controllers/clienteControlador.js"
import { Router } from "express"


const routerCliente= Router()

routerCliente.post("/",
    passport.authenticate("jwt", {session: false}),
    clienteControlador.postCliente)

routerCliente.get("/",
    passport.authenticate("jwt", {session: false}),
    clienteControlador.getCliente)

routerCliente.get("/:id",
    passport.authenticate("jwt", {session: false}),
    clienteControlador.getDetalleCliente)

routerCliente.put("/:id",
    passport.authenticate("jwt", {session: false}),
    clienteControlador.putCliente)

routerCliente.delete("/:id",
    passport.authenticate("jwt", {session: false}),
    clienteControlador.deleteCliente)

export default routerCliente