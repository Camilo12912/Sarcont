import   { Router } from "express"
import respuestasHttp from "../utils/respuestasHttp.js"
import bancoServicio from "../services/bancoServicio.js"
import { BancoActualizarReqModel, BancoCrearReqModel, BancoDatosResModel, BancoLeerDatosResModel } from "../models/bancoModel.js"

const router= Router()


const postBanco= (req, res)=>{

    const username="camilo129" 
    bancoServicio.crearBanco(new BancoCrearReqModel(req.body), username)
    .then(banco =>{
        respuestasHttp.exito(req, res, new BancoDatosResModel(banco), 201)
        console.log(banco)
    })
    .catch(err=>{
        respuestasHttp.error(req, res, err, "Error al crear el banco", 400)
    })
}

const getBanco= (req, res)=>{

    bancoServicio.leerBanco()
    .then(array=> {
        console.log(array)
        let losbancos=[]
        array.forEach(banco => {
            losbancos.push(new BancoLeerDatosResModel(banco))
        })
        respuestasHttp.exito(req, res, losbancos, 200)
    })
    .catch(err=>{
        respuestasHttp.error(req, res, err, "Error al leer los bancos", 500)
        console.log(err)
    })
}

const getDetalleBanco= (req, res)=>{

    bancoServicio.detalleBanco(req.params.id)
    .then(array=> {
        let losbancos=[]
        array.forEach(banco => {
            losbancos.push(new BancoLeerDatosResModel(banco))
        })
        respuestasHttp.exito(req, res, losbancos, 200)
        console.log(banco)
    })
    .catch(err =>{
        respuestasHttp.error(req,res,err, "Error al leer el detalle del banco", 500)
    })
}

const putBanco= (req, res)=>{
    

    bancoServicio.actualizarBanco( req.params.id , new BancoActualizarReqModel(req.body ))
    .then(banco=> {
        const bancoJSON = banco[0]
        respuestasHttp.exito(req, res, new BancoLeerDatosResModel(bancoJSON), 200)
    })
    .catch(err=> {
        respuestasHttp.error(req, res, err, "Error al actualizar el banco", 400)
        console.log(err)
    })
}

const deleteBanco= (req, res)=>{


    bancoServicio.eliminarBanco(req.params.id)
    .then(()=>{
        respuestasHttp.exito(req, res, "banco eliminado con exito", 200)
    })
    .catch( err=>{
        respuestasHttp.error(req, res,err, "No se pudo eliminar el banco",  400)
    })

}



export default {postBanco, getBanco, getDetalleBanco, putBanco, deleteBanco}