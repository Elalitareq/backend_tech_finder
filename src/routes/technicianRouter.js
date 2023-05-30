import { Router } from "express";
import { createTechnician, getAllTechnicians, getTechnicianById, updateTechnician } from "../controllers/technicianController.js";

const technicianRouter= Router()

technicianRouter.post('/' ,(req,res,next)=>{
    console.log("test")
    next()
}, createTechnician )
technicianRouter.get('/all' , getAllTechnicians )
technicianRouter.get('/:id' , getTechnicianById )
technicianRouter.patch('/:id' , updateTechnician )



export default technicianRouter;