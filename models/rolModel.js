import { UsuarioDatosResModel } from "./usuarioModel.js"

function RolCrearReqModel(rol){
    this.nombre = rol.nombre
}

function RolDatosResModel(rol){
    this.idRol = rol && rol.idRol ? rol.idRol : null
    this.nombre = rol && rol.nombre ? rol.nombre : null
    // this.idrol = rol.idrol
    // this.nombre= rol.nombre
    // this.usuarioEntity= new UsuarioDatosResModel(rol.usuarioEntity)
}

function RolActualizarReqModel(rol){
    this.nombre = rol.nombre
}


export {RolActualizarReqModel, RolCrearReqModel, RolDatosResModel}