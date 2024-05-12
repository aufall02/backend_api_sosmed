import express, { json} from "express";
const app = express();
import { config } from "dotenv";
import cors from "cors";
import morgan from "morgan";
import { set } from "mongoose";
import auth from "./routes/auth.js";
import posts from "./routes/posts.js";
import features from "./routes/features.js";


// CONFIG
config();
import "./config/Db.js";
set('strictQuery', true);



// MIDDLEWEARES
app.use(cors());
app.use(json());
app.use(morgan("dev")); // for logging

// ROUTES
app.use("/api/v1", auth);
app.use("/api/v1", posts);
app.use("/api/v1", features);
app.get("/", (req, res) => {
    res.send({"hello": "world"});
  });

app.get("*", (req, res) => {
    res.send({"message": "hayoo cari apa"});
});


const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log(`SERVER RUNNING ON PORT: ${PORT}`)
});
