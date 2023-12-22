require("dotenv").config();
const express = require("express");
const { connectDB } = require("./db/db");
const cors = require("cors");
const userRoutes = require('./routes/userRoutes');
const homeRoutes = require('./routes/homeRoutes');

connectDB();

const app = express();
app.use(express.json());
app.use(cors());



app.use('/api/home', homeRoutes);
app.use('/api/users', userRoutes);


const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
