//           require dependencies 
const express = require('express');
//          create a router object
const booksRouter = express.Router();

const Book = require('../models/book');
//          list our router actions 


//            seed route
booksRouter.get('/books/seed', async (req, res) => {
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

booksRouter.get('/destroy-data', async (req, res) => {
  await Book.deleteMany({});
  res.redirect('/books');
});

//          index route 
booksRouter.get("/books", (req, res) => {
  Book.find({}, (error, books) => {
    res.render("index.ejs", { books });
  });
});

//           new route
booksRouter.get('/books/new', (req, res) => {
  res.render('new.ejs');
});


//          delete route 
booksRouter.delete("/books/:id", (req, res) => {
  Book.findByIdAndDelete(req.params.id, (err, deletedBook) => {
    res.redirect('/books');
  });
});

//          update route
booksRouter.put("/books/:id", (req, res) => {
  if (req.body.completed === "on") {
    req.body.completed = true
  } else {
    req.body.completed = false
  }
  Book.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    },
    (error, updateBook) => {
      res.redirect(`/books/${req.params.id}`)
    }
  )
})

//          create route
booksRouter.post("/books", (req, res) => {
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
booksRouter.get('/books/:id/edit', (req, res) => {
  Book.findById(req.params.id, (error, foundBook) => {
    res.render("edit.ejs", {
      book: foundBook,
    });
  });
});

//              show route

booksRouter.get('/books/:id', (req, res) => {
  Book.findById(req.params.id, (err, book) => {
    res.render("show.ejs", { book })
  });
});

//             create route

module.exports= booksRouter;
// export the router object so that we can require it in server.js