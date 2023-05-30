import { Router } from "express";
import userRouter from "./routes/userRouter.js";
import technicianRouter from "./routes/technicianRouter.js";
import productRouter from "./routes/productRouter.js";
const router=Router()




router.use("/user",userRouter)
router.use("/technician",technicianRouter)
router.use("/product",productRouter)


export default router