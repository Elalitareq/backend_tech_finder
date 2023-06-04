import { Router } from "express";
import { aproveTechnician, createTechnician, getAllTechnicians, getSelfTechnician, getTechnicianById, updateTechnician } from "../controllers/technicianController.js";
import { allowAccess, verifyToken } from "../middlewares/authentication.js";
import TechnicianModel from "../models/technician.js";

const technicianRouter= Router()

technicianRouter.patch("/updateall", async (req, res) => {
    try {
      const updatedServices = ["laptops", "screens", "tablets", "desktops"];
  
      await TechnicianModel.updateMany({}, { $set: { services: updatedServices } });
  
      res.status(200).json({ success: true, message: "Services updated successfully" });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  });
  
technicianRouter.post('/' ,verifyToken,allowAccess(["technician"]), createTechnician )
technicianRouter.get('/all' , getAllTechnicians )
technicianRouter.get('/self' , verifyToken,allowAccess(["technician"]),getSelfTechnician )
technicianRouter.get('/:id' , getTechnicianById )
technicianRouter.patch('/aprove/:id' , aproveTechnician )
technicianRouter.patch('/:id' ,verifyToken,allowAccess(["technician","admin"]), updateTechnician )

export default technicianRouter;