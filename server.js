import  express from "express"
import rutas from "./routes/rutas.js"
import { conectar } from "./db/conexionDB.js"

var app = express()
const PORT=3000
const HOST="localhost"


conectar()

app.use(express.json())
app.use(express.urlencoded({extended:true}))


rutas(app)

app.listen(PORT, HOST, ()=>{
    console.log(`Servidor corriendo en el puerto http://${HOST}:${PORT}`) 
})
