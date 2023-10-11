import pagoRepositorio from "../db/repositorios/pagoRepositorio.js"
import crypto from "crypto"
import sucursalRepositorio from "../db/repositorios/sucursalRepositorio.js"

const crearPago = (pago)=>{

    return new Promise( async(resolver, rechazar)=>{
        if(!pago.nombre || !pago.idSucursal ){
            rechazar("Datos Incorrectos")
        }
        
        const sucursal= await sucursalRepositorio.detalle(pago.idSucursal)


        const isucursal= sucursal[0]

        pago.idPago= crypto.randomUUID()
        pago.sucursalEntity= isucursal

        await pagoRepositorio.crear(pago)
        resolver(pago)
    })
}

const leerPago = ()=>{

    return new Promise ((resolver ,rechazar)=>{
        resolver(pagoRepositorio.leer())
    })

}

const detallePago= (id)=>{
    return new Promise ((resolver ,rechazar)=>{
        resolver(pagoRepositorio.detalle(id))
})
}

const actualizarPago=(id, pago)=>{
    return new Promise (async(resolver ,rechazar)=>{
        if (!pago.nombre) {
            rechazar("Datos incorrectos")
        }

        const pagoDetalle = await pagoRepositorio.detalle(id)

        pagoDetalle.nombre = pago.nombre


        const pagoActualizado= await pagoRepositorio.actualizar(pagoDetalle)

        resolver(pagoActualizado)
    })
}

const eliminarPago= (id, username)=>{
    return new Promise((resolver, rechazar)=>{
        
        // const articuloDetalle= articuloRepositorio.detalle(id)
        // const usuario = usuarioRepositorio.buscarUsername(username)
        // if(articuloDetalle.usuarioEntity.idUsuario != usuario.idUsuario){
        //     rechazar("No se puede realizar esta accion")
        // }
        resolver(pagoRepositorio.eliminar(id))
})
}


export default {crearPago, leerPago, detallePago, actualizarPago, eliminarPago}