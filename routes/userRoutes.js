const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getAllUsers, addService, deleteProvider } = require('../controllers/userController');

router.post('/register', registerUser);
router.post('/login', loginUser); // Added login route
router.post('/addServices', addService);
router.delete('/deleteProvider/:email', deleteProvider);
router.get('/', getAllUsers);

module.exports = router;
