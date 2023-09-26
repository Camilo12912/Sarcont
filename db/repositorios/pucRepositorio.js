import { db } from "../conexionDB.js"

const leer= ()=>{

    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM puc', (err, results) => {
            if (err) {
                console.error('Error al obtener el plan unico de cuentas', err)
                reject(err) // Rechaza la promesa en caso de error
            } else {
                console.log('PUC obtenido con éxito')
                resolve(results) // Resuelve la promesa con los resultados
            }
        })
    })
}

const detalle= (codigo)=>{

    return new Promise((resolve, reject) => {

        db.query('SELECT * FROM puc WHERE codigo = ?', [codigo], (err, results) => {
            if (err) {
                console.error('Error al obtener la sucursal', err)
                reject(err)
            }    
            if(results.length === 0){
            console.error('No se encontro ningun PUC', err)
                reject(err)
            } else {
                console.log('PUC obtenido con éxito')
                resolve(results)
            }
        })
    })
}

export default {leer, detalle}
