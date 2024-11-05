import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "./MovieCard.scss";

export const MovieCard = ({ movie }) => (
  <Link to={`/movies/${movie._id}`} className="movie-card-link">
    <div className="movie-card-wrapper">
      <div className="movie-card">
        <img src={movie.ImagePath} alt={movie.Title} className="movie-image" />
        <div className="movie-title">{movie.Title}</div>
      </div>
    </div>
  </Link>
);

MovieCard.propTypes = {
  movie: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired
    }).isRequired,
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string,
      Birth: PropTypes.string,
      Death: PropTypes.string
    }).isRequired,
    ImagePath: PropTypes.string.isRequired,
    Featured: PropTypes.bool.isRequired
  }).isRequired
};

export default MovieCard;
