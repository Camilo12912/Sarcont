import  express from "express"
import { conectar } from "./db/conexionDB.js"
import { variables } from "./utils/variables.js"
import { configuracionSeguridad } from "./security/configuracionSeguridad.js"

var app = express()
const PORT= variables.EXPRESS_PORT
const HOST= variables.EXPRESS_HOST


conectar()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
configuracionSeguridad(app)


app.listen(PORT, HOST, ()=>{
    console.log(`Servidor corriendo en el puerto http://${HOST}:${PORT}`) 
})
