import { Router } from "express"
import respuestasHttp from "../utils/respuestasHttp.js"
import usuarioServicio from "../services/usuarioServicio.js"
import { UsuarioCrearReqModel, UsuarioDatosResModel, UsuarioActualizarReqModel, PasswordActualizarReqModel } from "../models/usuarioModel.js"


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

    usuarioServicio.leerUsuario()

    .then( array =>{

    let losUsuarios= []

        array.forEach(usuario => {

            losUsuarios.push(new UsuarioDatosResModel(usuario))
            
        })
        respuestasHttp.exito(req, res, losUsuarios, 200)
    })
    .catch(err=>{
        respuestasHttp.error(req, res, err, "Error al leer el usuario", 400)
        console.log(err)
    })
})

// router.get("/:id", (req, res)=>{

//     usuarioServicio.detalleUsuario(req.params.id)
//     .then(array=> {
//         let losUsuarios=[]
//         array.forEach(usuario => {
//             losUsuarios.push(new UsuarioDatosResModel(usuario))
//         })
//         respuestasHttp.exito(req, res, losUsuarios, 200)
//         console.log(usuario)
//     })
//     .catch(err =>{
//         respuestasHttp.error(req,res,err, "Error al leer el detalle del usuario", 500)
//         console.log(err)
//     })
// })

router.get("/:id", (req, res) => {
    usuarioServicio.detalleUsuario(req.params.id)
        .then(array => {
        if (array.length > 0) {
            const losUsuarios = array.map(usuario => new UsuarioDatosResModel(usuario))
            respuestasHttp.exito(req, res, losUsuarios, 200)
        } else {
            respuestasHttp.error(req, res, "Usuario no encontrado", "Error al leer el detalle del usuario", 404)
        }
        })
        .catch(err => {
        respuestasHttp.error(req, res, err, "Error al leer el detalle del usuario", 500)
        console.error(err)
    })
    })
    

    router.put("/:id", (req, res)=>{
    
        const username= "camilo129"
        usuarioServicio.actualizarUsuario( req.params.id , new UsuarioActualizarReqModel(req.body ),username )
        .then(usuario=> {
            const usuarioJSON = usuario[0]
            respuestasHttp.exito(req, res, new UsuarioDatosResModel(usuarioJSON), 200)
        })
        .catch(err=> {
            respuestasHttp.error(req, res, err, "Error al actualizar el usuario", 400)
            console.log(err)
        })
    })

    router.put("/password/:id", (req, res)=>{

        usuarioServicio.actualizarPassword(req.params.id, new PasswordActualizarReqModel(req.body))
    
        .then( ()=>{
            respuestasHttp.exito(req, res, "Contraseña actualizada con exito", 200)
        })
        .catch( err =>{
            respuestasHttp.error(req, res, err, "Error al actualizar la contraseña", 400)
        })
    })
    
    router.delete("/:id", (req, res)=>{
    
        const username="camilo129"
        usuarioServicio.eliminarUsuario(req.params.id, username)
        .then(()=>{
            respuestasHttp.exito(req, res, "usuario eliminado con exito", 200)
        })
        .catch( err=>{
            respuestasHttp.error(req, res,err, "No se pudo eliminar el usuario",  400)
        })
    
    })

router.get("/misusuarios", (req, res)=>{

    const username= "camilo129"
    usuarioServicio.leerMisusuarios(username)
    .then(array=>{
        let losusuarios=[]
        array.forEach(usuario => {
            losusuarios.push(new usuarioDatosResModel(usuario))   
        })
        respuestasHttp.exito(req, res, losusuarios, 200)
    })
    .catch(err=>{
        respuestasHttp.error(req, res, err, "Error al leer mis usuarios", 500)
    })
})

router.get("/misusuarios", (req, res)=>{

    const username= "camilo129"
    usuarioServicio.leerMisusuarios(username)
    .then(array=>{
        let losusuarios=[]
        array.forEach(usuario => {
            losusuarios.push(new usuarioDatosResModel(usuario))   
        })
        respuestasHttp.exito(req, res, losusuarios, 200)
    })
    .catch(err=>{
        respuestasHttp.error(req, res, err, "Error al leer mis usuarios", 500)
    })
})

export default router