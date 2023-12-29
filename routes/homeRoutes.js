const express = require('express');
const router = express.Router();
const { getAllServices, getServiceById , getAllCategories } = require('../controllers/homeController');

router.get('/services', getAllServices);
router.get('/services/:id', getServiceById); 
router.get('/categories', getAllCategories);

module.exports = router;
