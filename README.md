# movie_api
Server-side component of a “movies” web application. This project is a REST API that interacts with a MongoDB database. It is used in other projects to provide movie information and allow users to create accounts and save their favorite movies.

# features 
Endpoints:

return a list of all movies,
  
return information about a single movie by its title

return information about a movie's genre

return information about a movie's director

allow a user to sign up

allow a user to update their profile information

allow a user to add a movie to their favorities

allow a user to remove a movie from their favorites

allow a user to delete their account.

# technolgy 
Code written with Node.js and Express
API uses REST 
API connects to a MongoDB database
Information is provided in JSON format
API authenticates and authorizes user

# movie app
This project is a React application that allows users to get information about movies, genres, and directors. Users can also save movies in their list of favorites and edit details of their profile. This application uses an existing server-side REST API and MongoDB database.
# features 

welcome page where users can either login to an existing user or register an account 

once a user has been authticated they can veiw movies and acess profile view 

user can view click on a movie and see info about it 

inside the movie view users can also click on the genre button to see more info about the genre, click on the director button to see info about the movies director, or they can click add to favourites which is a list in your profile view of movies you have clicked as your favourite 

users can also click on the profile button to go to the profile view where they can view the favourite movies list and edit their password, email address, or delete movies from the favourite movies list.

users can also logout out of the site 

# technolgy
Single-Page Application (SPA) using React
Requires npm, Parcel, and Babel
UI styled with Bootstrap
State management with React Redux

