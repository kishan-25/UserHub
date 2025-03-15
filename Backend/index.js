require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");

const app = express();

// Update your CORS configuration with specific settings
app.use(cors({
  origin: 'https://user-pmfu576e0-kishan-25s-projects.vercel.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(bodyParser.json());

//connect to db
connectDB();

//import routes
const userRoutes = require("./routes/userRoutes");
app.use("/users", userRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));