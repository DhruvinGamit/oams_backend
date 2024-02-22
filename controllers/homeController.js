
// // homeController.js
// const Service = require('../models/Service');
// const Category = require('../models/Category');

// const getAllServices = async (req, res) => {
//   try {
//     const services = await Service.find();
//     res.status(200).json({ services });
//   } catch (error) {
//     console.error('Error fetching services:', error);
//     res.status(500).json({ message: 'Error fetching services', error: error.message });
//   }
// };

// const getServiceById = async (req, res) => {
//   const { id } = req.params;
//   try {
//     const service = await Service.findById(id);
//     if (!service) {
//       return res.status(404).json({ message: 'Service not found' });
//     }
//     res.status(200).json({ service });
//   } catch (error) {
//     console.error('Error fetching service by ID:', error);
//     res.status(500).json({ message: 'Error fetching service', error: error.message });
//   }
// };

// const getAllCategories = async (req, res) => {
//   try {
//     const categories = await Category.find();
//     res.status(200).json({ categories });
//   } catch (error) {
//     console.error('Error fetching Categories:', error);
//     res.status(500).json({ message: 'Error fetching Categories', error: error.message });
//   }
// };

// const getServicesByCategory = async (req, res) => {
//   const { categoryId } = req.params;
//   console.log('Fetching services for category:', categoryId);

//   try {
//     const services = await Service.find({ categoryId }).populate('categoryId');
//     console.log('Fetched services:', services);
//     res.status(200).json({ services });
//   } catch (error) {
//     console.error('Error fetching services by category:', error);
//     res.status(500).json({ message: 'Error fetching services by category', error: error.message });
//   }
// };



// module.exports = { getAllServices, getServiceById, getAllCategories, getServicesByCategory };



const Service = require('../models/Service');
const Category = require('../models/Category');

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

const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json({ categories });
  } catch (error) {
    console.error('Error fetching Categories:', error);
    res.status(500).json({ message: 'Error fetching Categories', error: error.message });
  }
};

const getServicesByCategory = async (req, res) => {
  const { categoryId } = req.params;
  console.log('Fetching services for category:', categoryId);

  try {
    const services = await Service.find({ categoryId }).populate('categoryId');
    console.log('Fetched services:', services);
    res.status(200).json({ services });
  } catch (error) {
    console.error('Error fetching services by category:', error);
    res.status(500).json({ message: 'Error fetching services by category', error: error.message });
  }
};

const addServices = async (req, res) => {
  const serviceData = req.body;

  try {
    const newService = await Service.create(serviceData);
    res.status(201).json({ message: 'Service added successfully', service: newService });
  } catch (error) {
    console.error('Error adding service:', error);
    res.status(500).json({ message: 'Error adding service', error: error.message });
  }
};

module.exports = { getAllServices, getServiceById, getAllCategories, getServicesByCategory, addServices };
