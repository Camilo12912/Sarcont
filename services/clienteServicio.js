import clienteRepositorio from "../db/repositorios/clienteRepositorio.js"
import sucursalRepositorio from "../db/repositorios/sucursalRepositorio.js"
import usuarioRepositorio from "../db/repositorios/usuarioRepositorio.js"
import crypto from "crypto"

const crearCliente = (cliente, username)=>{

    return new Promise(async(resolver, rechazar)=>{
        if(!cliente.nombre || !cliente.tipo || !cliente.documento ){
            rechazar("Datos Incorrectos")
        }
        const sucursal= await sucursalRepositorio.detalle(cliente.idSucursal)
        const usuario= await usuarioRepositorio.buscarUsername(username)

        const isucursal= sucursal[0]

        cliente.idCliente= crypto.randomUUID()
        cliente.sucursalEntity= isucursal
        cliente.usuarioEntity= usuario
        await clienteRepositorio.crear(cliente)
        resolver(cliente)
    })
}

const leerCliente = ()=>{

    return new Promise ((resolver ,rechazar)=>{
        resolver(clienteRepositorio.leer())
        
    })
}

const detalleCliente= (id)=>{
    return new Promise ((resolver ,rechazar)=>{
        resolver(clienteRepositorio.detalle(id))
})
}

const actualizarCliente=(id, cliente)=>{
    return new Promise(async(resolver, rechazar) => {
        if (!cliente.nombre, !cliente.tipo, !cliente.documento) {
            rechazar("Datos incorrectos")
        }

        const clienteDetalle = await clienteRepositorio.detalle(id)

        clienteDetalle.nombre = cliente.nombre
        clienteDetalle.tipo = cliente.tipo
        clienteDetalle.documento = cliente.documento

        const clienteActualizada= await clienteRepositorio.actualizar(clienteDetalle);

        resolver(clienteActualizada)
    })
}


const eliminarCliente= (id, username)=>{
    return  new Promise((resolver, rechazar)=>{
        
        // const clienteDetalle= clienteRepositorio.detalle(id)
        // const usuario = usuarioRepositorio.buscarUsername(username)
        // if(clienteDetalle.usuarioEntity.idUsuario != usuario.idUsuario){
        //     rechazar("No se puede realizar esta accion")
        // }
        resolver(clienteRepositorio.eliminar(id))
})
}
export default {crearCliente, leerCliente, detalleCliente, actualizarCliente, eliminarCliente}