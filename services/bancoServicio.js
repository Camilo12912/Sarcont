import bancoRepositorio from "../db/repositorios/bancoRepositorio.js"
import crypto from "crypto"
import pagoRepositorio from "../db/repositorios/pagoRepositorio.js"

const crearBanco = (banco)=>{

    return new Promise( async(resolver, rechazar)=>{
        if( !banco.codigoBanco||!banco.nombre || !banco.numeroCuenta || !banco.idPago ){
            rechazar("Datos Incorrectos")
        }
        
        const pago= await pagoRepositorio.detalle(banco.idPago)


        const ipago= pago[0]

        banco.idBanco= crypto.randomUUID()
        banco.pagoEntity= ipago

        await bancoRepositorio.crear(banco)
        resolver(banco)
    })
}

const leerBanco = ()=>{

    return new Promise ((resolver ,rechazar)=>{
        resolver(bancoRepositorio.leer())
    })

}

const detalleBanco= (id)=>{
    return new Promise ((resolver ,rechazar)=>{
        resolver(bancoRepositorio.detalle(id))
})
}

const actualizarBanco=(id, banco)=>{
    return new Promise (async(resolver ,rechazar)=>{
        if (!banco.codigoBanco||!banco.nombre || !banco.numeroCuenta) {
            rechazar("Datos incorrectos")
        }

        const bancoDetalle = await bancoRepositorio.detalle(id)

        bancoDetalle.nombre = banco.nombre


        const bancoActualizado= await bancoRepositorio.actualizar(bancoDetalle)

        resolver(bancoActualizado)
    })
}

const eliminarBanco= (id, username)=>{
    return new Promise((resolver, rechazar)=>{
        
        // const articuloDetalle= articuloRepositorio.detalle(id)
        // const usuario = usuarioRepositorio.buscarUsername(username)
        // if(articuloDetalle.usuarioEntity.idUsuario != usuario.idUsuario){
        //     rechazar("No se puede realizar esta accion")
        // }
        resolver(bancoRepositorio.eliminar(id))
})
}


export default {crearBanco, leerBanco, detalleBanco, actualizarBanco, eliminarBanco}