import passport from "passport"
import pagoControlador from "../controllers/pagoControlador.js"
import { Router } from "express"

const routerPago= Router()

routerPago.post("/",
    passport.authenticate("jwt", {session: false}),
    pagoControlador.postPago)

    routerPago.get("/",
    passport.authenticate("jwt", {session: false}),
    pagoControlador.getPago)

    routerPago.get("/:id",
    passport.authenticate("jwt", {session: false}),
    pagoControlador.getDetallePago)

    routerPago.put("/:id",
    passport.authenticate("jwt", {session: false}),
    pagoControlador.putPago)

    routerPago.delete("/:id",
    passport.authenticate("jwt", {session: false}),
    pagoControlador.deletePago)

export default routerPago