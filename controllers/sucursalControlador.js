import respuestasHttp from "../utils/respuestasHttp.js"
import sucursalServicio from "../services/sucursalServicio.js"
import { SucursalActualizarReqModel, SucursalCrearReqModel, SucursalDatosResModel } from "../models/sucursalModel.js"


    const postSucursal= (req, res)=>{

    sucursalServicio.crearSucursal(new SucursalCrearReqModel(req.body), req.user.sub)
    .then(sucursal =>{
        respuestasHttp.exito(req, res, new SucursalDatosResModel(sucursal), 201)
    })
    .catch(err=>{
        respuestasHttp.error(req, res, err, "Error al crear el sucursal", 400)
    })

}

    const getSucursal= (req, res)=>{
    
    sucursalServicio.leerSucursal()
    .then(array=> {
        let LasSucursales=[]

        array.forEach(sucursal => {
            LasSucursales.push(new SucursalDatosResModel(sucursal))
        })
        respuestasHttp.exito(req, res, LasSucursales, 200)
    })
    .catch(err=>{
        respuestasHttp.error(req, res, err, "Error al leer las sucursales", 500)
    })
}

    const getDetalleSucursal= (req, res)=>{
    
    sucursalServicio.detalleSucursal(req.params.id)
    .then(sucursal=> {
        respuestasHttp.exito(req, res, new SucursalDatosResModel(sucursal), 200)
    })
    .catch(err =>{
        respuestasHttp.error(req,res,err, "Error al leer el detalle del sucursal", 500)
    })
}

    const putSucursal= (req, res)=>{

    sucursalServicio.actualizarSucursal(req.params.id, new SucursalActualizarReqModel(req.body), req.user.sub)
    
    .then(sucursalActualizada => {
    
    const sucursalJSON = sucursalActualizada[0]
    
        respuestasHttp.exito(req, res, new SucursalDatosResModel(sucursalJSON), 200)
    
    })
        .catch(err => {
        respuestasHttp.error(req, res, err, "error al actualizar la especialidad", 400)
    })
    }

    const deleteSucursal= (req, res)=>{

    sucursalServicio.eliminarSucursal(req.params.id, req.user.sub)
    .then(()=>{
        respuestasHttp.exito(req, res, "sucursal eliminado con exito", 200)
    })
    .catch( err=>{
        respuestasHttp.error(req, res,err, "No se pudo eliminar el sucursal",  400)
    })

}



export default {postSucursal, getSucursal, getDetalleSucursal, putSucursal, deleteSucursal}