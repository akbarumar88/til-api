import express from "express"
import dotenv from "dotenv"
import db from "./config/db2.js"

dotenv.config()

var app = express()

import cors from "cors"
import { empty } from "./helper/function.js"
import moment from "moment"

app.use(cors()) // Use this after the variable declaration

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log("Server running on port " + PORT)
})