import { Router } from "express";
import { aproveTechnician, createTechnician, getAllTechnicians, getTechnicianById, updateTechnician } from "../controllers/technicianController.js";

const technicianRouter= Router()

technicianRouter.post('/' ,(req,res,next)=>{
    console.log("test")
    next()
}, createTechnician )
technicianRouter.get('/all' , getAllTechnicians )
technicianRouter.get('/:id' , getTechnicianById )
technicianRouter.patch('/aprove/:id' , aproveTechnician )
technicianRouter.patch('/:id' , updateTechnician )



export default technicianRouter;