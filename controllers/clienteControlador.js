import   { Router } from "express"
import respuestasHttp from "../utils/respuestasHttp.js"
import clienteServicio from "../services/clienteServicio.js"
import { ClienteActualizarReqModel, ClienteCrearReqModel, ClienteDatosResModel, ClienteLeerDatosResModel } from "../models/clienteModel.js"

const router= Router()


router.post("/", (req, res)=>{

    const username="camilo129" 
    clienteServicio.crearCliente(new ClienteCrearReqModel(req.body), username)

    .then(cliente =>{
        console.log(cliente)
        respuestasHttp.exito(req, res, new ClienteDatosResModel(cliente), 201)

    })
    .catch(err=>{
        respuestasHttp.error(req, res, err, "Error al crear el cliente", 400)
        console.log(err)
    })

})

router.get("/", (req, res)=>{
    
    clienteServicio.leerCliente()
    .then(array=> {
        let losClientes=[]
        array.forEach(cliente => {
            losClientes.push(new ClienteLeerDatosResModel(cliente))
        })
        respuestasHttp.exito(req, res, losClientes, 200)
    })
    .catch(err=>{
        respuestasHttp.error(req, res, err, "Error al leer los clientes", 500)
        console.log(err)
    })
})

router.get("/:id", (req, res)=>{
    
    clienteServicio.detalleCliente(req.params.id)
    .then(array=> {
        let LosClientes=[]
        array.forEach(cliente => {
            LosClientes.push(new ClienteLeerDatosResModel(cliente))
        })
        respuestasHttp.exito(req, res, LosClientes, 200)
    })
    .catch(err =>{
        respuestasHttp.error(req,res,err, "Error al leer el detalle del cliente", 500)
    })
})

router.put("/:id", (req, res) => {

    clienteServicio.actualizarCliente(req.params.id, new ClienteActualizarReqModel(req.body))
    
    .then(clienteActualizada => {
    
    const clienteJSON = clienteActualizada[0]
    
        respuestasHttp.exito(req, res, new ClienteLeerDatosResModel(clienteJSON), 200)
    
    })
        .catch(err => {
        respuestasHttp.error(req, res, err, "error al actualizar la especialidad", 400)
        console.log(err)
    })
    })

router.delete("/:id", (req, res)=>{

    const username="camilo129"
    clienteServicio.eliminarCliente(req.params.id, username)
    .then(()=>{
        respuestasHttp.exito(req, res, "Cliente eliminado con exito", 200)
    })
    .catch( err=>{
        respuestasHttp.error(req, res,err, "No se pudo eliminar el cliente",  400)
        console.log(err)
    })

})



export default router