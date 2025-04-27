// orderRoutes.js
const express = require('express');
const { sendOrderConfirmationEmail } = require('../services/emailService');
const Order = require('../models/Order');  // Assuming you have an Order model

const router = express.Router();

// Route for creating an order
router.post('/create-order', async (req, res) => {
  try {
    // Create an order (simplified example)
    const newOrder = new Order({
      customerName: req.body.customerName,
      customerEmail: req.body.customerEmail,
      status: 'Placed',
    });

    // Save order to database
    await newOrder.save();

    // Send order confirmation email
    sendOrderConfirmationEmail(newOrder);

    res.status(201).json(newOrder);  // Send the created order back to the client
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).send('Error creating order');
  }
});

module.exports = router;
