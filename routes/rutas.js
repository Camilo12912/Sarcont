import clienteControlador from "../controllers/clienteControlador.js"
import usuarioControlador from "../controllers/usuarioControlador.js"
import articuloControlador from "../controllers/articuloControlador.js"
import sucursalControlador from "../controllers/sucursalControlador.js"
import pucControlador from "../controllers/pucControlador.js"
import rolControlador from "../controllers/rolControlador.js"

const rutas= (app)=>{
    app.use("/cliente", clienteControlador)
    app.use("/usuario", usuarioControlador)
    app.use("/articulo", articuloControlador)
    app.use("/sucursal", sucursalControlador)
    app.use("/puc", pucControlador)
    app.use("/roles", rolControlador)
}

export default rutas