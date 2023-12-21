import { db } from "../conexionDB.js"



const crear= (usuario)=>{
    db.query('INSERT INTO usuarios SET ?',{idUsuario:usuario.idUsuario ,nombre:usuario.nombre, apellido:usuario.apellido, email:usuario.email, username:usuario.username, passwordEncriptada:usuario.passwordEncriptada, idRol:usuario.idRol}, (err, results) => {
        if (err) {
        console.error('Error al crear el usuario:', err)
        } else {
        console.log('usuario creado con éxito')
        }
    })
}

const buscarUsername= (username)=>{

    return new Promise((resolve, reject) => {

        db.query('SELECT * FROM usuarios WHERE username = ?', [username], (err, results) => {
            
            if (err) {
            console.error('Error al obtener el username', err)
            reject(err)
            } 
            else if (results.length === 0){
            console.log('No se encontró ningun username')
            resolve(null)
            } 
            else{
            console.error('Este username ya se encuentra registrado')
            resolve(results[0]) 
        }
        })
        })
    }

    const buscarEmail = (email) => {

        return new Promise((resolve, reject) => {
    
          db.query('SELECT * FROM usuarios WHERE email = ?', [email], (err, results) => {
                
                if (err) {
                    console.error('Error al obtener el email', err)
                    reject(err)
        
                } 
                else if (results.length === 0){
                console.log('No se encontró ningun email')
                resolve(null)
                }
                else{
                console.error('Este email ya se encuentra registrado')
                resolve(results[0]) 
                }
            })
        })
    }

    const leer= ()=>{
        return new Promise((resolve, reject) => {
            db.query('SELECT usuarios.*, roles.idRol AS idRol, roles.nombre AS Rol FROM usuarios LEFT JOIN roles ON usuarios.idRol = roles.idRol',(err, results) => {
                if (err) {
                    console.error('Error al obtener las sucursales', err)
                    reject(err) // Rechaza la promesa en caso de error
                } else {
                    console.log('usuarios leidos con éxito')
                    resolve(results) // Resuelve la promesa con los resultados
                    console.log(results)
                }
            })
        })
    }

    
    const detalle= (id)=>{
    
        return new Promise((resolve, reject) => {
    
            db.query('SELECT usuarios.*, sucursal.idSucursal, sucursal.nombre AS sucursalNombre,roles.idRol AS idRol, roles.nombre AS Rol FROM usuarios LEFT JOIN sucursal ON usuarios.idSucursal = sucursal.idSucursal LEFT JOIN roles ON usuarios.idRol = roles.idRol WHERE idUsuario = ?', [id], (err, results) => {
                if (err) {
                    console.error('Error al obtener el usuario', err)
                    reject(err)
                }    
                if(results.length === 0){
                console.error('No se encontro ningun usuario', err)
                    reject(err)
                } else {
                    console.log('usuario obtenido con éxito')
                    resolve(results)
                }
            })
        })
    }
    
    const actualizar = (usuarioDetalle) => {
    
        return new Promise((resolve, reject) => {
            
            if (Array.isArray(usuarioDetalle) && usuarioDetalle.length > 0) {
                const primerElemento = usuarioDetalle[0] // Obtenemos el primer elemento (el objeto RowDataPacket)
                const idUsuario = primerElemento.idUsuario
                
                if (idUsuario) {
                    
                    db.query('UPDATE usuarios SET nombre = ?, apellido = ?, email = ?, username = ? WHERE idUsuario = ?', [usuarioDetalle.nombre, usuarioDetalle.apellido, usuarioDetalle.email, usuarioDetalle.username, idUsuario], (err, results) => {
                        if (err) {
                            console.error('Error al actualizar el usuario', err)
                            reject(err)
                        }
                        if (results.length === 0) {
                            console.error('No se encontró ningun usuario para actualizar', err)
                            reject(err)
                        } else {
                            db.query('SELECT usuarios.*, sucursal.idSucursal, sucursal.nombre AS sucursalNombre,roles.idRol AS idRol, roles.nombre AS Rol FROM usuarios LEFT JOIN sucursal ON usuarios.idSucursal = sucursal.idSucursal LEFT JOIN roles ON usuarios.idRol = roles.idRol WHERE idUsuario = ?', [idUsuario], (err, results) => {
                                
                                if (err) {
                                    console.error('Error al obtener el usuario', err)
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
                        console.log("idUsuario no está definida en el objeto RowDataPacket.")
                    }
                } else {
                    console.log("usuarioDetalle no es un array válido o está vacío.")
                }
        })
    }
    
    const actualizarPassword=(usuarioDetalle)=>{
        return new Promise((resolve, reject)=>{
            
            if (Array.isArray(usuarioDetalle) && usuarioDetalle.length > 0) {
                const primerElemento = usuarioDetalle[0] // Obtenemos el primer elemento (el objeto RowDataPacket)
                const idUsuario = primerElemento.idUsuario
                
            db.query('UPDATE usuarios SET passwordEncriptada = ? WHERE idUsuario = ?', [usuarioDetalle.passwordEncriptada, idUsuario], (err, results) => {
            


            if(err){
                console.error('Error al actualizar la password', err)
                reject(err)
            }
            if(results.affectedRows === 0){
                console.error('No se encontró ningún usuario con el ID especificado', err)
                reject(err)
            }
            else{
                console.log("Password actualizada con éxito")
                resolve(results)
            }
        })
        }})
        }


    
    const eliminar = (id) => {
        return new Promise((resolve, reject) => {
    
            db.query('DELETE FROM usuarios WHERE idUsuario = ?', [id], (err, results) => {
                if (err) {
                    console.error('Error al eliminar el usuario', err)
                    reject(err)
                }    
                if(results.length === 0){
                console.error('No se encontro ningun usuario', err)
                    reject(err)
                } else {
                    console.log('usuario eliminado con éxito')
                    resolve(results)
                }
            })
        })
    }

export default {crear, buscarEmail, buscarUsername, leer, actualizar,detalle,eliminar, actualizarPassword}
