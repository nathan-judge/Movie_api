import React from 'react';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Card, Container } from 'react-bootstrap';


export class ProfileView extends React.Component {


  constructor() {
    super();

    this.state = {
      movies: [],
      Username: null,
      Password: null,
      Email: null,
      Birthday: null,
      FavoriteMovies: []

    };
  }


  componentDidMount = () => {
    let token = localStorage.getItem('token');

    axios.get(`https://bigscreen.herokuapp.com/users/${this.props.user}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        // Assign the result to the state
        this.setState({
          Username: response.data.Username,
          Password: response.data.Password,
          Email: response.data.Email,
          Birthday: response.data.Birthday,
          FavoriteMovies: response.data.FavoriteMovies
        });
      })
      .catch(function (error) {
        console.log(error);
      });
    this.getMovieTitle()
  }



  getMovieTitle() {
    let token = localStorage.getItem('token');

    axios.get(`https://bigscreen.herokuapp.com/movies`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        this.setState({
          movies: response.data
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  getMovies = () => {
    var favmovies = [];
    this.state.movies.forEach(movie => {
      if (this.state.FavoriteMovies.includes(movie._id)) {
        favmovies.push(movie)
      }
    });

    return favmovies
  }

  deleteFavMovies = movie => {
    let token = localStorage.getItem('token');
    const Username = localStorage.getItem('user')
    axios.delete(`https://bigscreen.herokuapp.com/favorites/${Username}/${movie._id}`,
      { headers: { Authorization: `Bearer ${token}` } }, {})
      .then(response => {
        const data = response.data;
      })
      .catch(e => {
        console.log('error deleting favourite movies')
      });
  };


  handleSubmit = e => {
    let token = localStorage.getItem('token');
    const { Username, Password, Email, Birthday, FavoriteMovies } = this.state
    axios.put(`https://bigscreen.herokuapp.com/users/${Username}`, {

      Username: Username,
      Password: Password,
      Email: Email,
      Birthday: Birthday,
      FavoriteMovies: FavoriteMovies

    }, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        const data = response.data;
      })
      .catch(e => {
        console.log('error updating the user')
      });
  };



  render() {
    const { user, movie } = this.props;
    const { Username, Password, Email, Birthday, FavoriteMovies, Movies, } = this.state
    console.log(this.getMovies())
    if (!user || !Username) return null;

    return (
      <div className="user-view">
        <Container>
          <Card style={{ width: '30rem' }}>
            <Card.Body>
              <Card.Title>{Username}</Card.Title>
              <Card.Text>
                Linked Email:
                <input
                  type="text"
                  value={Email}
                  onChange={(e) => this.setState({ Email: e.target.value })}
                />
              </Card.Text>
              <Card.Text>
                Birthday:
                <input
                  type="text"
                  value={Birthday}
                  onChange={(e) => this.setState({ Birthday: e.target.value })}
                />
              </Card.Text>
              <Card.Text>
                Password:
                <input
                  type="password"
                  value={Password}
                  onChange={(e) => this.setState({ Password: e.target.value })}
                />
              </Card.Text>



              <Card.Text>Favourite Movies:</Card.Text>

              {
                this.getMovies().map((movie, index) => {

                  return <Card.Text key={index}> {movie.Title}

                    <Button onClick={() => this.deleteFavMovies(movie)}>Remove</Button>

                  </Card.Text>

                })
              }




              <Button type="button" onClick={this.handleSubmit}> update</Button>

              <div className="backbtn">
                <Link to={`/`}>
                  <Button variant="link">Back</Button>
                </Link>
              </div>
            </Card.Body>
          </Card>
        </Container>
      </div>
    );
  }
}