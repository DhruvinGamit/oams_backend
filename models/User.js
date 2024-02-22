// const mongoose = require('mongoose');

// const userSchema = new mongoose.Schema({
//   email: {
//     type: String,
//     unique: true,
//     required: true,
//   },
//   password: {
//     type: String,
//     required: true,
//   },
//   fullName: String,
//   address: String,
//   contact: {
//     type: String,
//     required: true,
//   },
// }, {
//   timestamps: true,
// });

// const User = mongoose.model('User', userSchema);
// module.exports = User;


// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  fullName: String,
  address: String,
  contact: {
    type: String,
    required: true,
  },
  isProvider: {
    type: Boolean,
    default: false, // Default value is false, meaning the user is not a provider by default
  },
}, {
  timestamps: true,
});

const User = mongoose.model('User', userSchema);
module.exports = User;
