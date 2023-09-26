import   { Router } from "express"
import respuestasHttp from "../utils/respuestasHttp.js"
import sucursalServicio from "../services/sucursalServicio.js"
import { SucursalActualizarReqModel, SucursalCrearReqModel, SucursalDatosResModel } from "../models/sucursalModel.js"

const router= Router()


router.post("/", (req, res)=>{

    const username="camilo129" 
    sucursalServicio.crearSucursal(new SucursalCrearReqModel(req.body), username)
    .then(sucursal =>{
        respuestasHttp.exito(req, res, new SucursalDatosResModel(sucursal), 201)
    })
    .catch(err=>{
        respuestasHttp.error(req, res, err, "Error al crear el sucursal", 400)
        console.log(err)
    })

})

router.get("/", (req, res)=>{
    
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
        console.log(err)
    })
})

router.get("/:id", (req, res)=>{
    
    sucursalServicio.detalleSucursal(req.params.id)
    .then(array=> {
        let LasSucursales=[]
        array.forEach(sucursal => {
            LasSucursales.push(new SucursalDatosResModel(sucursal))
        })
        respuestasHttp.exito(req, res, LasSucursales, 200)
    })
    .catch(err =>{
        respuestasHttp.error(req,res,err, "Error al leer el detalle del sucursal", 500)
    })
})

router.put("/:id", (req, res) => {

    sucursalServicio.actualizarSucursal(req.params.id, new SucursalActualizarReqModel(req.body))
    
    .then(sucursalActualizada => {
    
    const sucursalJSON = sucursalActualizada[0]
    
        respuestasHttp.exito(req, res, new SucursalDatosResModel(sucursalJSON), 200)
    
    })
        .catch(err => {
        respuestasHttp.error(req, res, err, "error al actualizar la especialidad", 400)
        console.log(err)
    })
    })

router.delete("/:id", (req, res)=>{

    const username="camilo129"
    sucursalServicio.eliminarSucursal(req.params.id, username)
    .then(()=>{
        respuestasHttp.exito(req, res, "sucursal eliminado con exito", 200)
    })
    .catch( err=>{
        respuestasHttp.error(req, res,err, "No se pudo eliminar el sucursal",  400)
        console.log(err)
    })

})



export default router