import   { Router } from "express"
import respuestasHttp from "../utils/respuestasHttp.js"
import articuloServicio from "../services/articuloServicio.js"
import { ArticuloLeerDatosResModel, ArticuloActualizarReqModel, ArticuloCrearReqModel, ArticuloDatosResModel} from "../models/articuloModel.js"

const router= Router()


router.post("/", (req, res)=>{

    const username="camilo129" 
    articuloServicio.crearArticulo(new ArticuloCrearReqModel(req.body), username)
    .then(articulo =>{
        respuestasHttp.exito(req, res, new ArticuloDatosResModel(articulo), 201)
        console.log(articulo)
    })
    .catch(err=>{
        respuestasHttp.error(req, res, err, "Error al crear el articulo", 400)
    })
})

router.get("/", (req, res)=>{

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
})

router.get("/:id", (req, res)=>{

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
})

router.put("/:id", (req, res)=>{
    
    const username= "camilo129"
    articuloServicio.actualizarArticulo( req.params.id , new ArticuloActualizarReqModel(req.body ),username )
    .then(articulo=> {
        const articuloJSON = articulo[0]
        respuestasHttp.exito(req, res, new ArticuloLeerDatosResModel(articuloJSON), 200)
    })
    .catch(err=> {
        respuestasHttp.error(req, res, err, "Error al actualizar el articulo", 400)
        console.log(err)
    })
})

router.delete("/:id", (req, res)=>{

    const username="camilo129"
    articuloServicio.eliminarArticulo(req.params.id, username)
    .then(()=>{
        respuestasHttp.exito(req, res, "articulo eliminado con exito", 200)
    })
    .catch( err=>{
        respuestasHttp.error(req, res,err, "No se pudo eliminar el articulo",  400)
    })

})



export default router