import express from 'express';
import {
  addTicket,
  deleteTicket,
  updateTicket,
  getTicketById,
  getAllTickets,
  getTicketsByTechnicianId,
  getUserTickets,
} from '../controllers/ticketController.js';
import { allowAccess, getId, verifyToken } from '../middlewares/authentication.js';

const router = express.Router();
// Get tickets by technician ID
router.get('/technician/tickets', verifyToken,allowAccess(['technician']),getId,getTicketsByTechnicianId);


router.get("/usertickets", verifyToken,getUserTickets );
// Add a new ticket
router.post('/', addTicket);

// Delete a ticket by ID
router.delete('/:id', deleteTicket);

// Update a ticket by ID
router.put('/:id', verifyToken,allowAccess(["technician"]),updateTicket);

// Get a single ticket by ID
router.get('/:id', getTicketById);

// Get all tickets
router.get('/', getAllTickets);


export default router;
