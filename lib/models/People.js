const mongoose = require('mongoose');

const peopleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: false
  },
  state: {
    type: String,
    required: false
  },
  profileImage: {
    type: String,
    required: false
  },
  email: {
    type: String,
    required: true
  }
});

const People = mongoose.model('People', peopleSchema);

module.exports = People;