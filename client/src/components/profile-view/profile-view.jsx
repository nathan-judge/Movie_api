import React from 'react';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import axios from 'axios';


export class ProfileView extends React.Component {


  constructor() {
    super();

    this.state = {
      userInfo: null
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
          userInfo: response.data
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }



  render() {
    const { user, goBack } = this.props;
    const { userInfo } = this.state

    if (!user || !userInfo) return null;

    return (
      <div className="user-view">
        <div className="user-name">
          <span className="value">{userInfo.Username}</span>
        </div>
        <div className="user-email">
          <span className="label">Linked Email: </span>
          <span className="value">{userInfo.Email}</span>
        </div>
        <div className="user-birthday">
          <span className="label">Birthday </span>
          <span className="value">{userInfo.Birthday}</span>
        </div>
        <div className="user-favmovies">
          <span className="label">Favorite Movies: </span>
          <span className="value">{userInfo.FavoriteMovies}</span>
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