const express = require('express');
const Cart = require('../models/Cart');
const authenticateToken = require('../middleware/auth');

const router = express.Router();

// Add to cart
router.post('/', authenticateToken, async (req, res) => {
  const { productId, name, price, quantity } = req.body;
  try {
    const cartItem = new Cart({ userId: req.user.userId, productId, name, price, quantity });
    await cartItem.save();
    res.status(201).json({ message: 'Item added to cart' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to add to cart', error: err });
  }
});

// Get user cart
router.get('/', authenticateToken, async (req, res) => {
  try {
    const cart = await Cart.find({ userId: req.user.userId });
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch cart', error: err });
  }
});

// Checkout (optional: clears cart)
router.post('/checkout', authenticateToken, async (req, res) => {
  try {
    const cartItems = await Cart.find({ userId: req.user.userId });
    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    
    await Cart.deleteMany({ userId: req.user.userId });

    res.json({ message: 'Checkout complete', total, items: cartItems });
  } catch (err) {
    res.status(500).json({ message: 'Checkout failed', error: err });
  }
});

module.exports = router;
