import React from 'react';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Card, Container } from 'react-bootstrap';


export class ProfileView extends React.Component {


  constructor() {
    super();

    this.state = {
      Username: null,
      Password: null,
      Email: null,
      Birthday: null,
      FavoriteMovies: null

    };
  }


  componentDidMount() {
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
  }
  getMovieTitle() {
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


  handleSubmit = e => {
    e.preventDefault();
    const { Username, Password, Email, Birthday, FavoriteMovies } = this.state
    axios.put(`https://bigscreen.herokuapp.com/users/${Username}`, {
      Username: Username,
      Password: Password,
      Email: Email,
      Birthday: Birthday,
      FavoriteMovies: FavoriteMovies
    })
      .then(response => {
        const data = response.data;
        console.log(data);
      })
      .catch(e => {
        console.log('error updating the user')
      });
  };



  render() {
    const { user, goBack } = this.props;
    const { Username, Password, Email, Birthday, FavoriteMovies, Movies, } = this.state

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
                  type="text"
                  value={Password}
                  onChange={(e) => this.setState({ Password: e.target.value })}
                />
              </Card.Text>
              <Card.Text>Favourite Movies: {FavoriteMovies}</Card.Text>
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