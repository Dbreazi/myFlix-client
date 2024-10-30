import React from "react";
import PropTypes from "prop-types";
import { Button } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";

export const MovieView = ({ movies }) => {
  const { movieId } = useParams(); // Get movieId from URL parameters

  // Find the movie with the matching ID
  const movie = movies.find((m) => m._id === movieId);

  // Return early if no movie is found (optional handling for missing movies)
  if (!movie) return <div>Movie not found</div>;

  return (
    <div className="d-flex justify-content-center p-3"> 
      <div style={{ maxWidth: '500px', width: '100%' }}>  
        
        <div className="mb-4 text-center">  
          <img
            className="img-fluid"
            src={movie.ImagePath}
            alt={movie.Title}
            style={{ maxWidth: '500px', height: 'auto' }}
          />
        </div>

        <div className="mb-3">
          <span className="fw-bold">Title: </span>
          <span>{movie.Title}</span>
        </div>
        <div className="mb-3">
          <span className="fw-bold">Description: </span>
          <span>{movie.Description}</span>
        </div>
        <div className="mb-3">
          <span className="fw-bold">Genre: </span>
          <span>{movie.Genre.Name}</span>
        </div>
        <div className="mb-3">
          <span className="fw-bold">Director: </span>
          <span>{movie.Director.Name}</span>
        </div>
        <div className="mb-3">
          <span className="fw-bold">Bio: </span>
          <span>{movie.Director.Bio}</span>
        </div>
        <div className="mb-3">
          <span className="fw-bold">Birth: </span>
          <span>{movie.Director.Birth}</span>
        </div>
        <div className="mb-4">
          <span className="fw-bold">Death: </span>
          <span>{movie.Director.Death}</span>
        </div>

        <div className="d-flex justify-content-center">
          <Link to="/">
            <Button variant="primary">Back</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

MovieView.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
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
    })
  ).isRequired
};
