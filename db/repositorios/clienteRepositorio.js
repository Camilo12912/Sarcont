import { db } from "../conexionDB.js"



const crear= (cliente)=>{
    console.log(cliente.idUsuario)
    db.query('INSERT INTO terceros SET ?',{idCliente:cliente.idCliente, fechaCreado:cliente.fechaCreado, nombres:cliente.nombre, apellidos:cliente.apellido, nombreTributario:cliente.nombreTributario, tipo:cliente.tipo, tipoDocumento:cliente.tipoDocumento, documento:cliente.documento, email:cliente.email, ciudad:cliente.ciudad, direccion:cliente.direccion, telefono:cliente.telefono, tipoTercero:cliente.tipoTercero, idSucursal:cliente.idSucursal, idUsuario:cliente.idUsuario}, (err, results) => {
        if (err) {
        console.error('Error al crear el usuario:', err)
        } else {
        console.log('cliente creado con éxito')
        }
    })
}


const leer= ()=>{
    return new Promise((resolve, reject) => {
        db.query('SELECT terceros.*, sucursal.idSucursal, sucursal.nombre AS sucursalNombre, usuarios.username AS usernameUsuario, usuarios.nombre AS nombreUsuario, usuarios.apellido AS apellidoUsuario FROM terceros LEFT JOIN sucursal ON terceros.idSucursal = sucursal.idSucursal LEFT JOIN usuarios ON terceros.idUsuario = usuarios.idUsuario', (err, results) => {
            if (err) {
                console.error('Error al obtener los clientes', err)
                reject(err) // Rechaza la promesa en caso de error
            } else {
                console.log('clientes leidos con éxito')
                resolve(results) // Resuelve la promesa con los resultados
                console.log(results)
            }
        })
    })
}
const detalle= (id)=>{

    return new Promise((resolve, reject) => {

        db.query('SELECT terceros.*, sucursal.idSucursal, sucursal.nombre AS sucursalNombre, usuarios.username AS usernameUsuario, usuarios.nombre AS nombreUsuario, usuarios.apellido AS apellidoUsuario FROM terceros LEFT JOIN sucursal ON terceros.idSucursal = sucursal.idSucursal LEFT JOIN usuarios ON terceros.idUsuario = usuarios.idUsuario WHERE idCliente = ?', [id], (err, results) => {
            if (err) {
                console.error('Error al obtener la sucursal', err)
                reject(err)
            }    
            if(results.length === 0){
            console.error('No se encontro ningun cliente', err)
                reject(err)
            } else {
                console.log('cliente obtenido con éxito')
                resolve(results)
            }
        })
    })
}

const actualizar = (clienteDetalle) => {

    return new Promise((resolve, reject) => {
        
        if (Array.isArray(clienteDetalle) && clienteDetalle.length > 0) {
            const primerElemento = clienteDetalle[0] // Obtenemos el primer elemento (el objeto RowDataPacket)
            const idCliente = primerElemento.idCliente
            
            if (idCliente) {
                
                db.query('UPDATE terceros SET nombre = ?, tipo = ?, documento = ? WHERE idCliente = ?', [clienteDetalle.nombre, clienteDetalle.tipo, clienteDetalle.documento, idCliente], (err, results) => {
                    if (err) {
                        console.error('Error al actualizar el cliente', err)
                        reject(err)
                    }
                    if (results.length === 0) {
                        console.error('No se encontró ningun cliente para actualizar', err)
                        reject(err)
                    } else {
                        db.query('SELECT terceros.*, sucursal.idSucursal, sucursal.nombre AS sucursalNombre, usuarios.username AS usernameUsuario, usuarios.nombre AS nombreUsuario, usuarios.apellido AS apellidoUsuario FROM terceros LEFT JOIN sucursal ON terceros.idSucursal = sucursal.idSucursal LEFT JOIN usuarios ON terceros.idUsuario = usuarios.idUsuario WHERE idCliente = ?', [idCliente], (err, results) => {
                            
                            if (err) {
                                console.error('Error al obtener el cliente', err)
                                reject(err)
                                
                            } else {
                                console.log('sucursal obtenida con éxito')
                                resolve(results) 
                                console.log(results)
                            }
                        })
                    }
                })
                } else {
                    console.log("idCliente no está definida en el objeto RowDataPacket.")
                }
            } else {
                console.log("clienteDetalle no es un array válido o está vacío.")
            }
    })
}


const eliminar = (id) => {
    return new Promise((resolve, reject) => {

        db.query('DELETE FROM terceros WHERE idCliente = ?', [id], (err, results) => {
            if (err) {
                console.error('Error al eliminar el cliente', err)
                reject(err)
            }    
            if(results.length === 0){
            console.error('No se encontro ningun cliente', err)
                reject(err)
            } else {
                console.log('cliente eliminado con éxito')
                resolve(results)
            }
        })
    })
}

    const misClientes= (idUsuario)=>{
        const clientes= array.filter(cliente => cliente.usuarioEntity.idUsuario == idUsuario)
        
        return clientes ? clientes : []
    
}


export default {crear, leer, detalle, actualizar, eliminar, misClientes}