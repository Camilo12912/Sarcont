import sucursalRepositorio from "../db/repositorios/sucursalRepositorio.js"
import usuarioRepositorio from "../db/repositorios/usuarioRepositorio.js"
import crypto from "crypto"

const crearSucursal = (sucursal, username)=>{

    return new Promise((resolver, rechazar)=>{
        if(!sucursal.nombre ){
            rechazar("Datos Incorrectos")
        }else{

        
        // const usuario= usuarioRepositorio.buscarUsername(username)
        sucursal.idSucursal= crypto.randomUUID()
        // sucursal.usuarioEntity= usuario
        sucursalRepositorio.crear(sucursal)
        resolver(sucursal)
        }
    })
}

const leerSucursal = ()=>{

    return new Promise ((resolver ,rechazar)=>{
        resolver(sucursalRepositorio.leer())

    })
}

const detalleSucursal= (id)=>{
    return new Promise ((resolver ,rechazar)=>{
        resolver(sucursalRepositorio.detalle(id))
})
}

// const actualizarSucursal=(id, sucursal)=>{
//     return new Promise ((resolver ,rechazar)=>{
//         if(!sucursal.nombre){
//             rechazar("Datos incorrectos")
//         }
//         const sucursalDetalle = sucursalRepositorio.detalle(id)

//         sucursalDetalle.nombre= sucursal.nombre

//         resolver(sucursalRepositorio.actualizar(sucursalDetalle))
//     })
// }

const actualizarSucursal = (id, sucursal) => {
    return new Promise(async(resolver, rechazar) => {
        if (!sucursal.nombre) {
            rechazar("Datos incorrectos")
        }

        const sucursalDetalle = await sucursalRepositorio.detalle(id)

        sucursalDetalle.nombre = sucursal.nombre;
        
        const sucursalActualizada= await sucursalRepositorio.actualizar(sucursalDetalle);

        resolver(sucursalActualizada)
    })
}

  // const usuario = usuarioRepositorio.buscarUsername(username)
        // if(clienteDetalle.usuarioEntity.idUsuario != usuario.idUsuario){
        //     rechazar("No se puede realizar esta accion")
        // }
        
const eliminarSucursal= (id)=>{
    return new Promise((resolver, rechazar)=>{
        
        const sucursalDetalle= sucursalRepositorio.detalle(id)
        // const usuario = usuarioRepositorio.buscarUsername(username)
        // if(sucursalDetalle.usuarioEntity.idUsuario != usuario.idUsuario){
        //     rechazar("No se puede realizar esta accion")
        // }
        resolver(sucursalRepositorio.eliminar(id))
})
}
export default {crearSucursal, leerSucursal, detalleSucursal, actualizarSucursal, eliminarSucursal}