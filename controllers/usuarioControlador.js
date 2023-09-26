import { Router } from "express"
import respuestasHttp from "../utils/respuestasHttp.js"
import usuarioServicio from "../services/usuarioServicio.js"
import { UsuarioCrearReqModel, UsuarioDatosResModel } from "../models/usuarioModel.js"
import { ClienteDatosResModel } from "../models/clienteModel.js"
import { ArticuloDatosResModel } from "../models/articuloModel.js"

const router= Router()

router.post("/", (req, res)=>{
    
        usuarioServicio.crearUsuario(new UsuarioCrearReqModel(req.body))
        .then(usuario =>{
            respuestasHttp.exito(req, res, new UsuarioDatosResModel(usuario), 201)
        })
        .catch(err=>{
            respuestasHttp.error(req, res, err, "Error al crear el usuario", 400)
            console.log(err)
    })
})

router.get("/", (req, res)=>{

    const username= "camilo129"
    usuarioServicio.leerUsuario(username)
    .then(usuario =>{
        respuestasHttp.exito(req, res, new UsuarioDatosResModel(usuario), 201)
    })
    .catch(err=>{
        respuestasHttp.error(req, res, err, "Error al leer el usuario", 400)
})
})

router.get("/misclientes", (req, res)=>{

    const username= "camilo129"
    usuarioServicio.leerMisClientes(username)
    .then(array=>{
        let losClientes=[]
        array.forEach(cliente => {
            losClientes.push(new ClienteDatosResModel(cliente))   
        });
        respuestasHttp.exito(req, res, losClientes, 200)
    })
    .catch(err=>{
        respuestasHttp.error(req, res, err, "Error al leer mis Clientes", 500)
    })
})

router.get("/misarticulos", (req, res)=>{

    const username= "camilo129"
    usuarioServicio.leerMisArticulos(username)
    .then(array=>{
        let losArticulos=[]
        array.forEach(articulo => {
            losArticulos.push(new ArticuloDatosResModel(articulo))   
        });
        respuestasHttp.exito(req, res, losArticulos, 200)
    })
    .catch(err=>{
        respuestasHttp.error(req, res, err, "Error al leer mis Articulos", 500)
    })
})

export default router