// const express = require('express');
// const crypto = require('crypto');
// const Razorpay = require('razorpay');
// const Appointment = require('../models/appointments');

// const router = express.Router();

// const Service = require('../models/Service'); //

// router.post("/", async (req, res) => {
//   console.log("inside Paymentroutes/order---------------");
//   const AppointmentData = req.body;
//   console.log(`AppointmentData : ${AppointmentData}`)

//   // Step 1: Fetch the cost of the service from MongoDB
//   try {
//     const service = await Service.findById(AppointmentData.serviceId);
//     console.log("service : " , service)
//     if (!service) {
//       return res.status(404).json({ message: 'Service not found' });
//     }

//     const amount_to_pay = service.charges;
//     console.log(`Amount to pay : ${amount_to_pay}`);

//     // Step 2: Create Razorpay order
//     try {
//       const instance = new Razorpay({
//         key_id: process.env.API_KEY,
//         key_secret: process.env.API_SECRET_KEY,
//       });
//       const options = {
//         amount: amount_to_pay * 100,
//         currency: "INR",
//         receipt: crypto.randomBytes(10).toString("hex"),
//       };
//       instance.orders.create(options, async (error, order) => {
//         if (error) {
//           return res.status(500).json({ message: "Something Went Wrong" });
//         }
//         res.status(200).json({ data: order, saveAppointment: AppointmentData });
//       });
//     } catch (error) {
//       return res.status(500).json({ message: "Internal Server Error" });
//     }

//   } catch (error) {
//     return res.status(500).json({ message: "Internal Server Error fetching service" });
//   }
// });

// // router.post("/", async (req, res) => {
// //   console.log("inside Paymentroutes/order---------------")
// //   const AppointmentData = req.body;

// //   const amount_to_pay = AppointmentData.book_cost;
// //   try {
// //     const instance = new Razorpay({
// //       key_id: process.env.API_KEY,
// //       key_secret: process.env.API_SECRET_KEY,
// //     });
// //     const options = {
// //       amount: amount_to_pay * 100,
// //       currency: "INR",
// //       receipt: crypto.randomBytes(10).toString("hex"),
// //     };
// //     instance.orders.create(options, async (error, order) => {
// //       if (error) {
// //         return res.status(500).json({ message: "Something Went Wrong" });
// //       }
// //       res.status(200).json({ data: order, saveAppointment: AppointmentData });
// //     });
// //   } catch (error) {
// //     return res.status(500).json({ message: "Internal Server Error" });
// //   }
// // });

// router.post("/verify", async (req, res) => {
//   try {
//     const { response, AppointmentData } = req.body;
//     const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = response;

//     const sign = razorpay_order_id + "|" + razorpay_payment_id;
//     const expectedsign = crypto
//       .createHmac("sha256", process.env.API_SECRET_KEY)
//       .update(sign)
//       .digest("hex");

//     if (razorpay_signature === expectedsign) {
//       // Assuming Booking is a mongoose model
//       const saveAppointment = new Appointment({
//         userId: AppointmentData.userId,
//         serviceId: AppointmentData.serviceId,
//         date: AppointmentData.date,
//         time: AppointmentData.time,
//         status: 'pending', // Set the default status or adjust as needed
//         paymentId: razorpay_payment_id,
//       });

//       saveAppointment.save();

//       return res.status(200).json({ message: "Payment verified successfully" });
//     }
//   } catch (error) {
//     res.status(500).json({ message: "Internal Server Error!" });
//   }
// });

// module.exports = router;

//------------------------------------------------------------------------------------------------------------------------------------------------

// const express = require('express');
// const crypto = require('crypto');
// const Razorpay = require('razorpay');
// const Appointment = require('../models/appointments');

// const router = express.Router();

// const Service = require('../models/Service');

// router.post("/", async (req, res) => {
//   try {
//     console.log("Received payment creation request:", req.body);

//     const AppointmentData = req.body;

//     // Step 1: Fetch the cost of the service from MongoDB
//     const service = await Service.findById(AppointmentData.serviceId);

//     if (!service) {
//       console.error("Service not found");
//       return res.status(404).json({ message: 'Service not found' });
//     }

//     const amount_to_pay = service.charges;

//     console.log(`Amount to pay: ${amount_to_pay}`);

