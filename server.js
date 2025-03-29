const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

// Import Routes
const loginRoutes = require("./routes/LoginRoutes");
const signUpRoutes = require("./routes/SignUpRoutes");
const PostRouter = require("./routes/PostRouter");

const app = express();
const port = process.env.PORT || 5000;

// CORS Setup
const allowedOrigins = ["https://athletelink-frontend.onrender.com"];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(express.json());

// Connect MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => {
    console.error("Failed to connect to MongoDB", err);
    process.exit(1);
  });

// API Routes
app.use("/api/", loginRoutes);
app.use("/api/", signUpRoutes);
app.use("/api/", PostRouter);

//  Serve React Frontend
const __dirname1 = path.resolve();
app.use(express.static(path.join(__dirname1, "client", "build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname1, "client", "build", "index.html"));
});

// Start Server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});



{/* 
const loginRoutes = require("./routes/LoginRoutes");
const signUpRoutes = require("./routes/SignUpRoutes");
const PostRouter = require('./routes/PostRouter')
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;


const allowedOrigins = ['https://athletelink-frontend.onrender.com']; // Replace with actual frontend domain(s)

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'], 
  allowedHeaders: ['Content-Type', 'Authorization'], 
  credentials: true 
}));


app.options('*', (req, res) => {
  if (allowedOrigins.includes(req.header('Origin'))) {
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.sendStatus(200);
  } else {
    res.sendStatus(403);
  }
});

app.use(express.json());
app.use(express.json());  


mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log("MongoDB connected"))
.catch((err) => {
  console.error("Failed to connect to MongoDB", err);
  process.exit(1);
});
app.get("/", (req, res) => {
  res.send("Welcome to the Sports Connect API!");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
app.use("/api/", loginRoutes);
app.use("/api/", signUpRoutes);
app.use("/api/", signUpRoutes);
app.use("/api/" , PostRouter);
app.use("/api/" , PostRouter);
app.use("/api/" ,PostRouter )

 */}