import pucRepositorio from "../db/repositorios/pucRepositorio.js"


const leerPuc = ()=>{

    return new Promise ((resolver ,rechazar)=>{
        resolver(pucRepositorio.leer())

    })
}

const detallePuc= (codigo)=>{
    return new Promise ((resolver ,rechazar)=>{
        resolver(pucRepositorio.detalle(codigo))
})
}
export default {leerPuc, detallePuc}