// Order model (simplified)
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  status: {
    type: String,
    enum: ['Placed', 'Shipped', 'Out for Delivery', 'Delivered'],
    default: 'Placed'
  },
  customerName: String,
  // Other fields...
});

const Order = mongoose.model('Order', orderSchema);

// API route to track order status
app.get('/api/orders/:id', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).send("Order not found");
    }
    res.json(order);
  } catch (error) {
    res.status(500).send("Error fetching order");
  }
});
