const express = require('express');
const router = express.Router();
const Restaurant = require('../models/Restaurant');

// Add a new restaurant
router.post('/', async (req, res) => {
  const { name, latitude, longitude } = req.body;
  const restaurant = new Restaurant({
    name,
    location: {
      type: 'Point',
      coordinates: [longitude, latitude],
    },
  });

  try {
    await restaurant.save();
    res.status(201).send(restaurant);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Search for restaurants by location
router.get('/', async (req, res) => {
  const { latitude, longitude } = req.query;
  try {
    const restaurants = await Restaurant.find({
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [parseFloat(longitude), parseFloat(latitude)],
          },
          $maxDistance: 5000, // Adjust the search radius as needed
        },
      },
    });
    res.send(restaurants);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;