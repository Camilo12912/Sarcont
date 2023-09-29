import articuloRepositorio from "../db/repositorios/articuloRepositorio.js"
import usuarioRepositorio from "../db/repositorios/usuarioRepositorio.js"
import pucRepositorio from "../db/repositorios/pucRepositorio.js"
import crypto from "crypto"
import sucursalRepositorio from "../db/repositorios/sucursalRepositorio.js"

const crearArticulo = (articulo, username)=>{

    return new Promise( async(resolver, rechazar)=>{
        if(!articulo.nombre || !articulo.tarifa || !articulo.codigo ){
            rechazar("Datos Incorrectos")
        }
        
        const puc= await pucRepositorio.detalle(articulo.codigo)
        const sucursal= await sucursalRepositorio.detalle(articulo.idSucursal)
        const usuario= await usuarioRepositorio.buscarUsername(username)

        const ipuc= puc[0]
        const isucursal= sucursal[0]

        articulo.idArticulo= crypto.randomUUID()
        articulo.usuarioEntity= usuario
        articulo.pucEntity= ipuc
        articulo.sucursalEntity= isucursal

        await articuloRepositorio.crear(articulo)
        resolver(articulo)
    })
}

const leerArticulo = ()=>{

    return new Promise ((resolver ,rechazar)=>{
        resolver(articuloRepositorio.leer())
    })

}

const detalleArticulo= (id)=>{
    return new Promise ((resolver ,rechazar)=>{
        resolver(articuloRepositorio.detalle(id))
})
}

const actualizarArticulo=(id, articulo)=>{
    return new Promise (async(resolver ,rechazar)=>{
        if (!articulo.nombre, !articulo.tarifa, !articulo.codigo) {
            rechazar("Datos incorrectos")
        }

        const articuloDetalle = await articuloRepositorio.detalle(id)

        articuloDetalle.nombre = articulo.nombre
        articuloDetalle.tarifa = articulo.tarifa
        articuloDetalle.codigo = articulo.codigo

        const articuloActualizado= await articuloRepositorio.actualizar(articuloDetalle)

        resolver(articuloActualizado)
    })
}


const eliminarArticulo= (id, username)=>{
    return new Promise((resolver, rechazar)=>{
        
        // const articuloDetalle= articuloRepositorio.detalle(id)
        // const usuario = usuarioRepositorio.buscarUsername(username)
        // if(articuloDetalle.usuarioEntity.idUsuario != usuario.idUsuario){
        //     rechazar("No se puede realizar esta accion")
        // }
        resolver(articuloRepositorio.eliminar(id))
})
}


export default {crearArticulo, leerArticulo, detalleArticulo, actualizarArticulo, eliminarArticulo}