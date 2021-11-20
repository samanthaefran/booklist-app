// dependencies
const express = require('express')
const app = express();
const mongoose = require('mongoose')
const Book = require('./models/book')
const methodOverride = require("method-override")

// configure
require("dotenv").config()

// database connection
mongoose.connect(process.env.DATABASE_URL)

// database connection error/success
// define callback functions for various events
const db = mongoose.connection;
db.on("error", (err) => console.log(err.message + ' is mongo not running?'))
db.on("connected", () => console.log("mongo connected"))
db.on("disconnected", () => console.log("mongo is disconnected"))



//    -------- mount middleware --------
app.use(express.urlencoded({ extended: false })); //creates req.body
app.use(methodOverride("_method"))

//     ------- mount routes --------


//            seed route
app.get('/books/seed', async (req, res) => {
  const data = [
    {
      title: 'The War of Art',
      author: 'Sun Tzu'
    },
    {
      title: 'Harry Potter',
      author: 'JK Rowling'
    },
    {
      title: 'A Series of Unfortunate Events',
      author: 'Lemony Snickett'
    },
  ];
  await Book.deleteMany({});
  await Book.create(data)
  res.redirect('/books');
});

app.get('/destroy-data', async(req, res) => {
  await Book.deleteMany({});
  res.redirect('/books');
});

//          index route 
app.get("/books", (req, res) => {
  Book.find({}, (error, books) => { 
    res.render("index.ejs", { books });
  });
});

//           new route
app.get('/books/new', (req, res) => {
  res.render('new.ejs');
});


//          delete route 
app.delete("/books/:id", (req, res) => {
  Book.findByIdAndDelete(req.params.id, (err, deletedBook) => {
    res.redirect('/books');
  });
});

//          create route
app.post("/books", (req, res) => {
  if (req.body.completed === "on") {
    req.body.completed = true
    // if checked, req.body.completed is set to 'on'
  } else {
    // if not checked, req.body.completed is undefined
    req.body.completed = false
  }
  Book.create(req.body, (error, createdBook) => {
    res.redirect('/books')
  })
});

//              edit route
app.get('/books/:id/edit', (req, res) => {
  Book.findById(req.params.id, (error, foundBook) => {
    res.render("edit.ejs", {
      book: foundBook,
    });
  });
});

//              show route

app.get('/books/:id', (req, res) => {
  Book.findById(req.params.id, (err, book) => {
    res.render("show.ejs", {book})
  });
});

// create route 

// listener 
const PORT = process.env.PORT //heroku or any cloud service will set this value for us
app.listen(PORT, () => console.log(`works ${PORT}`));
