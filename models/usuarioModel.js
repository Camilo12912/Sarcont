function UsuarioCrearReqModel(usuario){
    this.nombre = usuario.nombre
    this.apellido= usuario.apellido
    this.email = usuario.email
    this.username= usuario.username
    this.password= usuario.password
    this.idRol= usuario.idRol
    this.idSucursal= usuario.idSucursal
}

function UsuarioDatosResModel(usuario){
    this.idUsuario = usuario.idUsuario
    this.nombre = usuario.nombre
    this.apellido= usuario.apellido
    this.email= usuario.email
    this.username= usuario.username
    this.Rol= usuario.Rol
    this.sucursalNombre= usuario.sucursalNombre
    
}

function UsuarioActualizarReqModel(usuario){
    this.nombre = usuario.nombre
    this.apellido = usuario.apellido
    this.email = usuario.email
    this.username = usuario.username
}

function PasswordActualizarReqModel(usuario){
    this.newPassword = usuario.newPassword
    this.confirPassword = usuario.confirPassword
}

export {UsuarioCrearReqModel, UsuarioDatosResModel, UsuarioActualizarReqModel, PasswordActualizarReqModel}