import usuarioRepositorio from "../db/repositorios/usuarioRepositorio.js"
import clienteRepositorio from "../db/repositorios/clienteRepositorio.js"
import crypto from "crypto"
import bcrypt from "bcrypt"


const crearUsuario=(usuario)=>{
    return new Promise(async(resolver, rechazar)=>{
        if(!usuario.nombre ||!usuario.apellido || !usuario.email || !usuario.username || !usuario.password ){
            rechazar("Datos incorrectos")
        }
        else if(await usuarioRepositorio.buscarEmail(usuario.email) != null){
            rechazar(`El email ${usuario.email} ya existe`)
        }
        else if(await usuarioRepositorio.buscarUsername(usuario.username) !=null){
            rechazar(`El username ${usuario.username} ya existe`)
        }
        else{

        usuario.idUsuario= crypto.randomUUID()
        usuario.passwordEncriptada= bcrypt.hashSync(usuario.password, 10)
        usuarioRepositorio.crear(usuario)

        resolver(usuario)
        }
    })
}

    // const leerUsuario= (username)=>{

    //     return new Promise((resolver, rechazar)=>{

    //         const usuario= usuarioRepositorio.buscarUsername(username)

    //         if(usuario == null){
    //             rechazar("No se encuentra el usuario")
    //         }

    //         resolver(usuario)

    //     })

    // }

    const leerUsuario = (username)=>{

        return new Promise ((resolver ,rechazar)=>{
            
            usuarioRepositorio.buscarUsername(username)
            .then( usuario=>{
                if(usuario== null){
                    rechazar("No se encontro el usuario")
                }
                
            resolver(usuario)
            console.log(usuario)
        })
    
    })
}

    const detalleUsuario= (id)=>{
        return new Promise ((resolver ,rechazar)=>{
            resolver(usuarioRepositorio.detalle(id))
    })
    }
    
    const actualizarUsuario=(id, usuario)=>{
        return new Promise (async(resolver ,rechazar)=>{
            if (!usuario.nombre, !usuario.apellido, !usuario.email, !usuario.username) {
                rechazar("Datos incorrectos")
            }
    
            const usuarioDetalle = await usuarioRepositorio.detalle(id)
    
            usuarioDetalle.nombre = usuario.nombre
            usuarioDetalle.apellido = usuario.apellido
            usuarioDetalle.email = usuario.email
            usuarioDetalle.username = usuario.username
    
            const usuarioActualizado= await usuarioRepositorio.actualizar(usuarioDetalle)
    
            resolver(usuarioActualizado)
        })
    }
    
    const actualizarPassword=(id, usuario)=>{
        console.log(usuario)

        return new Promise ( async (resolve, reject)=>{
    
            if(!usuario.newPassword || !usuario.confirPassword){
                reject("Faltan datos")
            }
            else if(usuario.newPassword !== usuario.confirPassword){
                reject("Las contraseñas no coiciden")
            }
            else{
                const usuarioDetalle = await usuarioRepositorio.detalle(id)
                usuarioDetalle.passwordEncriptada= bcrypt.hashSync(usuario.newPassword, 10)
                const passwordActualizada = await usuarioRepositorio.actualizarPassword(usuarioDetalle)
                resolve(passwordActualizada)
            }
        })
    }

    
    const eliminarUsuario= (id, username)=>{
        return new Promise((resolver, rechazar)=>{
            
            // const usuarioDetalle= usuarioRepositorio.detalle(id)
            // const usuario = usuarioRepositorio.buscarUsername(username)
            // if(usuarioDetalle.usuarioEntity.idUsuario != usuario.idUsuario){
            //     rechazar("No se puede realizar esta accion")
            // }
            resolver(usuarioRepositorio.eliminar(id))
    })
    }
    

    // const leerMisClientes= (username)=>{
    //     return new Promise((resolver, rechazar)=>{

    //         const usuario= usuarioRepositorio.buscarUsername(username)

    //         if(usuario==null){
    //             rechazar("No se encuentra el usuario")
    //         }
    //         resolver(clienteRepositorio.misClientes(usuario.idUsuario))
    //     })
    // }

    // const leerMisUsuarios= (username)=>{
    //     return new Promise((resolver, rechazar)=>{

    //         const usuario= usuarioRepositorio.buscarUsername(username)

    //         if(usuario==null){
    //             rechazar("No se encuentra el usuario")
    //         }
    //         resolver(usuarioRepositorio.misUsuarios(usuario.idUsuario))
    //     })
    // }
export default{leerUsuario , crearUsuario,  detalleUsuario, actualizarUsuario, eliminarUsuario, actualizarPassword}