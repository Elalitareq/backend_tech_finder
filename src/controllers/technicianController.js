import TechnicianModel from "../models/technician.js";
function calculateDistance(lat1, lon1, lat2, lon2) {
  const earthRadius = 6371; // Earth's radius in kilometers

  // Convert latitude and longitude from degrees to radians
  const lat1Rad = toRadians(lat1);
  const lon1Rad = toRadians(lon1);
  const lat2Rad = toRadians(lat2);
  const lon2Rad = toRadians(lon2);

  // Calculate the differences between coordinates
  const latDiff = lat2Rad - lat1Rad;
  const lonDiff = lon2Rad - lon1Rad;

  // Calculate the Haversine distance
  const a =
    Math.sin(latDiff / 2) * Math.sin(latDiff / 2) +
    Math.cos(lat1Rad) *
      Math.cos(lat2Rad) *
      Math.sin(lonDiff / 2) *
      Math.sin(lonDiff / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = earthRadius * c;

  return distance;
}

function toRadians(degrees) {
  return degrees * (Math.PI / 180);
}

// Controller to create a new technician
export const createTechnician = async (req, res) => {
  try {
    const technicianData = req.body;
    technicianData.aproved = false;
    const technician = await TechnicianModel.create(technicianData);
    res.status(201).json(technician);
  } catch (error) {
    res.status(500).json({ error: "Failed to create technician" ,message:error.message});
  }
};
export const aproveTechnician = async (req, res) => {
  try {
    const { id } = req.params;
    const { aproved } = req.body;
    const technician = await TechnicianModel.findByIdAndUpdate(
      id,
      { aproved },
      { new: true }
    );
    if (!technician) {
      return res
        .status(404)
        .send({ succes: false, message: "Technician Not Found" });
    }
    res
      .status(200)
      .send({ succes: true, message: "Technician Aproved", technician });
  } catch (e) {
    res
      .status(500)
      .send({
        success: false,
        message: "Internal Server Error",
        error: error,
        errorMessage: error.message,
      });
  }
};
// Controller to get all technicians
// Controller to get all technicians
export async function getAllTechnicians(req, res) {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12; // Number of technicians per page
    var filter = {};
    if (req.query.service) {
      filter.services = req.query.service;
    }

    // Calculate the starting index of technicians for the current page
    const startIndex = (page - 1) * limit;

    // Find all technicians
    const technicians = await TechnicianModel.find(filter);

    var modifiedTechnicians = [];
    if (req.query.lat && req.query.long) {
      const userLatitude = req.query.lat;
      const userLongitude = req.query.long;

      // Calculate the distance between each technician and the user
      technicians.forEach((technician) => {
        const technicianLatitude = technician.location.lat;
        const technicianLongitude = technician.location.long;

        // Calculate the distance using a suitable algorithm (e.g., Haversine formula)
        const distance = calculateDistance(
          userLatitude,
          userLongitude,
          technicianLatitude,
          technicianLongitude
        );

        // Create a modified technician object with distance included
        const modifiedTechnician = {
          ...technician._doc,
          distance: distance.toFixed(2),
        };

        modifiedTechnicians.push(modifiedTechnician);
      });

      // Sort modified technicians by distance in ascending order
      modifiedTechnicians.sort(
        (a, b) => a.distance.split(" ")[0] - b.distance.split(" ")[0]
      );
    } else {
      // If latitude and longitude are not provided in the query, return all technicians as is
      modifiedTechnicians = technicians;
    }

    // Get the total number of documents
    const totalTechnicians = modifiedTechnicians.length;

    // Slice the technicians based on the starting index and limit for pagination
    const paginatedTechnicians = modifiedTechnicians.slice(
      startIndex,
      startIndex + limit
    );

    // Calculate the last page based on the total number of technicians and the limit per page
    const lastPage = Math.ceil(totalTechnicians / limit);

    res.json({
      technicians: paginatedTechnicians,
      totalTechnicians,
      currentPage: page,
      lastPage,
    });
  } catch (error) {
    // Handle any errors that occur during the database query
    res
      .status(500)
      .json({ error: "Failed to get technicians", message: error.message });
  }
}

// Controller to get a specific technician by ID
export const getTechnicianById = async (req, res) => {
  try {
    const { id } = req.params;
    const technician = await TechnicianModel.findById(id);
    if (technician) {
      res.json(technician);
    } else {
      res.status(404).json({ error: "Technician not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch technician" });
  }
};

// Controller to update a specific technician by ID
export const updateTechnician = async (req, res) => {
  try {
    const { id } = req.params;
    const technicianData = req.body;
    const technician = await TechnicianModel.findByIdAndUpdate(
      id,
      technicianData,
      { new: true }
    );
    if (technician) {
      res.json(technician);
    } else {
      res.status(404).json({ error: "Technician not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to update technician" });
  }
};

// Controller to delete a specific technician by ID
export const deleteTechnician = async (req, res) => {
  try {
    const { id } = req.params;
    const technician = await TechnicianModel.findByIdAndRemove(id);
    if (technician) {
      res.json({ message: "Technician deleted" });
    } else {
      res.status(404).json({ error: "Technician not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to delete technician" });
  }
};
