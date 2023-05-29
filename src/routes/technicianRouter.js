import { Router } from "express";
import { createTechnician, getAllTechnicians, updateTechnician } from "../controllers/technician.js";

const technicianRouter= Router()

technicianRouter.post('/' ,(req,res,next)=>{
    console.log("test")
    next()
}, createTechnician )
technicianRouter.get('/all' , getAllTechnicians )
technicianRouter.patch('/:id' , updateTechnician )



export default technicianRouter;