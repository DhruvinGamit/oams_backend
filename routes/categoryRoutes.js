// categoryRoutes.js

const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
// const { isAdmin } = require('../middleware/authMiddleware');

router.post('/add', categoryController.addCategory);

module.exports = router;
