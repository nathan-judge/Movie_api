const express = require('express');
const morgan = require("morgan");
const fs = require('fs');
const bodyParser = require('body-parser'),
methodOverride = require('method-override');
const app = express();
const mongoose = require("mongoose");
const Models = require('./models.js');
const passport = require('passport');
require('./passport');

const Movies = Models.Movie;
const Users = Models.User;
const Genres = Models.Genres;
const Directors = Models.directors;

mongoose.connect('mongodb://localhost:27017/test', { 
  useNewUrlParser: true,
  useUnifiedTopology: true
 });

 app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());
let auth = require('./auth')(app);
app.use(methodOverride());


// GET requests 

// Get all users
app.get('/users', (req, res) => {
Users.find()
  .then((users) => {
    res.status(201).json(users);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send('Error: ' + err);
  });
});

// Get a user by username
app.get('/users/:Username', (req, res) => {
Users.findOne({ Username: req.params.Username })
  .then((user) => {
    res.json(user);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send('Error: ' + err);
  });
});

// Get documentation 
app.get("/documentation", function (req, res) {
res.sendFile("public/documentation.html", { root: __dirname });
});

// Site entry text 
app.get('/', (req, res) => {
res.send('Welcome to my Movie Club ');
});

// Gets all movies 
app.get("/movies", (req, res) => {
  Movies.find()
    .then((movies) => {
      res.json(movies);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Error: " + error);
    });
  });


// Gets the data about a single movie by title"
app.get("/movies/:title", (req, res) => {
  Movies.findOne({
    "Title": req.params.title
  })
    .then((movies) => {
      res.json(movies);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Error: " + error);
    });
  });

// Get data of genre by name 

  app.get("/movies/genre/:name", (req, res) => {
    Movies.findOne({
      "Genre.Name": req.params.name
    })
      .then((movies) => {
        res.json(movies.Genre);
      })
      .catch((error) => {
        console.error(error);
        res.status(500).send("Error: " + error);
      });
    });


// Gets the data about a director by name
app.get("/movies/director/:name", (req, res) => {
  Movies.findOne({
    "Director.Name": req.params.name
  })
    .then((movies) => {
      res.json(movies.Director);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Error: " + error);
    });
  });

// site error text 
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// site listen text 
app.listen(8080, () => {
console.log('Your app is listening on port 8080.');
});

// Adds data for a new user
app.post('/users', (req, res) => {
Users.findOne({ Username: req.body.Username })
  .then((user) => {
    if (user) {
      return res.status(400).send(req.body.Username + 'already exists');
    } else {
      Users
        .create({
          Username: req.body.Username,
          Password: req.body.Password,
          Email: req.body.Email,
          Birthday: req.body.Birthday
        })
        .then((user) =>{res.status(201).json(user) })
      .catch((error) => {
        console.error(error);
        res.status(500).send('Error: ' + error);
      })
    }
  })
  .catch((error) => {
    console.error(error);
    res.status(500).send('Error: ' + error);
  });
});

// Adds movie to favorites for a user 
app.put("/users/:username/movies/:movieID", (req, res) => {
  Users.findOneAndUpdate(
    { Username: req.params.username },
    { $push: { FavoriteMovies: req.params.movieID } },
  { new: true }, // This line makes sure that the updated document is returned
  (err, updatedUser) => {
    if(err) {
      console.error(err);
      res.status(500).send('Error: ' + err);
    } else {
      res.json(updatedUser);
    }
  });
  });

// Update the a user's information
app.put('/users/:Username', (req, res) => {
Users.findOneAndUpdate({ Username: req.params.Username }, { $set:
  {
    Username: req.body.Username,
    Password: req.body.Password,
    Email: req.body.Email,
    Birthday: req.body.Birthday
  }
},
{ new: true }, // This line makes sure that the updated document is returned
(err, updatedUser) => {
  if(err) {
    console.error(err);
    res.status(500).send('Error: ' + err);
  } else {
    res.json(updatedUser);
  }
});
});

// Deletes a movie from a user's favorites list by username
app.delete("/favorites/:username/:movieId", (req, res) => {
res.send("Movie successfully deleted from favorites.");
});

// Delete a user by username
app.delete('/users/:Username', (req, res) => {
Users.findOneAndRemove({ Username: req.params.Username })
  .then((user) => {
    if (!user) {
      res.status(400).send(req.params.Username + ' was not found');
    } else {
      res.status(200).send(req.params.Username + ' was deleted.');
    }
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send('Error: ' + err);
  });
});


