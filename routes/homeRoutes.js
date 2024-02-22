// const express = require('express');
// const router = express.Router();
// const { getAllServices, getServiceById , getAllCategories } = require('../controllers/homeController');

// router.get('/services', getAllServices);
// router.get('/services/:id', getServiceById); 
// router.get('/categories', getAllCategories);

// module.exports = router;


const express = require('express');
const router = express.Router();
const { getAllServices, getServiceById, getAllCategories, getServicesByCategory } = require('../controllers/homeController');

router.get('/services', getAllServices);
router.get('/services/:id', getServiceById);
router.get('/categories', getAllCategories);
router.get('/category/:categoryId/services', getServicesByCategory); // Added route for category-specific services

module.exports = router;
