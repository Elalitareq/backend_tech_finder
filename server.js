import dotenv from "dotenv"
import express, { urlencoded }  from "express"
import router from "./src/app.js"
dotenv.config()

const port=process.env.PORT ||4000
const app = express()


app.use("/api",router)
app.use(express.json())
app.use(urlencoded({extended:false}))




app.listen(port,()=>{

    console.log(`listening on http://localhost:${port}`)
})