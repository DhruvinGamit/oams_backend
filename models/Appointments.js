// const mongoose = require('mongoose');


// const appointmentSchema = new mongoose.Schema({
//   userId: {
//     type: mongoose.Types.ObjectId,
//     ref: 'User', // Use 'User' instead of 'user'
//     required: true,
//   },
//   serviceId: {
//     type: mongoose.Types.ObjectId,
//     ref: 'Service', // Use 'Service' instead of 'service'
//     required: true,
//   },
//   date: {
//     type: Date,
//     required: true,
//   },
//   time: {
//     type: String,
//     required: true,
//   },
//   status: {
//     type: String,
//     enum: ['pending', 'accepted', 'rejected'],
//     default: 'pending',
//   },
// }, {
//   timestamps: true,
// });


// const Appointment = mongoose.model('Appointment', appointmentSchema);
// module.exports = Appointment;


const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  serviceId: {
    type: mongoose.Types.ObjectId,
    ref: 'Service',
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected'],
    default: 'pending',
  },
  paymentId: {
    type: String, // Adjust the type based on what Razorpay returns for payment_id
    required: true,
  },
}, {
  timestamps: true,
});

const Appointment = mongoose.model('Appointment', appointmentSchema);
module.exports = Appointment;
