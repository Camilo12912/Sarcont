import { SucursalDatosResModel } from "./sucursalModel.js"
import { UsuarioDatosResModel } from "./usuarioModel.js"

function ClienteCrearReqModel(cliente){
    this.nombre = cliente.nombre
    this.tipo= cliente.tipo
    this.documento= cliente.documento
    this.idSucursal= cliente.idSucursal
}

function ClienteDatosResModel(cliente){
    this.idCliente = cliente.idCliente
    this.nombre= cliente.nombre
    this.tipo= cliente.tipo
    this.documento= cliente.documento
    this.sucursalNombre= cliente.sucursalNombre
    this.idSucursal = cliente && cliente.idSucursal ? cliente.idSucursal : null;
    this.sucursalEntity= new SucursalDatosResModel(cliente.sucursalEntity)
    // this.usuarioEntity= new UsuarioDatosResModel(cliente.usuarioEntity)
}

function ClienteLeerDatosResModel(cliente){
    this.idCliente = cliente.idCliente
    this.nombre= cliente.nombre
    this.tipo= cliente.tipo
    this.documento= cliente.documento
    this.sucursalNombre= cliente.sucursalNombre
    this.idSucursal = cliente && cliente.idSucursal ? cliente.idSucursal : null;
}
function ClienteActualizarReqModel(cliente){
    this.nombre = cliente.nombre
    this.tipo = cliente.tipo
    this.documento = cliente.documento
}


export {ClienteActualizarReqModel, ClienteCrearReqModel, ClienteDatosResModel, ClienteLeerDatosResModel}