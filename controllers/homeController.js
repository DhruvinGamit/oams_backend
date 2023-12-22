// homeController.js
const Service = require('../models/Service');

const getAllServices = async (req, res) => {
  try {
    const services = await Service.find();
    res.status(200).json({ services });
  } catch (error) {
    console.error('Error fetching services:', error);
    res.status(500).json({ message: 'Error fetching services', error: error.message });
  }
};

const getServiceById = async (req, res) => {
  const { id } = req.params; 
  try {
    const service = await Service.findById(id); 
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }
    res.status(200).json({ service });
  } catch (error) {
    console.error('Error fetching service by ID:', error);
    res.status(500).json({ message: 'Error fetching service', error: error.message });
  }
};


module.exports = { getAllServices, getServiceById };
