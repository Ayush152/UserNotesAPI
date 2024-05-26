const dotenv = require("dotenv");
dotenv.config()
const express = require("express");
const app = express();

const userRouter = require("./routes/userRoutes");
const noteRouter = require("./routes/noteRoutes");

const cors = require("cors");

const mongoose = require("mongoose");
const password = encodeURIComponent(process.env.PASSWORD);

const PORT = process.env.PORT || 8000;
const HOST = process.env.HOST || '0.0.0.0';

app.use(express.json());
app.use(cors());

// TESTING MIDDLEWARE
// app.use((req, res, next) => {
//   console.log("HTTP method - " + req.method + " URL - " + req.url + " Time - " + new Date().toISOString());
//   next();
// })

app.use("/users", userRouter);
app.use("/note", noteRouter);

app.get("/", (req, res) => {
  res.send("Welcome to the Notes App");
})

mongoose.connect(process.env.MONGO_URI.replace("${PASSWORD}", password))
.then(() => {
  app.listen(PORT, HOST, () => {
    console.log("Server is running on port and host " + PORT + " " + HOST);
  })  
})
.catch((err) => {
  console.log(err);
})

