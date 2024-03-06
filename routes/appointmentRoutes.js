// appointmentRoutes.js
const express = require("express");
const router = express.Router();
const Appointment = require("../models/appointments");
const nodemailer = require("nodemailer");
const Service = require("../models/Service");
const User = require("../models/User");

// Create a new appointment
router.post("/", async (req, res) => {
  try {
    const { userId, serviceId, date, time, paymentId } = req.body; // Include paymentId in the destructuring

    const appointment = new Appointment({
      userId,
      serviceId,
      date,
      time,
      status: "pending",
      paymentId, // Include the paymentId in the appointment creation
    });

    await appointment.save();

    // Send email upon successful appointment creation
    sendAppointmentRequestConfirmationEmail(userId, date, time, serviceId);
    sendAppointmentConfirmationEmail(userId, date, time, serviceId);

    res
      .status(201)
      .json({ message: "Appointment created successfully.", appointment });
  } catch (error) {
    console.error("Error creating appointment:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});


// Function to send appointment request confirmation email
const sendAppointmentRequestConfirmationEmail = async (
  userId,
  date,
  time,
  serviceId
) => {
  try {
    const service = await Service.findById(serviceId);
    if (!service) {
      console.error("Service not found for serviceId:", serviceId);
      return;
    }
    const currentUser = await User.findById(userId);
    const currUserEmail = currentUser.email;

    console.log("userId : ", userId);
    console.log("currUserEmail : ", currUserEmail);

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "dhruving21@gmail.com",
        pass: "lqlo pjsm zxrm vlwi",
      },
    });

    const mailOptions = {
      from: "dhruving21@gmail.com",
      to: currUserEmail,
      subject: "Appointment Confirmation",
      text: `Your appointment request has been generated succsesfully.\nDate: ${date}\nTime: ${time}`,
    };

    const info = await transporter.sendMail(mailOptions);

    console.log(
      "Email sent  from sendAppointmentRequestConfirmationEmail :",
      info.response
    );
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

const sendAppointmentConfirmationEmail = async (
  userId,
  date,
  time,
  serviceId
) => {
  try {
    const service = await Service.findById(serviceId);
    if (!service) {
      console.error("Service not found for serviceId:", serviceId);
      return;
    }

    // const currentUserId = window.localStorage.getItem("UserId")
    const currentUser = await User.findById(userId);
    const currUserEmail = currentUser.email;

    console.log("userId : ", userId);
    console.log("currUserEmail : ", currUserEmail);
    const serviceUserId = service.userId;
    const user = await User.findById(serviceUserId);

    if (!user) {
      console.error("User not found for userId:", serviceUserId);
      return;
    }

    const userEmail = user.email;
    console.log("ServiceUser email : ", userEmail);
    // console.log(userEmail);

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "dhruving21@gmail.com",
        pass: "lqlo pjsm zxrm vlwi",
      },
    });

    const mailOptions = {
      from: "dhruving21@gmail.com",
      to: userEmail,
      subject: "Appointment Confirmation",
      text: `your service has been requested by ${currUserEmail}.\nDate: ${date}\nTime: ${time}`,
    };

    const info = await transporter.sendMail(mailOptions);

    console.log(
      "Email sent from sendAppointmentConfirmationEmail :",
      info.response
    );
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

// Fetch appointments for the logged-in user
router.get("/RequestedServices", async (req, res) => {
  try {
    const userId = req.query.userId;
    console.log(userId);

    const appointments = await Appointment.find({ userId: userId }).populate({
      path: "serviceId",
      select: "title",
    });

    res.status(200).json({ appointments });
  } catch (error) {
    console.error("Error fetching appointments:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});

// Delete appointment
router.delete("/:id", async (req, res) => {
  try {
    const appointmentId = req.params.id;
    const deletedAppointment = await Appointment.findByIdAndDelete(
      appointmentId
    );

    if (!deletedAppointment) {
      return res.status(404).json({ error: "Appointment not found." });
    }

    res.status(200).json({ message: "Appointment deleted successfully." });
  } catch (error) {
    console.error("Error deleting appointment:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});

// Update appointment status
router.patch("/:id", async (req, res) => {
  try {
    const appointmentId = req.params.id;
    const { status } = req.body;

    const updatedAppointment = await Appointment.findByIdAndUpdate(
      appointmentId,
      { status },
      { new: true } // Return the updated document
    );

    if (!updatedAppointment) {
      return res.status(404).json({ error: "Appointment not found." });
    }

    res.status(200).json({
      message: `Appointment ${status} successfully.`,
      appointment: updatedAppointment,
    });
  } catch (error) {
    console.error(`Error updating appointment status:`, error);
    res.status(500).json({ error: "Internal server error." });
  }
});

// Fetch appointments for the logged-in user
router.get("/ServiceAppointments", async (req, res) => {
  try {
    const userId = req.query.userId;

    // Fetch all services associated with the user
    const services = await Service.find({ userId });
    console.log("services------");
    console.log(services);

    // Extract serviceIds from services
    const serviceIds = services.map((service) => service._id);
    console.log("serviceIds------");
    console.log(serviceIds);

    // Fetch appointments for the user and serviceIds
    const appointments = await Appointment.find({
      serviceId: { $in: serviceIds },
    });
    console.log("appointments------");
    console.log(appointments);

    res.status(200).json({ appointments });
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});

// Notify and send email
router.post("/notify", async (req, res) => {
  try {
    const { appointmentId, status } = req.body;

    // Implement the logic to send the email here using nodemailer
    const appointment = await Appointment.findById(appointmentId).populate({
      path: "userId",
      select: "email",
    });

    if (!appointment || !appointment.userId) {
      return res.status(404).json({ error: "Appointment or user not found." });
    }

    const AppointUserId = appointment.userId;
    const user = await User.findById(AppointUserId);
    // const { email: userEmail, date, time } = user;
    const userEmail = user.email;
    const currentDate = new Date();
    const date = currentDate.toISOString().split("T")[0]; // Format as 'YYYY-MM-DD'
    const time = currentDate.toTimeString().split(" ")[0]; // Format as 'HH:mm:ss'

    await sendAppointmentStatusEmail(userEmail, date, time, status);

    res.status(200).json({ message: "Notification sent successfully." });
  } catch (error) {
    console.error("Error notifying and sending email:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});

// Function to send appointment status email
const sendAppointmentStatusEmail = async (userEmail, date, time, status) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "dhruving21@gmail.com",
        pass: "lqlo pjsm zxrm vlwi",
      },
    });

    const mailOptions = {
      from: "dhruving21@gmail.com",
      to: userEmail,
      subject: `Appointment ${status} Notification`,
      text: `Your appointment status has been updated.\nDate: ${date}\nTime: ${time}\nStatus: ${status}`,
    };

    const info = await transporter.sendMail(mailOptions);

    console.log("Email sent:", info.response);
  } catch (error) {
    console.error("Error sending status email:", error);
  }
};

module.exports = router;
