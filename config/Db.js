import { connect } from "mongoose";
import { config } from "dotenv";
config();

connect(process.env.MONGO_URI)
 .then(() => console.log('DATABASE CONNECTED'))
 .catch(err => {
  console.log('DATABASE CONNECTION ERROR', err)
  process.exit(1)
 })

