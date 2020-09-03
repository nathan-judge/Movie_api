const express = require('express');
const morgan = require('morgan');
const fs = require('fs');
const bodyParser = require('body-parser'),
methodOverride = require('method-override');


const app = express();
let topMovies = [
    {
      title: 'Harry Potter and the Sorcerer\'s Stone',
    
    },
  
    {
      title: 'Lord of the Rings'
    },
  
    {
      title: 'Goodfellas'
    },
  
    {
      title: 'Casino'
    },
  
    {
      title: 'Godfather'
    },
  
    {
      title: 'Donni Brasco'
    },
  
    {
      title: 'Irishman'
    },
  
    {
      title: 'Snowden'
    },
  
    {
      title: 'War Dogs'
    },
  
    {
      title: 'Twilight'
    }
    
  ];


 

  app.use(bodyParser.urlencoded({
    extended: true
  }));
  
  app.use(bodyParser.json());
  app.use(methodOverride());
  
// GET requests

app.get("/documentation", function (req, res) {
  res.sendFile("public/documentation.html", { root: __dirname });
  });

app.get('/', (req, res) => {
  res.send('Welcome to my Movie Club ');
});

app.get('/movies', (req, res) => {
  res.json(topMovies);
});
// Gets the data about a single movie by title
app.get("/movies/:title", (req, res) => {
  res.send("Successful GET request returning data about a single movie.");
});

// Gets the data about a movie genre by name
app.get("movies/genre/:name", (req, res) => {
  res.send("Successful GET request returning data about a movie genre.");
});

// Gets the data about a director by name
app.get("movies/director/:name", (req, res) => {
  res.send("Successful GET request returning data about a director.");
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(8080, () => {
  console.log('Your app is listening on port 8080.');
});

// Adds data for a new user
app.post("/users", (req, res) => {
  let newUser = req.body;

  if (!newUser.username) {
    const message = "Missing username in request body";
    res.status(400).send(message);
  } else {
    res.send("User successfully added.");
  }
});

// Adds movie to favorites for a user
app.post("/favorites/:username/:movieId", (req, res) => {
  res.send("add favorite movie by user.");
});

// Update the a user's information
app.put("/users/:id",(req, res) => {
  res.send("User information updated.");
});

// Deletes a movie from a user's favorites list by username
app.delete("/favorites/:username/:movieId", (req, res) => {
  res.send("Movie successfully deleted from favorites.");
});

// Deletes a user from the user registry
app.delete("/users/:username", (req, res) => {
  res.send("User successfully deleted from registry.");
});