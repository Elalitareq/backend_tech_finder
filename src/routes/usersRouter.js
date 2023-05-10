import { Router } from "express";
import { userAddController } from "../controllers/user.js";
import { requireAuth } from "../middlewares/authentication.js";
import { loginController, registerController } from "../controllers/authentication.js";
const userRouter= Router()

userRouter.get("/test",requireAuth,(req,res)=>{
    res.send("test get")
})



userRouter.post("/",userAddController)
userRouter.post("/login",loginController)
userRouter.post("/register",registerController)



export default  userRouter