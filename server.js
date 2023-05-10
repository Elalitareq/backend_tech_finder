import dotenv from "dotenv"
import express  from "express"
import router from "./src/app.js"
import connectToDatabase from "./src/config/db.js"
import cors from "cors";
import { configureSessionMiddleware } from "./src/middlewares/session.js";

connectToDatabase()
dotenv.config()

const port=process.env.PORT ||4000
const app = express()


const corsOptions = {
    optionsSuccessStatus: 200,
    origin: "http://localhost:3000",
    credentials: true,
  }
  app.use(cors(corsOptions))
app.use(configureSessionMiddleware());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));



app.use("/api",router)



app.listen(port,()=>{

    console.log(`listening on http://localhost:${port}`)
})