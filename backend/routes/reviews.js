const express = require('express');
const authenticateToken = require('../middleware/auth');
const Review = require('../models/Review');

const router = express.Router();

// POST a new review
router.post('/', authenticateToken, async (req, res) => {
  const { productId, rating, review } = req.body;

  if (!productId || !rating || !review) {
    return res.status(400).json({ message: 'Missing fields' });
  }

  try {
    const newReview = new Review({
      userId: req.user.userId,
      productId,
      rating,
      review,
    });

    await newReview.save();

    res.status(201).json({ message: 'Review submitted successfully', review: newReview });
  } catch (err) {
    res.status(500).json({ message: 'Failed to submit review', error: err.message });
  }
});

// (Optional) GET all reviews
router.get('/:productId', async (req, res) => {
    const { productId } = req.params; 
    try {
const allReviews = await Review.find({productId});
    res.json(allReviews);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch reviews', error: err.message });
  }
});

module.exports = router;
