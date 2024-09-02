import React, { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/MovieCard";
import { MovieView } from "../movie-view/MovieView";

export const MainView = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    fetch("https://strobeapp-583fefccfb94.herokuapp.com/movies") 
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
  }, []); 

  
  if (selectedMovie) {
    return (
      <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
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
