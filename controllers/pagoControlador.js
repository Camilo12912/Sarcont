import respuestasHttp from "../utils/respuestasHttp.js"
import pagoServicio from "../services/pagoServicio.js"
import { PagoActualizarReqModel, PagoCrearReqModel, PagoDatosResModel, PagoLeerDatosResModel } from "../models/pagoModel.js"



const postPago= (req, res)=>{


    pagoServicio.crearPago(new PagoCrearReqModel(req.body))
    .then(pago =>{
        respuestasHttp.exito(req, res, new PagoDatosResModel(pago), 201)
        console.log(pago)
    })
    .catch(err=>{
        respuestasHttp.error(req, res, err, "Error al crear el pago", 400)
    })
}

const getPago= (req, res)=>{

    pagoServicio.leerPago()
    .then(array=> {
        console.log(array)
        let lospagos=[]
        array.forEach(pago => {
            lospagos.push(new PagoLeerDatosResModel(pago))
        })
        respuestasHttp.exito(req, res, lospagos, 200)
    })
    .catch(err=>{
        respuestasHttp.error(req, res, err, "Error al leer los pagos", 500)
        console.log(err)
    })
}

const getDetallePago= (req, res)=>{

    pagoServicio.detallePago(req.params.id)
    .then(array=> {
        let lospagos=[]
        array.forEach(pago => {
            lospagos.push(new PagoLeerDatosResModel(pago))
        })
        respuestasHttp.exito(req, res, lospagos, 200)
        console.log(pago)
    })
    .catch(err =>{
        respuestasHttp.error(req,res,err, "Error al leer el detalle del pago", 500)
    })
}

const putPago= (req, res)=>{
    

    pagoServicio.actualizarPago( req.params.id , new PagoActualizarReqModel(req.body ))
    .then(pago=> {
        const pagoJSON = pago[0]
        respuestasHttp.exito(req, res, new PagoLeerDatosResModel(pagoJSON), 200)
    })
    .catch(err=> {
        respuestasHttp.error(req, res, err, "Error al actualizar el pago", 400)
        console.log(err)
    })
}

const deletePago= (req, res)=>{


    pagoServicio.eliminarPago(req.params.id)
    .then(()=>{
        respuestasHttp.exito(req, res, "pago eliminado con exito", 200)
    })
    .catch( err=>{
        respuestasHttp.error(req, res,err, "No se pudo eliminar el pago",  400)
    })

}



export default {postPago, getPago, getDetallePago, putPago, deletePago}