require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");

const app = express();

// Allow multiple origins including your current frontend URL
const allowedOrigins = [
  'https://user-pmfu576e0-kishan-25s-projects.vercel.app',
  'https://user-lgaprdumv-kishan-25s-projects.vercel.app'
  // Add any other URLs you need to allow
];

app.use(cors({
  origin: function(origin, callback) {
    // Allow requests with no origin (like mobile apps, Postman)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1) {
      return callback(null, true);
    }
    return callback(null, false);
  },
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