import usuarioRepositorio from "../db/repositorios/usuarioRepositorio.js"
import clienteRepositorio from "../db/repositorios/clienteRepositorio.js"
import crypto from "crypto"
import bcrypt from "bcrypt"
import articuloRepositorio from "../db/repositorios/articuloRepositorio.js"


const crearUsuario=(usuario)=>{
    return new Promise((resolver, rechazar)=>{
        if(!usuario.nombre || !usuario.email || !usuario.username || !usuario.password ){
            rechazar("Datos incorrectos")
        }
        if(usuarioRepositorio.buscarEmail(usuario.email) != null){
            rechazar(`El email ${usuario.email} ya existe`)
        }
        if(usuarioRepositorio.buscarUsername(usuario.username) !=null){
            rechazar(`El username ${usuario.username} ya existe`)
        }

        usuario.idUsuario= crypto.randomUUID()
        usuario.passwordEncriptada= bcrypt.hashSync(usuario.password, 10)

        usuarioRepositorio.crear(usuario)

        resolver(usuarioRepositorio.buscarUsername(usuario.username))

    })
}

    const leerUsuario= (username)=>{

        return new Promise((resolver, rechazar)=>{

            const usuario= usuarioRepositorio.buscarUsername(username)

            if(usuario == null){
                rechazar("No se encuentra el usuario")
            }

            resolver(usuario)

        })

    }

    const leerMisClientes= (username)=>{
        return new Promise((resolver, rechazar)=>{

            const usuario= usuarioRepositorio.buscarUsername(username)

            if(usuario==null){
                rechazar("No se encuentra el usuario")
            }
            resolver(clienteRepositorio.misClientes(usuario.idUsuario))
        })
    }

    const leerMisArticulos= (username)=>{
        return new Promise((resolver, rechazar)=>{

            const usuario= usuarioRepositorio.buscarUsername(username)

            if(usuario==null){
                rechazar("No se encuentra el usuario")
            }
            resolver(articuloRepositorio.misArticulos(usuario.idUsuario))
        })
    }
export default{leerUsuario , crearUsuario, leerMisClientes, leerMisArticulos}