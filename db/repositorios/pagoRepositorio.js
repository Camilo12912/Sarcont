import { db } from "../conexionDB.js"

const crear= (pago)=>{
    db.query('INSERT INTO pagos SET ?',{idPago:pago.idPago ,nombre:pago.nombre, idSucursal:pago.idSucursal}, (err, results) => {
        if (err) {
        console.error('Error al crear el pago:', err)
        } else {
        console.log('rol creado con éxito')
        }
    })
}

const leer= ()=>{

    return new Promise((resolve, reject) => {
        db.query('SELECT Pagos.*, sucursal.idSucursal, sucursal.nombre AS sucursalNombre FROM pagos LEFT JOIN sucursal ON pagos.idSucursal = sucursal.idSucursal', (err, results) => {
            if (err) {
                console.error('Error al obtener los pagos', err)
                reject(err) // Rechaza la promesa en caso de error
            } else {
                console.log('pagos obtenidos con éxito')
                resolve(results) // Resuelve la promesa con los resultados
            }
        })
    })
}

const detalle= (idPago)=>{

    return new Promise((resolve, reject) => {

        db.query('SELECT Pagos.*, sucursal.idSucursal, sucursal.nombre AS sucursalNombre FROM pagos LEFT JOIN sucursal ON pagos.idSucursal = sucursal.idSucursal WHERE idPago = ?', [idPago], (err, results) => {
            if (err) {
                console.error('Error al obtener el pago', err)
                reject(err)
            }    
            if(results.length === 0){
            console.error('No se encontro ningun pago', err)
                reject(err)
            } else {
                console.log('pago obtenido con éxito')
                resolve(results)
            }
        })
    })
}

const actualizar = (pagoDetalle) => {

    return new Promise((resolve, reject) => {
        
        if (Array.isArray(pagoDetalle) && pagoDetalle.length > 0) {
            const primerElemento = pagoDetalle[0] // Obtenemos el primer elemento (el objeto RowDataPacket)
            const idPago = primerElemento.idPago
            
            if (idPago) {
                
                db.query('UPDATE pagos SET nombre = ? WHERE idPago = ?', [pagoDetalle.nombre, idPago], (err, results) => {
                    if (err) {
                        console.error('Error al actualizar el pago', err)
                        reject(err)
                    }
                    if (results.length === 0) {
                        console.error('No se encontró ningun pago para actualizar', err)
                        reject(err)
                    } else {
                        db.query('SELECT Pagos.*, sucursal.idSucursal, sucursal.nombre AS sucursalNombre FROM pagos LEFT JOIN sucursal ON pagos.idSucursal = sucursal.idSucursal WHERE idPago = ?', [idPago], (err, results) => {
                            
                            if (err) {
                                console.error('Error al obtener el pago', err)
                                reject(err)
                                
                            } else {
                                console.log('pago obtenido con éxito')
                                resolve(results) 
                            }
                        })
                    }
                }) 
                } else {
                    console.log("idPago no está definida en el objeto RowDataPacket.")
                }
            } else {
                console.log("pagoDetalle no es un array válido o está vacío.")
            }
    })
}






const eliminar = (id) => {
    return new Promise((resolve, reject) => {

        db.query('DELETE FROM pagos WHERE idPago = ?', [id], (err, results) => {
            if (err) {
                console.error('Error al eliminar el pago', err)
                reject(err)
            }    
            if(results.length === 0){
            console.error('No se encontro ningun pago', err)
                reject(err)
            } else {
                console.log('pago eliminado con éxito')
                resolve(results)
            }
        })
    })
}


export default {crear, leer, detalle, actualizar, eliminar}
