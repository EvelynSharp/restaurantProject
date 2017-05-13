const express = require('express');
const router = express.Router();
const Restaurant = require('../models/restaurant');

router.get('/', (req, res) =>{
  Restaurant.find ({}, (err, restaurants) => {
    res.json(restaurants);
  });
});

router.put('/:id', (req, res) => {
  Restaurant.findById(req.params.id, (err, restaurant) => {
    restaurant.restName = req.body.restName;
    restaurant.cuisine = req.body.cuisine;
    restaurant.ratings = req.body.ratings;
    res.json(restaurant)
    restaurant.save();
  });
});

router.post('/', (req, res) => {
  const {
    restName,
    cuisine,
    ratings
  } = req.body;

  new Restaurant ({
    restName,
    cuisine,
    ratings
  }).save( (err, restaurant) => {
    res.json(restaurant)
  });
});

module.exports = router;
