import { Router } from "express";
import userRouter from "./routes/userRouter.js";
import technicianRouter from "./routes/technicianRouter.js";
import productRouter from "./routes/productRouter.js";
import ticketRouter from "./routes/ticketRouter.js";
import { getTechnicianDashboardData } from "./controllers/ticketController.js";
import { allowAccess, getId, verifyToken } from "./middlewares/authentication.js";
const router=Router()




router.use("/user",userRouter)
router.use("/technician",technicianRouter)
router.use("/product",productRouter)
router.use("/tickets",ticketRouter)
router.get('/dashboard',verifyToken,allowAccess(["technician"]),getId, getTechnicianDashboardData);

export default router