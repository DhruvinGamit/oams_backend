require("dotenv").config();
const express = require("express");
const { connectDB } = require("./db/db");
const cors = require("cors");
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');

connectDB();

const app = express();
app.use(express.json());
app.use(cors());

app.use('/api/users', userRoutes);
//app.use(bodyParser.json());


const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
