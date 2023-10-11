import respuestasHttp from "../utils/respuestasHttp.js"
import articuloServicio from "../services/articuloServicio.js"
import { ArticuloLeerDatosResModel, ArticuloActualizarReqModel, ArticuloCrearReqModel, ArticuloDatosResModel} from "../models/articuloModel.js"


const postArticulo= (req, res)=>{

    articuloServicio.crearArticulo(new ArticuloCrearReqModel(req.body), req.user.sub)
    .then(articulo =>{
        respuestasHttp.exito(req, res, new ArticuloDatosResModel(articulo), 201)
        console.log(articulo)
    })
    .catch(err=>{
        respuestasHttp.error(req, res, err, "Error al crear el articulo", 400)
    })
}

const getArticulo= (req, res)=>{ 

    articuloServicio.leerArticulo()
    .then(array=> {
        console.log(array)
        let losArticulos=[]
        array.forEach(articulo => {
            losArticulos.push(new ArticuloLeerDatosResModel(articulo))
        })
        respuestasHttp.exito(req, res, losArticulos, 200)
    })
    .catch(err=>{
        respuestasHttp.error(req, res, err, "Error al leer los articulos", 500)
        console.log(err)
    })
}

const getDetalleArticulo= (req, res)=>{ 

    articuloServicio.detalleArticulo(req.params.id)
    .then(array=> {
        let losArticulos=[]
        array.forEach(articulo => {
            losArticulos.push(new ArticuloLeerDatosResModel(articulo))
        })
        respuestasHttp.exito(req, res, losArticulos, 200)
        console.log(articulo)
    })
    .catch(err =>{
        respuestasHttp.error(req,res,err, "Error al leer el detalle del articulo", 500)
    })
}

const putArticulo= (req, res)=>{ 

    articuloServicio.actualizarArticulo( req.params.id , new ArticuloActualizarReqModel(req.body ), req.user.sub )
    .then(articulo=> {
        const articuloJSON = articulo[0]
        respuestasHttp.exito(req, res, new ArticuloLeerDatosResModel(articuloJSON), 200)
    })
    .catch(err=> {
        respuestasHttp.error(req, res, err, "Error al actualizar el articulo", 400)
        console.log(err)
    })
}

const deleteArticulo= (req, res)=>{ 

    articuloServicio.eliminarArticulo(req.params.id, req.user.sub)
    .then(()=>{
        respuestasHttp.exito(req, res, "articulo eliminado con exito", 200)
    })
    .catch( err=>{
        respuestasHttp.error(req, res,err, "No se pudo eliminar el articulo",  400)
    })

}



export default {postArticulo, getArticulo, getDetalleArticulo, putArticulo, deleteArticulo}