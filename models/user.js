const mongoose = require('mongoose')

// User Schema
const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
})

const user = module.exports = mongoose.model('User', userSchema)
