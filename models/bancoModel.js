import { PagoLeerDatosResModel } from "./pagoModel.js"

function BancoCrearReqModel(banco){
    this.codigoBanco= banco.codigoBanco
    this.nombre = banco.nombre
    this.numeroCuenta= banco.numeroCuenta
}

function BancoDatosResModel(banco){
    this.idBanco = banco.idBanco
    this.codigoBanco= banco.codigoBanco
    this.nombre = banco.nombre
    this.numeroCuenta= banco.numeroCuenta
}

function BancoLeerDatosResModel(banco){
    this.idBanco = banco.idBanco
    this.codigoBanco= banco.codigoBanco
    this.nombre = banco.nombre
    this.numeroCuenta= banco.numeroCuenta
}

function BancoActualizarReqModel(banco){
    this.codigoBanco= banco.codigoBanco
    this.nombre = banco.nombre
    this.numeroCuenta= banco.numeroCuenta
}

export {BancoActualizarReqModel, BancoCrearReqModel, BancoDatosResModel , BancoLeerDatosResModel}