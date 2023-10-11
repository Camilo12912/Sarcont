import { SucursalDatosResModel } from "./sucursalModel.js"

function PagoCrearReqModel(pago){
    this.nombre = pago.nombre
    this.idSucursal= pago.idSucursal
}

function PagoDatosResModel(pago){
    this.idPago = pago.idPago
    this.nombre= pago.nombre
    this.idSucursal= pago.idSucursal
    this.sucursalEntity= new SucursalDatosResModel(pago.sucursalEntity)
}
function PagoLeerDatosResModel(pago){
    this.idPago = pago.idPago
    this.nombre= pago.nombre
    this.idSucursal = pago && pago.idSucursal ? pago.idSucursal : null
    this.sucursalNombre= pago.sucursalNombre
}
function PagoActualizarReqModel(pago){
    this.nombre = pago.nombre

}

export {PagoActualizarReqModel, PagoCrearReqModel, PagoDatosResModel , PagoLeerDatosResModel}