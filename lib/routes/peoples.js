const { Router } = require('express');
const People = require('../models/People');

module.exports = Router()
  .post('/', (req, res, next) => {
    const {
      name,
      city,
      state,
      profileImage,
      email
    } = req.body;

    People
      .create({ name, city, state, profileImage, email })
      .then(peoples => res.send(peoples))
      .catch(next);
  });