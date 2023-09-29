import   { Router } from "express"
import respuestasHttp from "../utils/respuestasHttp.js"
import rolServicio from "../services/rolServicio.js"
import { RolActualizarReqModel, RolCrearReqModel, RolDatosResModel } from "../models/rolModel.js"

const router= Router()


router.post("/", (req, res)=>{

    const username="camilo129" 
    rolServicio.crearRol(new RolCrearReqModel(req.body), username)
    .then(rol =>{
        respuestasHttp.exito(req, res, new RolDatosResModel(rol), 201)
    })
    .catch(err=>{
        respuestasHttp.error(req, res, err, "Error al crear el rol", 400)
        console.log(err)
    })

})

router.get("/", (req, res)=>{
    
    rolServicio.leerRol()
    .then(array=> {
        let LosRoles=[]
        array.forEach(rol => {
            LosRoles.push(new RolDatosResModel(rol))
        })
        respuestasHttp.exito(req, res, LosRoles, 200)
    })
    .catch(err=>{
        respuestasHttp.error(req, res, err, "Error al leer las roles", 500)
        console.log(err)
    })
})

router.get("/:id", (req, res)=>{
    
    rolServicio.detalleRol(req.params.id)
    .then(array=> {
        let LosRoles=[]
        array.forEach(rol => {
            LosRoles.push(new RolDatosResModel(rol))
        })
        respuestasHttp.exito(req, res, LosRoles, 200)
    })
    .catch(err =>{
        respuestasHttp.error(req,res,err, "Error al leer el detalle del rol", 500)
    })
})

router.put("/:id", (req, res) => {

    rolServicio.actualizarRol(req.params.id, new RolActualizarReqModel(req.body))
    
    .then(rolActualizado => {
    
    const rolJSON = rolActualizado[0]
    
        respuestasHttp.exito(req, res, new RolDatosResModel(rolJSON), 200)
    
    })
        .catch(err => {
        respuestasHttp.error(req, res, err, "error al actualizar el rol", 400)
        console.log(err)
    })
    })

router.delete("/:id", (req, res)=>{

    const username="camilo129"
    rolServicio.eliminarRol(req.params.id, username)
    .then(()=>{
        respuestasHttp.exito(req, res, "rol eliminado con exito", 200)
    })
    .catch( err=>{
        respuestasHttp.error(req, res,err, "No se pudo eliminar el rol",  400)
        console.log(err)
    })

})

export default router
