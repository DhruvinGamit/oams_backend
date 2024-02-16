// // appointmentRoutes.js
// const express = require('express');
// const router = express.Router();
// const Appointment = require('../models/appointments');

// // Create a new appointment
// router.post('/', async (req, res) => {
//   try {
//     const { userId, serviceId, date, time } = req.body;

//     const appointment = new Appointment({
//       userId,
//       serviceId,
//       date,
//       time,
//     });

//     await appointment.save();
//     res.status(201).json({ message: 'Appointment created successfully.' });
//   } catch (error) {
//     console.error('Error creating appointment:', error);
//     res.status(500).json({ error: 'Internal server error.' });
//   }
// });

// // Fetch appointments for the logged-in user
// router.get('/user', async (req, res) => {
//   try {
//     const userId = req.query.userId;

//     const appointments = await Appointment.find({ userId }).populate({
//       path: 'serviceId',
//       select: 'title', 
//     });
//     res.status(200).json({ appointments });
//   } catch (error) {
//     console.error('Error fetching appointments:', error);
//     res.status(500).json({ error: 'Internal server error.' });
//   }
// });

// // Delete appointment
// router.delete('/:id', async (req, res) => {
//   try {
//       const appointmentId = req.params.id;
//       const deletedAppointment = await Appointment.findByIdAndDelete(appointmentId);

//       if (!deletedAppointment) {
//           return res.status(404).json({ error: 'Appointment not found.' });
//       }

//       res.status(200).json({ message: 'Appointment deleted successfully.' });
//   } catch (error) {
//       console.error('Error deleting appointment:', error);
//       res.status(500).json({ error: 'Internal server error.' });
//   }
// });

// // Fetch appointments for the service owner
// router.get('/service', async (req, res) => {
//   try {
//     const serviceId = req.user.id; // Replace with the actual service ID
//     const appointments = await Appointment.find({ serviceId });
//     res.status(200).json({ appointments });
//   } catch (error) {
//     console.error('Error fetching appointments:', error);
//     res.status(500).json({ error: 'Internal server error.' });
//   }
// });

// module.exports = router;


// appointmentRoutes.js
const express = require('express');
const router = express.Router();
const Appointment = require('../models/appointments');
const nodemailer = require('nodemailer');
const Service = require('../models/Service');
const User = require('../models/User');


// Create a new appointment
router.post('/', async (req, res) => {
  try {
    const { userId, serviceId, date, time } = req.body;

    const appointment = new Appointment({
      userId,
      serviceId,
      date,
      time,
    });

    await appointment.save();

    // Send email upon successful appointment creation
    sendAppointmentConfirmationEmail(userId, date, time, serviceId);

    res.status(201).json({ message: 'Appointment created successfully.' });
  } catch (error) {
    console.error('Error creating appointment:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

// Function to send appointment confirmation email
const sendAppointmentConfirmationEmail = async (userId, date, time, serviceId) => {
  try {

    const service = await Service.findById(serviceId);
    if (!service) {
      console.error('Service not found for serviceId:', serviceId);
      return;
    }

    const serviceUserId = service.userId;
    const user = await User.findById(serviceUserId);

    if (!user) {
      console.error('User not found for userId:', serviceUserId);
      return;
    }

    const userEmail = user.email;
    console.log("user email")
    console.log(userEmail)

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'dhruving21@gmail.com', 
        pass: 'lqlo pjsm zxrm vlwi', 
      },
    });

    const mailOptions = {
      from: 'dhruving21@gmail.com', 
      to: userEmail , 
      subject: 'Appointment Confirmation',
      text: `Your appointment for service ID ${serviceId} is confirmed.\nDate: ${date}\nTime: ${time}`,
    };

    const info = await transporter.sendMail(mailOptions);

    console.log('Email sent:', info.response);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};


// Fetch appointments for the logged-in user
router.get('/user', async (req, res) => {
  try {
    const userId = req.query.userId;

    const appointments = await Appointment.find({ userId : userId }).populate({
      path: 'serviceId',
      select: 'title', 
    });
    res.status(200).json({ appointments });
  } catch (error) {
    console.error('Error fetching appointments:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

// Delete appointment
router.delete('/:id', async (req, res) => {
  try {
    const appointmentId = req.params.id;
    const deletedAppointment = await Appointment.findByIdAndDelete(appointmentId);

    if (!deletedAppointment) {
      return res.status(404).json({ error: 'Appointment not found.' });
    }

    res.status(200).json({ message: 'Appointment deleted successfully.' });
  } catch (error) {
    console.error('Error deleting appointment:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});


// Fetch appointments for the service owner
// router.get('/service', async (req, res) => {
//   try {
//     const userId = req.query.userId; 
//     const appointments = await Appointment.find({ serviceId });
//     res.status(200).json({ appointments });
//   } catch (error) {
//     console.error('Error fetching appointments:', error);
//     res.status(500).json({ error: 'Internal server error.' });
//   }
// });
//--------------------------------------------------------------------------------------------------------------
// router.get('/appointments', async (req, res) => {
//   try {
//     const userId = req.query.userId;

//     // Fetch all services associated with the user
//     const services = await Service.find({ userId });
//     console.log("service------")
//     console.log(services)
    
//     // Extract serviceIds from services
//     const serviceIds = services.map(service => service._id);
//     console.log("serviceIds------")
//     console.log(serviceIds)

//     // Fetch appointments for the user and serviceIds
//     const appointments = await Appointment.find({ serviceId: { $in: serviceIds } });
//     console.log("appointments------")
//     console.log(appointments)


//     res.status(200).json({ appointments });
//   } catch (error) {
//     console.error('Error fetching data:', error);
//     res.status(500).json({ error: 'Internal server error.' });
//   }
// });

// Fetch appointments for the logged-in user
router.get('/service', async (req, res) => {
  try {
    const userId = req.query.userId;

    // Fetch all services associated with the user
    const services = await Service.find({ userId });
    console.log("services------")
    console.log(services)
    
    // Extract serviceIds from services
    const serviceIds = services.map(service => service._id);
    console.log("serviceIds------")
    console.log(serviceIds)

    // Fetch appointments for the user and serviceIds
    const appointments = await Appointment.find({ serviceId: { $in: serviceIds } });
    console.log("appointments------")
    console.log(appointments)

    res.status(200).json({ appointments });
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});





module.exports = router;
