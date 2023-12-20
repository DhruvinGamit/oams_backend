const mongoose = require('mongoose')

const appointmentSchema = new mongoose.Schema({
    userId: {
      type: mongoose.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    serviceId: {
      type: mongoose.Types.ObjectId,
      ref: 'service',
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
  }, {
    timestamps: true,
  })
  
  const Appointment = mongoose.model('appointment', appointmentSchema)
  module.exports = Appointment