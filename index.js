const express = require('express');
const morgan = require('morgan');
const fs = require('fs');
const bodyParser = require('body-parser'),
methodOverride = require('method-override');


const app = express();
let topMovies = [
    {
      title: 'Harry Potter and the Sorcerer\'s Stone'
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

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(8080, () => {
  console.log('Your app is listening on port 8080.');
});
