import { db } from "../conexionDB.js"

const crear= (banco)=>{
    db.query('INSERT INTO bancos SET ?',{idBanco:banco.idBanco , codigoBanco:banco.codigoBanco,nombre:banco.nombre, numeroCuenta:banco.numeroCuenta, idPago:banco.idPago}, (err, results) => {
        if (err) {
        console.error('Error al crear el banc:', err)
        } else {
        console.log('banco creado con éxito')
        }
    })
}

const leer= ()=>{

    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM bancos', (err, results) => {
            if (err) {
                console.error('Error al obtener los bancos', err)
                reject(err) // Rechaza la promesa en caso de error
            } else {
                console.log('bancos obtenidos con éxito')
                resolve(results) // Resuelve la promesa con los resultados
            }
        })
    })
}

const detalle= (idBanco)=>{

    return new Promise((resolve, reject) => {

        db.query('SELECT * FROM bancos WHERE idBanco = ?', [idBanco], (err, results) => {
            if (err) {
                console.error('Error al obtener el banco', err)
                reject(err)
            }    
            if(results.length === 0){
            console.error('No se encontro ningun banco', err)
                reject(err)
            } else {
                console.log('banco obtenido con éxito')
                resolve(results)
            }
        })
    })
}

const actualizar = (bancoDetalle) => {

    return new Promise((resolve, reject) => {
        
        if (Array.isArray(bancoDetalle) && bancoDetalle.length > 0) {
            const primerElemento = bancoDetalle[0] // Obtenemos el primer elemento (el objeto RowDataPacket)
            const idBanco = primerElemento.idBanco
            
            if (idBanco) {
                
                db.query('UPDATE bancos SET nombre = ? WHERE idBanco = ?', [bancoDetalle.nombre, idBanco], (err, results) => {
                    if (err) {
                        console.error('Error al actualizar el banco', err)
                        reject(err)
                    }
                    if (results.length === 0) {
                        console.error('No se encontró ningun banco para actualizar', err)
                        reject(err)
                    } else {
                        db.query('SELECT * FROM bancos WHERE idBanco = ?', [idBanco], (err, results) => {
                            
                            if (err) {
                                console.error('Error al obtener el banco', err)
                                reject(err)
                                
                            } else {
                                console.log('banco obtenido con éxito')
                                resolve(results) 
                            }
                        })
                    }
                }) 
                } else {
                    console.log("idBanco no está definida en el objeto RowDataPacket.")
                }
            } else {
                console.log("bancoDetalle no es un array válido o está vacío.")
            }
    })
}







const eliminar = (id) => {
    return new Promise((resolve, reject) => {

        db.query('DELETE FROM bancos WHERE idBanco = ?', [id], (err, results) => {
            if (err) {
                console.error('Error al eliminar el banco', err)
                reject(err)
            }    
            if(results.length === 0){
            console.error('No se encontro ningun banco', err)
                reject(err)
            } else {
                console.log('banco eliminado con éxito')
                resolve(results)
            }
        })
    })
}


export default {crear, leer, detalle, actualizar, eliminar}
