const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const morgan = require("morgan");
// const router = express.Router();
const mongoose = require("mongoose");
// MIDDLEWEARES
dotenv.config({ path: "./config/.env" });
require("./config/Db");
mongoose.set('strictQuery', true);

app.use(cors());
app.use(express.json());
app.use(morgan("dev")); // for logging

// ROUTES
app.use("/api/v1", require("./routes/posts"));
app.use("/api/v1", require("./routes/auth"));
app.use("/api/v1", require("./routes/features"));
// app.get("/", (req, res) => {
//     res.send("Hello word");
//   });
PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`SERVER RUNNING ON PORT: ${PORT}`));
