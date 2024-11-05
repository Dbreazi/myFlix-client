import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Button } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";

export const MovieView = ({ movies, user, token }) => {
  const { movieId } = useParams();
  const movie = movies.find((m) => m._id === movieId);

  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    // Check if the movie is already in the user's favorite list
    if (user.FavoriteMovies && user.FavoriteMovies.includes(movieId)) {
      setIsFavorite(true);
    }
  }, [user.FavoriteMovies, movieId]);

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
        setIsFavorite(true); // Update the state to reflect that it's now a favorite
      })
      .catch((error) => console.error("Error adding favorite:", error));
  };

  if (!movie) return <div>Movie not found</div>;

  return (
    <div className="d-flex justify-content-center p-3"> 
      <div style={{ maxWidth: '800px', width: '100%' }} className="d-flex"> 
        <div className="me-5"> 
          <img
            className="img-fluid"
            src={movie.ImagePath}
            alt={movie.Title}
            style={{ maxWidth: '400px', height: 'auto' }}
          />
        </div>

        <div className="flex-grow-1 d-flex flex-column">
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

          <div className="mt-auto d-flex justify-content-between"> 
            <Button
              variant={isFavorite ? "secondary" : "primary"}
              onClick={isFavorite ? null : addFavorite} // Disable if already a favorite
              disabled={isFavorite}
              className="w-100 me-2"
            >
              {isFavorite ? "Added to Favorites" : "Add to Favorites"}
            </Button>
            <Link to="/">
              <Button variant="primary" className="w-100">Back</Button>
            </Link>
          </div>
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
  ).isRequired,
  user: PropTypes.object.isRequired,
  token: PropTypes.string.isRequired
};
