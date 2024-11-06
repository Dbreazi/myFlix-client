import React from 'react';
import PropTypes from 'prop-types';
import { FaTrashAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './FavouriteMovies.scss';

const FavouriteMovies = ({ movies, favoriteMovieIds, user, token, onFavoriteRemoved }) => {
  const favoriteMovies = movies.filter(movie => favoriteMovieIds.includes(movie._id));

  const removeFavorite = (movieId) => {
    fetch(`https://strobeapp-583fefccfb94.herokuapp.com/users/${user.Username}/movies/${movieId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to remove favorite");
        }
        return response.json();
      })
      .then(() => {
        onFavoriteRemoved(movieId);
      })
      .catch((error) => {
        console.error("Error removing favorite:", error);
      });
  };

  return (
    <div className="favourite-movies-wrapper">
      <div className="favourite-movies">
        <h3>Favourite Movies</h3>
        <hr />
        <div className="movies-scroll">
          {favoriteMovies.map(movie => (
            <figure key={movie._id} className="movie-item">
              <Link to={`/movies/${movie._id}`}>
                <img src={movie.ImagePath} alt={movie.Title} className="movie-image" />
              </Link>
              <figcaption className="movie-title">{movie.Title}</figcaption>
              <button onClick={() => removeFavorite(movie._id)} className="remove-button">
                <FaTrashAlt />
              </button>
            </figure>
          ))}
        </div>
      </div>
    </div>
  );
};

FavouriteMovies.propTypes = {
  movies: PropTypes.array.isRequired,
  favoriteMovieIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  user: PropTypes.object.isRequired,
  token: PropTypes.string.isRequired,
  onFavoriteRemoved: PropTypes.func.isRequired
};

export default FavouriteMovies;
