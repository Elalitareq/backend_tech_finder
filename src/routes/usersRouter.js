import { Router } from "express";
const userRouter= Router()

userRouter.get("/test",(req,res)=>{
    res.send("test get")
})



userRouter.post("/",(req,res)=>{
    res.send(req.body)
})



export default  userRouter