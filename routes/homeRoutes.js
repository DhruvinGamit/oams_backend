const express = require('express');
const router = express.Router();
const { getAllServices, getServiceById } = require('../controllers/homeController');

router.get('/services', getAllServices);
router.get('/services/:id', getServiceById); 

module.exports = router;
