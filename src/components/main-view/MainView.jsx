import React, { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/MovieCard";
import { MovieView } from "../movie-view/MovieView";
import { LoginView } from "../login-view/LoginView"; // Make sure to import your LoginView

export const MainView = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [user, setUser] = useState(null); // State for user
  const [token, setToken] = useState(null); // State for token

  useEffect(() => {
    if (!token) {
      return; // Don't fetch movies if there's no token
    }

    fetch("https://strobeapp-583fefccfb94.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${token}` } // Include token in headers
    })
      .then((response) => response.json())
      .then((data) => {
        const moviesFromApi = data.map((movie) => {
          return {
            _id: movie._id,
            Title: movie.Title,
            Description: movie.Description,
            Genre: movie.Genre,
            Director: movie.Director,
            ImagePath: movie.ImagePath,
            Featured: movie.Featured,
          };
        });
        
        setMovies(moviesFromApi);
      })
      .catch((error) => console.error('Error fetching movies:', error)); 
  }, [token]); // Add token to dependency array

  const handleLogin = (user, token) => {
    setUser(user);
    setToken(token);
  };

  const handleLogout = () => {
    setUser(null);
    setToken(null);
  };

  if (!user) {
    return <LoginView onLoggedIn={handleLogin} />;
  }

  if (selectedMovie) {
    return (
      <>
        <button onClick={handleLogout}>Logout</button>
        <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
      </>
    );
  }

  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  }

  return (
    <div>
      {movies.map((movie) => (
        <MovieCard
          key={movie._id}
          movie={movie}
          onMovieClick={(newSelectedMovie) => {
            setSelectedMovie(newSelectedMovie);
          }}
        />
      ))}
    </div>
  );
};
