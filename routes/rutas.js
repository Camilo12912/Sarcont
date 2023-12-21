import { Router } from "express"
import routerUsuario from "./rutasUsuario.js"
import routerArticulo from "./rutasArticulo.js"
import routerRol from "./rutasRol.js"
import routerPuc from "./rutasPuc.js"
import routerPago from "./rutasPago.js"
import routerCliente from "./rutasCliente.js"
import routerBanco from "./rutasBanco.js"
import routerSucursal from "./rutasSucursal.js"

const router = Router()


router.use("/usuario", routerUsuario)
router.use("/sucursales", routerSucursal)
router.use("/roles", routerRol)
router.use("/puc", routerPuc)
router.use("/pagos", routerPago)
router.use("/clientes", routerCliente)
router.use("/bancos", routerBanco)
router.use("/articulos", routerArticulo)

export default router