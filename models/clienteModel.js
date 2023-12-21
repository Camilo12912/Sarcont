import { SucursalDatosResModel } from "./sucursalModel.js"
import { UsuarioDatosResModel } from "./usuarioModel.js"

function ClienteCrearReqModel(cliente){
    this.nombre = cliente.nombre
    this.apellido = cliente.apellido
    this.nombreTributario= cliente.nombreTributario
    this.tipo= cliente.tipo
    this.tipoDocumento= cliente.tipoDocumento
    this.documento= cliente.documento
    this.email= cliente.email
    this.ciudad= cliente.ciudad
    this.direccion= cliente.direccion
    this.telefono= cliente.telefono
    this.tipoTercero= cliente.tipoTercero
    this.idSucursal= cliente.idSucursal
    // this.idUsuario = cliente && cliente.idUsuario ? cliente.idUsuario : null
}

function ClienteDatosResModel(cliente){
    this.idCliente= cliente.idCliente
    this.nombre = cliente.nombre
    this.apellido = cliente.apellido
    this.nombreTributario= cliente.nombreTributario
    this.tipo= cliente.tipo
    this.tipoDocumento= cliente.tipoDocumento
    this.documento= cliente.documento
    this.email= cliente.email
    this.ciudad= cliente.ciudad
    this.direccion= cliente.direccion
    this.telefono= cliente.telefono
    this.tipoTercero= cliente.tipoTercero
    this.sucursalNombre= cliente.sucursalNombre
    this.idSucursal = cliente && cliente.idSucursal ? cliente.idSucursal : null
    this.idUsuario = cliente && cliente.idUsuario ? cliente.idUsuario : null
    this.sucursalEntity= new SucursalDatosResModel(cliente.sucursalEntity)
    // this.usuarioEntity= new UsuarioDatosResModel(cliente.usuarioEntity)
}

function ClienteLeerDatosResModel(cliente){
    this.idCliente= cliente.idCliente
    this.nombres = cliente.nombres
    this.apellidos = cliente.apellidos
    this.nombreTributario= cliente.nombreTributario
    this.tipo= cliente.tipo
    this.tipoDocumento= cliente.tipoDocumento
    this.documento= cliente.documento
    this.email= cliente.email
    this.ciudad= cliente.ciudad
    this.direccion= cliente.direccion
    this.telefono= cliente.telefono
    this.tipoTercero= cliente.tipoTercero
    this.sucursalNombre= cliente.sucursalNombre
    this.sucursalNombre= cliente.sucursalNombre
    this.idSucursal = cliente && cliente.idSucursal ? cliente.idSucursal : null
    // this.usernameUsuario = cliente.usernameUsuario
    // this.nombreUsuario = cliente.nombreUsuario
    // this.apellidoUsuario = cliente.apellidoUsuario
    // this.idUsuario = cliente && cliente.idUsuario ? cliente.idUsuario : null
}
function ClienteActualizarReqModel(cliente){
    this.nombre = cliente.nombre
    this.tipo = cliente.tipo
    this.documento = cliente.documento
}


export {ClienteActualizarReqModel, ClienteCrearReqModel, ClienteDatosResModel, ClienteLeerDatosResModel}