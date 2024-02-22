const express = require("express");
const router = express.Router();
const Razorpay = require("razorpay");

const razorpay = new Razorpay({
  key_id: 'YOUR_RAZORPAY_KEY_ID',
  key_secret: 'YOUR_RAZORPAY_KEY_SECRET',
});

// Endpoint to create a Razorpay order
router.post('/', async (req, res) => {
  try {
    const { amount } = req.body;

    const options = {
      amount, // amount in paisa
      currency: 'INR',
    };

    const order = await razorpay.orders.create(options);

    res.json(order);
  } catch (error) {
    console.error('Error generating Razorpay order:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

// ... (You can add more routes or functions as needed)

module.exports = router;