//     // Step 2: Create Razorpay order
//     const instance = new Razorpay({
//       key_id: process.env.API_KEY,
//       key_secret: process.env.API_SECRET_KEY,
//     });

//     const options = {
//       amount: amount_to_pay * 100,
//       currency: "INR",
//       receipt: crypto.randomBytes(10).toString("hex"),
//     };

//     instance.orders.create(options, async (error, order) => {
//       if (error) {
//         console.error("Error creating Razorpay order:", error);
//         return res.status(500).json({ message: "Something Went Wrong" });
//       }

//       console.log("Razorpay order created:", order);

//       res.status(200).json({ data: order, saveAppointment: AppointmentData });
//     });
//   } catch (error) {
//     console.error("Internal Server Error fetching service:", error);
//     return res.status(500).json({ message: "Internal Server Error fetching service" });
//   }
// });

// router.post("/verify", async (req, res) => {
//   try {
//     const { response, AppointmentData } = req.body;
//     const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = response;

//     const sign = razorpay_order_id + "|" + razorpay_payment_id;
//     const expectedsign = crypto
//       .createHmac("sha256", process.env.API_SECRET_KEY)
//       .update(sign)
//       .digest("hex");

//     if (razorpay_signature === expectedsign) {
//       // Assuming Booking is a mongoose model
//       const saveAppointment = new Appointment({
//         userId: AppointmentData.userId,
//         serviceId: AppointmentData.serviceId,
//         date: AppointmentData.date,
//         time: AppointmentData.time,
//         status: 'pending', // Set the default status or adjust as needed
//         paymentId: razorpay_payment_id,
//       });

//       saveAppointment.save();

//       console.log("Payment verified successfully");

//       return res.status(200).json({ message: "Payment verified successfully" });
//     }
//   } catch (error) {
//     console.error("Internal Server Error:", error);
//     res.status(500).json({ message: "Internal Server Error!" });
//   }
// });

// module.exports = router;

//------------------------------------------------------------------------------------------------------------------------

const express = require("express");
const crypto = require("crypto");
const Razorpay = require("razorpay");
const Appointment = require("../models/appointments");
const Service = require("../models/Service");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    console.log("Received payment creation request:", req.body);

    const AppointmentData = req.body;

    // Step 1: Fetch the cost of the service from MongoDB
    const service = await Service.findById(AppointmentData.serviceId);

    if (!service) {
      console.error("Service not found");
      return res.status(404).json({ message: "Service not found" });
    }

    const amount_to_pay = service.charges * 100; // Convert to paise (if the currency is INR)

    console.log(`Amount to pay: ${amount_to_pay}`);

    // Step 2: Create Razorpay order
    const instance = new Razorpay({
      key_id: process.env.REACT_APP_API_KEY,
      key_secret: process.env.REACT_APP_API_SECRET_KEY,
    });

    const options = {
      amount: amount_to_pay,
      currency: "INR",
      receipt: crypto.randomBytes(10).toString("hex"),
    };

    instance.orders.create(options, async (error, order) => {
      if (error) {
        console.error("Error creating Razorpay order:", error);
        return res
          .status(500)
          .json({ message: "Error creating Razorpay order" });
      }

      console.log("Razorpay order created:", order);

      res.status(200).json({ data: order, saveAppointment: AppointmentData });
    });
  } catch (error) {
    console.error("Internal Server Error fetching service:", error);
    return res
      .status(500)
      .json({ message: "Internal Server Error fetching service" });
  }
});

router.post("/verify", async (req, res) => {
  try {
    const { response, AppointmentData } = req.body;

    console.log("body in verify : ", req.body);
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      response;

    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedsign = crypto
      .createHmac("sha256", process.env.REACT_APP_API_SECRET_KEY)
      .update(sign)
      .digest("hex");

    if (razorpay_signature === expectedsign) {
      const saveAppointment = new Appointment({
        userId: AppointmentData.userId,
        serviceId: AppointmentData.serviceId,
        date: AppointmentData.date,
        time: AppointmentData.time,
        status: "pending", 
        paymentId: razorpay_payment_id,
      });

      saveAppointment.save();

      console.log("Payment verified successfully");

      return res.status(200).json({ message: "Payment verified successfully" });
    }
  } catch (error) {
    console.error("Internal Server Error:", error);
    res.status(500).json({ message: "Internal Server Error!" });
  }
});

module.exports = router;
