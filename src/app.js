import { Router } from "express";
import userRouter from "./routes/userRouter.js";
import technicianRouter from "./routes/technicianRouter.js";
const router=Router()




router.use("/user",userRouter)
router.use("/technician",technicianRouter)


export default router