const mongoose = require('mongoose')

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
    duration: {
      type: Number,
      required: true,
    },
    availability: {
      type: Boolean,
      required: true,
    },
  })
  
  const Service = mongoose.model("service", serviceSchema)
  module.exports = Service