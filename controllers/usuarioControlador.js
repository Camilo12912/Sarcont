import respuestasHttp from "../utils/respuestasHttp.js"
import usuarioServicio from "../services/usuarioServicio.js"
import { UsuarioCrearReqModel, UsuarioDatosResModel, UsuarioActualizarReqModel, PasswordActualizarReqModel } from "../models/usuarioModel.js"



const postUsuario= (req, res)=>{
    
        usuarioServicio.crearUsuario(new UsuarioCrearReqModel(req.body))
        .then(usuario =>{
            respuestasHttp.exito(req, res, new UsuarioDatosResModel(usuario), 201)
        })
        .catch(err=>{
            respuestasHttp.error(req, res, err, "Error al crear el usuario", 400)
    })
}

const getUsuario= (req, res)=>{
    usuarioServicio.leerUsuario(req.user.sub)

    .then( usuario =>{
        respuestasHttp.exito(req, res, new UsuarioDatosResModel(usuario), 200)
    })
    .catch(err=>{
        respuestasHttp.error(req, res, err, "Error al leer el usuario", 500)
    })
}

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

const getDetalleUsuario= (req, res)=>{
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
    }
    

    const putUsuario= (req, res)=>{
    
        usuarioServicio.actualizarUsuario( req.params.id , new UsuarioActualizarReqModel(req.body ), req.user.sub )
        .then(usuario=> {
            const usuarioJSON = usuario[0]
            respuestasHttp.exito(req, res, new UsuarioDatosResModel(usuarioJSON), 200)
        })
        .catch(err=> {
            respuestasHttp.error(req, res, err, "Error al actualizar el usuario", 400)
            console.log(err)
        })
    }

    const putPasswordUsuario= (req, res)=>{

        usuarioServicio.actualizarPassword(req.params.id, new PasswordActualizarReqModel(req.body), req.user.sub)
    
        .then( ()=>{
            respuestasHttp.exito(req, res, "Contraseña actualizada con exito", 200)
        })
        .catch( err =>{
            respuestasHttp.error(req, res, err, "Error al actualizar la contraseña", 400)
        })
    }
    
    const deleteUsuario= (req, res)=>{
    
        usuarioServicio.eliminarUsuario(req.params.id, req.user.sub)
        .then(()=>{
            respuestasHttp.exito(req, res, "usuario eliminado con exito", 200)
        })
        .catch( err=>{
            respuestasHttp.error(req, res,err, "No se pudo eliminar el usuario",  400)
        })
    
    }

// const getMisClientes = (req, res)=>{


//     usuarioServicio(req.user.sub)
//     .then(array=>{
//         let losClientes=[]
//         array.forEach(cliente => {
//             losClientes.push(new UsuarioDatosResModel(cliente))   
//         })
//         respuestasHttp.exito(req, res, losClientes, 200)
//     })
//     .catch(err=>{
//         respuestasHttp.error(req, res, err, "Error al leer mis usuarios", 500)
//     })
// }

const postSignin= (req, res)=>{

    if(!req.user.error){
        respuestasHttp.signin(req, res, "", 200)
    }else{
        respuestasHttp.error(req, res, "", req.user.error, 403)
    }
}

export default {postUsuario, getUsuario, getDetalleUsuario, putUsuario, putPasswordUsuario, deleteUsuario, postSignin}