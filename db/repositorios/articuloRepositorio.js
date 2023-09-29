import { db } from "../conexionDB.js"



const crear= (articulo)=>{
    db.query('INSERT INTO articulos SET ?',{idArticulo:articulo.idArticulo ,nombre:articulo.nombre, tarifa:articulo.tarifa, codigo:articulo.codigo, idSucursal:articulo.idSucursal}, (err, results) => {
        if (err) {
        console.error('Error al crear la sucursal:', err)
        } else {
        console.log('Sucursal creada con éxito')
        }
    })
}


const leer= ()=>{
    return new Promise((resolve, reject) => {
        db.query('SELECT articulos.*, sucursal.idSucursal, sucursal.nombre AS sucursalNombre,puc.codigo AS pucCodigo, puc.denominacion AS pucDenominacion, puc.clasificacion AS pucClasificacion FROM articulos LEFT JOIN sucursal ON articulos.idSucursal = sucursal.idSucursal LEFT JOIN puc ON articulos.codigo = puc.codigo', (err, results) => {
            if (err) {
                console.error('Error al obtener las sucursales', err)
                reject(err) // Rechaza la promesa en caso de error
            } else {
                console.log('clientes leidos con éxito')
                resolve(results) // Resuelve la promesa con los resultados
            }
        })
    })
}

const detalle= (id)=>{

    return new Promise((resolve, reject) => {

        db.query('SELECT articulos.*, sucursal.idSucursal, sucursal.nombre AS sucursalNombre,puc.codigo AS pucCodigo, puc.denominacion AS pucDenominacion, puc.clasificacion AS pucClasificacion FROM articulos LEFT JOIN sucursal ON articulos.idSucursal = sucursal.idSucursal LEFT JOIN puc ON articulos.codigo = puc.codigo WHERE idArticulo = ?', [id], (err, results) => {
            if (err) {
                console.error('Error al obtener la sucursal', err)
                reject(err)
            }    
            if(results.length === 0){
            console.error('No se encontro ningun articulo', err)
                reject(err)
            } else {
                console.log('articulo obtenido con éxito')
                resolve(results)
            }
        })
    })
}

const actualizar = (articuloDetalle) => {

    return new Promise((resolve, reject) => {
        
        if (Array.isArray(articuloDetalle) && articuloDetalle.length > 0) {
            const primerElemento = articuloDetalle[0] // Obtenemos el primer elemento (el objeto RowDataPacket)
            const idArticulo = primerElemento.idArticulo
            
            if (idArticulo) {
                
                db.query('UPDATE articulos SET nombre = ?, tarifa = ?, codigo = ? WHERE idArticulo = ?', [articuloDetalle.nombre, articuloDetalle.tarifa, articuloDetalle.codigo, idArticulo], (err, results) => {
                    if (err) {
                        console.error('Error al actualizar el cliente', err)
                        reject(err)
                    }
                    if (results.length === 0) {
                        console.error('No se encontró ningun cliente para actualizar', err)
                        reject(err)
                    } else {
                        db.query('SELECT articulos.*, sucursal.idSucursal, sucursal.nombre AS sucursalNombre,puc.codigo AS pucCodigo, puc.denominacion AS pucDenominacion, puc.clasificacion AS pucClasificacion FROM articulos LEFT JOIN sucursal ON articulos.idSucursal = sucursal.idSucursal LEFT JOIN puc ON articulos.codigo = puc.codigo WHERE idArticulo = ?', [idArticulo], (err, results) => {
                            
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

        db.query('DELETE FROM articulos WHERE idArticulo = ?', [id], (err, results) => {
            if (err) {
                console.error('Error al eliminar el articulo', err)
                reject(err)
            }    
            if(results.length === 0){
            console.error('No se encontro ningun articulo', err)
                reject(err)
            } else {
                console.log('articulo eliminado con éxito')
                resolve(results)
            }
        })
    })
}

    const misArticulos= (idUsuario)=>{
        const articulos= array.filter(articulo => articulo.usuarioEntity.idUsuario == idUsuario)
        
        return articulos ? articulos : []
    
}


export default {crear, leer, detalle, actualizar, eliminar, misArticulos}