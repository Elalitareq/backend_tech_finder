import { Router } from "express";
import { aproveTechnician, createTechnician, getAllTechnicians, getSelfTechnician, getTechnicianById, updateTechnician } from "../controllers/technicianController.js";
import { allowAccess, verifyToken } from "../middlewares/authentication.js";

const technicianRouter= Router()

technicianRouter.post('/' ,(req,res,next)=>{
    console.log("test")
    next()
}, createTechnician )
technicianRouter.get('/all' , getAllTechnicians )
technicianRouter.get('/self' , verifyToken,allowAccess(["technician"]),getSelfTechnician )
technicianRouter.get('/:id' , getTechnicianById )
technicianRouter.patch('/aprove/:id' , aproveTechnician )
technicianRouter.patch('/:id' ,verifyToken,allowAccess(["technician","admin"]), updateTechnician )



export default technicianRouter;