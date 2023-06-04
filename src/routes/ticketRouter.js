import express from 'express';
import {
  addTicket,
  deleteTicket,
  updateTicket,
  getTicketById,
  getAllTickets,
  getTicketsByTechnicianId,
} from '../controllers/ticketController.js';

const router = express.Router();

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

// Get tickets by technician ID
router.get('/technicians/:technicianId/tickets', getTicketsByTechnicianId);

export default router;
