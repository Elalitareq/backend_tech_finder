import express from 'express';
import {
  addTicket,
  deleteTicket,
  updateTicket,
  getTicketById,
  getAllTickets,
  getTicketsByTechnicianId,
} from '../controllers/ticketController.js';
import { allowAccess, getId, verifyToken } from '../middlewares/authentication.js';

const router = express.Router();
// Get tickets by technician ID
router.get('/technician/tickets', verifyToken,allowAccess(['technician']),getId,getTicketsByTechnicianId);

// Add a new ticket
router.post('/', addTicket);

// Delete a ticket by ID
router.delete('/:id', deleteTicket);

// Update a ticket by ID
router.put('/:id', updateTicket);

// Get a single ticket by ID
router.get('/:id', getTicketById);

// Get all tickets
router.get('/', getAllTickets);


export default router;
