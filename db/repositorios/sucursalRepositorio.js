import { db } from "../conexionDB.js"



const crear= (sucursal)=>{
    db.query('INSERT INTO sucursal SET ?',{idSucursal:sucursal.idSucursal, nombre:sucursal.nombre}, (err, results) => {
        if (err) {
        console.error('Error al crear la sucursal:', err)
        } else {
        console.log('Sucursal creada con éxito')
        }
    })
}

const leer= ()=>{
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM sucursal', (err, results) => {
            if (err) {
                console.error('Error al obtener las sucursales', err)
                reject(err) // Rechaza la promesa en caso de error
            } else {
                console.log('sucursales obtenidas con éxito')
                resolve(results) // Resuelve la promesa con los resultados
                console.log(results)
            }
        })
    })
}


// const detalle= (id)=>{

//     const sucursal= array.find(sucursal=> sucursal.idSucursal == id)
    
//     return sucursal ? sucursal : {}
// }
const detalle= (id)=>{

    return new Promise((resolve, reject) => {

        db.query('SELECT * FROM sucursal WHERE idSucursal = ?', [id], (err, results) => {

            if (err) {
                console.error('Error al obtener la sucursal', err)
                reject(err)
            }    
            if(results.length === 0){
            console.error('No se encontro ninguna sucursal', err)
                reject(err)
            } else {
                console.log('sucursal obtenida con éxito')
                resolve(results)
            }
        })
    })
}

// const eliminar= (idSucursal)=>{

//     const index= array.findIndex(sucursal=> sucursal.idSucursal == idSucursal)
    
//     if(index != -1){

//         array.splice(index, 1)

//     }
// }

const actualizar = (sucursalDetalle) => {

    return new Promise((resolve, reject) => {
        
        if (Array.isArray(sucursalDetalle) && sucursalDetalle.length > 0) {
            const primerElemento = sucursalDetalle[0] // Obtenemos el primer elemento (el objeto RowDataPacket)
            const idSucursal = primerElemento.idSucursal
            
            if (idSucursal) {
                
                db.query('UPDATE sucursal SET nombre = ? WHERE idSucursal = ?', [sucursalDetalle.nombre, idSucursal], (err, results) => {
                    if (err) {
                        console.error('Error al actualizar la sucursal', err)
                        reject(err)
                    }
                    if (results.length === 0) {
                        console.error('No se encontró ninguna sucursal para actualizar', err)
                        reject(err)
                    } else {
                        db.query('SELECT * FROM sucursal WHERE idSucursal = ?', [idSucursal], (err, results) => {
                            
                            if (err) {
                                console.error('Error al obtener la sucursal', err)
                                reject(err)
                                
                            } else {
                                console.log('sucursal obtenida con éxito')
                                resolve(results) 
                            }
                        })
                    }
                })
                } else {
                    console.log("idsucursal no está definida en el objeto RowDataPacket.")
                }
            } else {
                console.log("sucursalDetalle no es un array válido o está vacío.")
            }
    })
}






const eliminar = (id) => {
    return new Promise((resolve, reject) => {

        db.query('DELETE FROM sucursal WHERE idSucursal = ?', [id], (err, results) => {
            if (err) {
                console.error('Error al eliminar la sucursal', err)
                reject(err)
            }    
            if(results.length === 0){
            console.error('No se encontro ninguna sucursal', err)
                reject(err)
            } else {
                console.log('sucursal eliminada con éxito')
                resolve(results)

            }
        })
    })
}

export default {crear, leer, detalle, eliminar, actualizar}