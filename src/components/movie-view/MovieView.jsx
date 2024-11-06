import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Button, Col, Row } from "react-bootstrap";
import { Link, useParams, useNavigate } from "react-router-dom";

export const MovieView = ({ movies, user, token, onFavoriteToggle }) => {
  const { movieId } = useParams();
  const navigate = useNavigate();
  const movie = movies.find((m) => m._id === movieId);

  const [isFavorite, setIsFavorite] = useState(
    user.FavoriteMovies?.includes(movieId)
  );

  const addFavorite = () => {
    fetch(`https://strobeapp-583fefccfb94.herokuapp.com/users/${user.Username}/movies/${movieId}`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((response) => {
        if (!response.ok) throw new Error("Failed to add favorite");
        return response.json();
      })
      .then(() => {
        setIsFavorite(true);
        onFavoriteToggle(movieId, true); 
      })
      .catch((error) => console.error("Error adding favorite:", error));
  };

  const removeFavorite = () => {
    fetch(`https://strobeapp-583fefccfb94.herokuapp.com/users/${user.Username}/movies/${movieId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((response) => {
        if (!response.ok) throw new Error("Failed to remove favorite");
        return response.json();
      })
      .then(() => {
        setIsFavorite(false);
        onFavoriteToggle(movieId, false); 
      })
      .catch((error) => console.error("Error removing favorite:", error));
  };

  const handleBack = () => {
    navigate(-1);
  };

  if (!movie) return <div>Movie not found</div>;

  return (
    <div className="d-flex justify-content-center" style={{ marginTop: '6rem' }}>
      <Row className="w-100" style={{ maxWidth: '800px' }}>
        <Col xs={12} md={5} className="text-center mb-3 mb-md-0" style={{ paddingRight: '1.5rem' }}>
          <img
            className="img-fluid"
            src={movie.ImagePath}
            alt={movie.Title}
            style={{ maxWidth: '100%', height: 'auto', borderRadius: '8px' }}
          />
        </Col>
        
        <Col xs={12} md={7} className="d-flex flex-column">
          <div>
            {[
              { label: 'Title', value: movie.Title },
              { label: 'Description', value: movie.Description },
              { label: 'Genre', value: movie.Genre.Name },
              { label: 'Director', value: movie.Director.Name },
              { label: 'Bio', value: movie.Director.Bio },
              { label: 'Birth', value: movie.Director.Birth },
              { label: 'Death', value: movie.Director.Death },
            ].map((info, index) => (
              <div className="mb-3" key={index}>
                <span className="fw-bold">{info.label}: </span>
                <span>{info.value}</span>
                {info.label === 'Genre' && <hr className="my-2" />}
              </div>
            ))}
          </div>

          <div className="mt-auto d-flex flex-column flex-md-row gap-2"> 
            <Button
              variant={isFavorite ? "secondary" : "primary"}
              onClick={isFavorite ? removeFavorite : addFavorite}
              className="w-100"
              style={{ minWidth: '160px', whiteSpace: 'nowrap' }}
            >
              {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
            </Button>
            <Button variant="primary" className="w-100" onClick={handleBack}>
              Back
            </Button>
          </div>
        </Col>
      </Row>
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
  ).isRequired,
  user: PropTypes.object.isRequired,
  token: PropTypes.string.isRequired,
  onFavoriteToggle: PropTypes.func.isRequired
};
