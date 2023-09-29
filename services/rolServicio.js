import rolRepositorio from "../db/repositorios/rolRepositorio.js"
import crypto from "crypto"

const crearRol = (rol, username)=>{

    return new Promise((resolver, rechazar)=>{
        if(!rol.nombre ){
            rechazar("Datos Incorrectos")
        }else{

        
        // const usuario= usuarioRepositorio.buscarUsername(username)
        rol.idRol= crypto.randomUUID()
        // rol.usuarioEntity= usuario
        rolRepositorio.crear(rol)
        resolver(rol)
        }
    })
}


const leerRol = ()=>{

    return new Promise ((resolver ,rechazar)=>{
        resolver(rolRepositorio.leer())

    })
}

const detalleRol= (idRol)=>{
    return new Promise ((resolver ,rechazar)=>{
        resolver(rolRepositorio.detalle(idRol))
})
}

const actualizarRol = (id, rol) => {
    return new Promise(async(resolver, rechazar) => {
        if (!rol.nombre) {
            rechazar("Datos incorrectos")
        }

        const rolDetalle = await rolRepositorio.detalle(id)

        rolDetalle.nombre = rol.nombre
        
        const rolActualizada= await rolRepositorio.actualizar(rolDetalle)

        resolver(rolActualizada)
    })
}

  // const usuario = usuarioRepositorio.buscarUsername(username)
        // if(clienteDetalle.usuarioEntity.idUsuario != usuario.idUsuario){
        //     rechazar("No se puede realizar esta accion")
        // }
        
const eliminarRol= (id)=>{
    return new Promise((resolver, rechazar)=>{
        
        const rolDetalle= rolRepositorio.detalle(id)
        // const usuario = usuarioRepositorio.buscarUsername(username)
        // if(rolDetalle.usuarioEntity.idUsuario != usuario.idUsuario){
        //     rechazar("No se puede realizar esta accion")
        // }
        resolver(rolRepositorio.eliminar(id))
})
}

export default {crearRol,leerRol, detalleRol, actualizarRol, eliminarRol}