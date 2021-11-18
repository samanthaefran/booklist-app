// dependencies
const express = require('express')
const app = express();
require("dotenv").config()
const mongoose = require('mongoose')

// database connection
mongoose.connect(process.env.DATABASE_URL)

// database connection error/success
// define callback functions for various events
const db = mongoose.connection
db.on("error", (err) => console.log(err.message + ' is mongo not running?'))
db.on("connected", () => console.log("mongo connected"))
db.on("disconnected", () => console.log("mongo is disconnected"))

// listener 
const PORT = process.env.PORT
app.listen(PORT, () => console.log(`works ${PORT}`));