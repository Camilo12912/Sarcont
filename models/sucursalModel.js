import { UsuarioDatosResModel } from "./usuarioModel.js"

function SucursalCrearReqModel(sucursal){
    this.nombre = sucursal.nombre
}

function SucursalDatosResModel(sucursal){
    this.idSucursal = sucursal && sucursal.idSucursal ? sucursal.idSucursal : null;
    this.nombre = sucursal && sucursal.nombre ? sucursal.nombre : null;
    // this.idSucursal = sucursal.idSucursal
    // this.nombre= sucursal.nombre
    // this.usuarioEntity= new UsuarioDatosResModel(sucursal.usuarioEntity)
}

function SucursalActualizarReqModel(sucursal){
    this.nombre = sucursal.nombre
}


export {SucursalActualizarReqModel, SucursalCrearReqModel, SucursalDatosResModel}