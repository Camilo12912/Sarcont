import { PucDatosResModel } from "./pucModel.js"
import { SucursalDatosResModel } from "./sucursalModel.js"
import { UsuarioDatosResModel } from "./usuarioModel.js"

function ArticuloCrearReqModel(articulo){
    this.nombre = articulo.nombre
    this.tarifa= articulo.tarifa
    this.codigo= articulo.codigo
    this.idSucursal= articulo.idSucursal
}

function ArticuloDatosResModel(articulo){
    this.idArticulo = articulo.idArticulo
    this.nombre= articulo.nombre
    this.tarifa= articulo.tarifa
    this.codigo= articulo.codigo
    this.idSucursal= articulo.idSucursal
    this.pucEntity= new PucDatosResModel(articulo.pucEntity)
    this.sucursalEntity= new SucursalDatosResModel(articulo.sucursalEntity)
    // this.usuarioEntity= new UsuarioDatosResModel(articulo.usuarioEntity)
}
function ArticuloLeerDatosResModel(articulo){
    this.idArticulo = articulo.idArticulo
    this.nombre= articulo.nombre
    this.tarifa= articulo.tarifa
    this.codigo= articulo.codigo
    this.pucDenominacion= articulo.pucDenominacion
    this.pucClasificacion= articulo.pucClasificacion
    this.idSucursal = articulo && articulo.idSucursal ? articulo.idSucursal : null
    this.sucursalNombre= articulo.sucursalNombre
}
function ArticuloActualizarReqModel(articulo){
    this.nombre = articulo.nombre
    this.tarifa = articulo.tarifa
    this.codigo = articulo.codigo
}

export {ArticuloActualizarReqModel, ArticuloCrearReqModel, ArticuloDatosResModel , ArticuloLeerDatosResModel}