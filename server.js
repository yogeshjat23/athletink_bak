
const loginRoutes = require("./routes/LoginRoutes");
const signUpRoutes = require("./routes/SignUpRoutes");
const PostRouter = require('./routes/PostRouter')
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors({origin: ['http://localhost:3000', 'https://athletink-bak.onrender.com'],

  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type']
 }));

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

