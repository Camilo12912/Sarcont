import sucursalControlador from "../controllers/sucursalControlador.js"
import { Router } from "express"
import passport from "passport"


const routerSucursal= Router()

routerSucursal.post("/",
    passport.authenticate("jwt", {session: false}),
    sucursalControlador.postSucursal)

    routerSucursal.get("/",
    passport.authenticate("jwt", {session: false}),
    sucursalControlador.getSucursal)

    routerSucursal.get("/:id",
    passport.authenticate("jwt", {session: false}),
    sucursalControlador.getDetalleSucursal)

    routerSucursal.put("/:id",
    passport.authenticate("jwt", {session: false}),
    sucursalControlador.putSucursal)

    routerSucursal.delete("/:id",
    passport.authenticate("jwt", {session: false}),
    sucursalControlador.deleteSucursal)

export default routerSucursal