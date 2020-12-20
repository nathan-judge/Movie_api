import React from 'react';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';


export class ProfileView extends React.Component {

  constructor() {
    super();

    this.state = {};
  }

  render() {
    const { user, goBack } = this.props;


    if (!user) return null;

    return (
      <div className="user-view">
        <div className="user-name">
          <span className="value">{user.Username}</span>
        </div>
        <div className="user-email">
          <span className="label">Linked Email: </span>
          <span className="value">{user.Email}</span>
        </div>
        <div className="user-favmovies">
          <span className="label">Favorite Movies: </span>
          <span className="value">{user.FavoriteMovies}</span>
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