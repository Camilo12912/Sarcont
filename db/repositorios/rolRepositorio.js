import { db } from "../conexionDB.js"

const crear= (rol)=>{
    db.query('INSERT INTO roles SET ?',{idRol:rol.idRol ,nombre:rol.nombre}, (err, results) => {
        if (err) {
        console.error('Error al crear el rol:', err)
        } else {
        console.log('rol creado con éxito')
        }
    })
}


const leer= ()=>{

    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM roles', (err, results) => {
            if (err) {
                console.error('Error al obtener los roles', err)
                reject(err) // Rechaza la promesa en caso de error
            } else {
                console.log('roles obtenidos con éxito')
                resolve(results) // Resuelve la promesa con los resultados
            }
        })
    })
}

const detalle= (idRol)=>{

    return new Promise((resolve, reject) => {

        db.query('SELECT * FROM roles WHERE idRol = ?', [idRol], (err, results) => {
            if (err) {
                console.error('Error al obtener el rol', err)
                reject(err)
            }    
            if(results.length === 0){
            console.error('No se encontro ningun rol', err)
                reject(err)
            } else {
                console.log('rol obtenido con éxito')
                resolve(results)
            }
        })
    })
}

const actualizar = (rolDetalle) => {

    return new Promise((resolve, reject) => {
        
        if (Array.isArray(rolDetalle) && rolDetalle.length > 0) {
            const primerElemento = rolDetalle[0] // Obtenemos el primer elemento (el objeto RowDataPacket)
            const idRol = primerElemento.idRol
            
            if (idRol) {
                
                db.query('UPDATE roles SET nombre = ? WHERE idRol = ?', [rolDetalle.nombre, idRol], (err, results) => {
                    if (err) {
                        console.error('Error al actualizar el rol', err)
                        reject(err)
                    }
                    if (results.length === 0) {
                        console.error('No se encontró ningun rol para actualizar', err)
                        reject(err)
                    } else {
                        db.query('SELECT * FROM roles WHERE idRol = ?', [idRol], (err, results) => {
                            
                            if (err) {
                                console.error('Error al obtener el rol', err)
                                reject(err)
                                
                            } else {
                                console.log('rol obtenido con éxito')
                                resolve(results) 
                            }
                        })
                    }
                })
                } else {
                    console.log("idrol no está definida en el objeto RowDataPacket.")
                }
            } else {
                console.log("rolDetalle no es un array válido o está vacío.")
            }
    })
}






const eliminar = (id) => {
    return new Promise((resolve, reject) => {

        db.query('DELETE FROM roles WHERE idRol = ?', [id], (err, results) => {
            if (err) {
                console.error('Error al eliminar el rol', err)
                reject(err)
            }    
            if(results.length === 0){
            console.error('No se encontro ningun rol', err)
                reject(err)
            } else {
                console.log('rol eliminado con éxito')
                resolve(results)
            }
        })
    })
}


export default {crear, leer, detalle, actualizar, eliminar}
