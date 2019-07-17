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
  })
  .get('/', (req, res, next) => {
    People
      .find()
      .then(people => res.send(people))
      .catch(next);
  })
  .get('/:id', (req, res, next) => {
    People
      .findById(req.params.id)
      .then(people => res.send(people))
      .catch(next);
  })
  .put('/:id', (req, res, next) => {
    People
      .findByIdAndUpdate(req.params.id, req.body, { new: true })
      .then(updatedPeople => res.send(updatedPeople))
      .catch(next);
  });
