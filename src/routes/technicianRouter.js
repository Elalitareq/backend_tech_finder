import { Router } from "express";
import { createTechnician, getAllTechnicians, updateTechnician } from "../controllers/technician.js";

const technicianRouter= Router()

technicianRouter.post('/' , createTechnician )
technicianRouter.get('/all' , getAllTechnicians )
technicianRouter.patch('/:id' , updateTechnician )



export default technicianRouter;