import React from 'react';
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import axios from 'axios';


export class MovieView extends React.Component {

  constructor() {
    super();

    this.state = {};
  }

  handleSubmit = e => {
    let token = localStorage.getItem('token');
    const username = localStorage.getItem('user')
    axios.put(`https://bigscreen.herokuapp.com/users/${username}/movies/${this.props.movie._id}`, {
    }, { headers: { Authorization: `Bearer ${token}` } })
      .then(response => {
        const data = response.data;
        console.log(data);
      })
      .catch(e => {
        console.log('error adding to favourite movies')
      });
  };

  render() {
    const { movie, goBack } = this.props;


    if (!movie) return null;

    return (
      <div className="movie-view">
        <img className="movie-poster" src={movie.ImagePath} />
        <div className="movie-title">
          <span className="label">Title: </span>
          <span className="value">{movie.Title}</span>
        </div>
        <div className="movie-description">
          <span className="label">Description: </span>
          <span className="value">{movie.Description}</span>
        </div>

        <div className="movie-genre">
          <Link to={`/genres/${movie.Genre.Name}`}>
            <Button variant="link">Genre</Button>
          </Link>
        </div>
        <div className="movie-director">
          <Link to={`/directors/${movie.Director.Name}`}>
            <Button variant="link">Director</Button>
          </Link>
          <div className="addFavmovies">
            <Link to={''}>
              <Button onClick={this.handleSubmit}>Add to favourites</Button>
            </Link>
          </div>
        </div>
        <div className="backbtn">
          <Link to={`/`}>
            <Button variant="link">Back</Button>
          </Link>
        </div>
      </div>




    );
  }
}