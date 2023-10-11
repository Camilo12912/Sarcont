import passport from "passport"
import pucControlador from "../controllers/pucControlador.js"
import { Router } from "express"


const routerPuc= Router()

routerPuc.get("/",
    passport.authenticate("jwt", {session: false}),
    pucControlador.getPuc)

routerPuc.get("/:id",
passport.authenticate("jwt", {session: false}),
    pucControlador.getDetallePuc)

export default routerPuc