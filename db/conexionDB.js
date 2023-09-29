import mysql from "mysql"
import dotenv from "dotenv"

dotenv.config()

const db = mysql.createConnection({

    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
    
})
    
export const conectar = ()=>{
    db.connect((error) => {
        if (error) {
        console.error("Error de conexión a la base de datos:", error)
        } else {
        console.log("Conexión exitosa a MySQL.")
        }
    })
}

export  {db}