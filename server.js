// require("dotenv").config();
// const express = require("express");
// const { connectDB } = require("./db/db");
// const cors = require("cors");
// const userRoutes = require('./routes/userRoutes');
// const homeRoutes = require('./routes/homeRoutes');
// const categoryRoutes = require('./routes/categoryRoutes');


// connectDB();

// const app = express();
// app.use(express.json());
// app.use(cors());



// app.use('/api/home', homeRoutes);
// app.use('/api/users', userRoutes);
// app.use('/api/categories', categoryRoutes);


// const PORT = process.env.PORT || 8080;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


// server.js
require('dotenv').config();
const express = require('express');
const { connectDB } = require('./db/db');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const homeRoutes = require('./routes/homeRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes'); 

connectDB();

const app = express();
app.use(express.json());
app.use(cors());

app.use('/api/home', homeRoutes);
app.use('/api/users', userRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/appointments', appointmentRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
