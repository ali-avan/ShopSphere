import express from 'express';
import Order from '../models/Order.js';

const router = express.Router();

// Route to handle order placement
router.post('/', async (req, res) => {
  const { items } = req.body; // Expecting items in the request body

  if (!items || items.length === 0) {
    return res.status(400).json({ message: 'Invalid order data' });
  }

  // Calculate the total order amount
  const totalAmount = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  try {
    // Create a new order in the database
    const newOrder = new Order({
      items,
      totalAmount,
    });
    await newOrder.save();

    // Respond back with success message
    res.status(201).json({ message: 'Order placed successfully!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
