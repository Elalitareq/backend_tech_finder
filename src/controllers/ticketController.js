import Ticket from '../models/ticket.js';

// Add a new ticket
const addTicket = async (req, res) => {
  try {
    const ticket = await Ticket.create(req.body);
    res.status(201).json({ success: true, ticket });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Delete a ticket by ID
const deleteTicket = async (req, res) => {
  try {
    const ticket = await Ticket.findByIdAndDelete(req.params.id);
    if (!ticket) {
      res.status(404).json({ success: false, message: 'Ticket not found' });
      return;
    }
    res.status(200).json({ success: true, message: 'Ticket deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Update a ticket by ID
const updateTicket = async (req, res) => {
  try {
    const ticket = await Ticket.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!ticket) {
      res.status(404).json({ success: false, message: 'Ticket not found' });
      return;
    }
    res.status(200).json({ success: true, ticket });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get a single ticket by ID
const getTicketById = async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id);
    if (!ticket) {
      res.status(404).json({ success: false, message: 'Ticket not found' });
      return;
    }
    res.status(200).json({ success: true, ticket });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get all tickets
const getAllTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find();
    res.status(200).json({ success: true, tickets });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get tickets by technician ID
const getTicketsByTechnicianId = async (req, res) => {
  try {
    const id = req.technician._id;
    const { status } = req.query;
    const query = { technician: id };

    if (status ) {
      query.status = status;
    } else {
      query.status = { $in: ["processing", "open"] };
    }

    console.log(query)
    const tickets = await Ticket.find(query);
    console.log(tickets)
    res.status(200).json({ success: true, tickets });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
export const getTechnicianDashboardData = async (req, res) => {
  try {
    const technicianId = req.technician._id;

    const dashboardData = await Ticket.aggregate([
      // Match tickets for the technician
      { $match: { technician: technicianId } },

      // Group by status and count tickets in each group
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 }
        }
      },

      // Project the necessary fields
      {
        $project: {
          _id: 0,
          status: "$_id",
          count: 1
        }
      }
    ]);

    let resolvedCount = 0;
    let openCount = 0;
    let processingCount = 0;

    dashboardData.forEach(({ status, count }) => {
      if (status === "resolved") {
        resolvedCount = count;
      } else if (status === "open") {
        openCount = count;
      } else if (status === "processing") {
        processingCount = count;
      }
    });

    const recentlyPostedTickets = await Ticket.find({
      technician: technicianId
    })
      .sort({ createdAt: -1 })
      .limit(5);

    res.status(200).json({
      success: true,
      resolvedCount,
      openCount,
      processingCount,
      recentlyPostedTickets
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};


export { addTicket, deleteTicket, updateTicket, getTicketById, getAllTickets, getTicketsByTechnicianId };
