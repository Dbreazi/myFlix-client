import React from "react";
import PropTypes from "prop-types";
import { Button } from "react-bootstrap";  

export const MovieView = ({ movie, onBackClick }) => {
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
          <Button variant="primary" onClick={onBackClick}>Back</Button>
        </div>
      </div>
    </div>
  );
};

MovieView.propTypes = {
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
  }).isRequired,
  onBackClick: PropTypes.func.isRequired
};
