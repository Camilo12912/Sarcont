import { PagoLeerDatosResModel } from "./pagoModel.js"

function BancoCrearReqModel(banco){
    this.codigoBanco= banco.codigoBanco
    this.nombre = banco.nombre
    this.numeroCuenta= banco.numeroCuenta
    this.idPago= banco.idPago
}

function BancoDatosResModel(banco){
    this.idBanco = banco.idBanco
    this.codigoBanco= banco.codigoBanco
    this.nombre = banco.nombre
    this.numeroCuenta= banco.numeroCuenta
    this.pagoEntity = new PagoLeerDatosResModel(banco.pagoEntity)
}

function BancoLeerDatosResModel(banco){
    this.idBanco = banco.idBanco
    this.codigoBanco= banco.codigoBanco
    this.nombre = banco.nombre
    this.numeroCuenta= banco.numeroCuenta
    this.idPago= banco.idPago
}

function BancoActualizarReqModel(banco){
    this.codigoBanco= banco.codigoBanco
    this.nombre = banco.nombre
    this.numeroCuenta= banco.numeroCuenta
}

export {BancoActualizarReqModel, BancoCrearReqModel, BancoDatosResModel , BancoLeerDatosResModel}