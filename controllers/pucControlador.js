import respuestasHttp from "../utils/respuestasHttp.js"
import pucServicio from "../services/pucServicio.js"
import { PucDatosResModel } from "../models/pucModel.js"


const getPuc= (req, res)=>{
    
    pucServicio.leerPuc()
    .then(array=> {
        let losPuc=[]
        array.forEach(puc => {
            losPuc.push(new PucDatosResModel(puc))
        })
        respuestasHttp.exito(req, res, losPuc, 200)
    })
    .catch(err=>{
        respuestasHttp.error(req, res, err, "Error al leer los clientes", 500)
    })
}


const getDetallePuc= (req, res)=>{
    
    pucServicio.detallePuc(req.params.codigo)
    .then(array=> {

        let losPuc=[]
        array.forEach(puc => {
            losPuc.push(new PucDatosResModel(puc))
        })
        respuestasHttp.exito(req, res, losPuc, 200)
    })
    .catch(err =>{
        respuestasHttp.error(req,res,err, "Error al leer el detalle del puc", 500)
    })
}
export default { getPuc, getDetallePuc}