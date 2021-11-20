// dependencies
const express = require('express')
const mongoose = require('mongoose')
const methodOverride = require("method-override")
const booksRouter = require('./controllers/books');
// initialize app
const app = express();


// configure
require("dotenv").config()

// database connection
mongoose.connect(process.env.DATABASE_URL)

// database connection error/success
// define callback functions for various events
const db = mongoose.connection;
db.on("connected", () => console.log("mongo connected"))
db.on("disconnected", () => console.log("mongo is disconnected"))



//    -------- mount middleware --------
app.use(express.urlencoded({ extended: false })); //creates req.body
app.use(methodOverride("_method"))
// mount routes
app.use('/', booksRouter);


// listener 
const PORT = process.env.PORT //heroku or any cloud service will set this value for us
app.listen(PORT, () => console.log(`works ${PORT}`));
