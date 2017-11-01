const mongoose = require('mongoose')
const Schema = mongoose.Schema

/**
 * Mongoose Twit Schema
 */
const Twit = new Schema({
  createdAt: {
    type: String,
  },
  text: {
    type: String,
  },
  place: {
  	type: Object
  }
})

module.exports = mongoose.model('twit', Twit)