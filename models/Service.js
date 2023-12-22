// const mongoose = require('mongoose')

// const serviceSchema = mongoose.Schema({
//     userId: {
//       type: mongoose.Types.ObjectId,
//       ref: 'user',
//       required: true,
//     },
//     title: {
//       type: String,
//       required: true,
//     },
//     description: {
//       type: String,
//       required: true,
//     },
//     charges: {
//       type: Number,
//       required: true,
//     },
//     duration: {
//       type: Number,
//       required: true,
//     },
//     availability: {
//       type: Boolean,
//       required: true,
//     },
//   })
  
//   const Service = mongoose.model("service", serviceSchema)
//   module.exports = Service

const mongoose = require('mongoose');

const serviceSchema = mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  charges: {
    type: Number,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  image: {
    type: String, 
    required: true,
  },
});

const Service = mongoose.model('service', serviceSchema);

module.exports = Service;

