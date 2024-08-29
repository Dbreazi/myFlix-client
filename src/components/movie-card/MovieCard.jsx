import React from "react";

export const MovieCard = ({ movie, onMovieClick }) => {
  return (
    <div
      onClick={() => {
        onMovieClick(movie);
      }}
    >
      <img src={movie.ImagePath} alt={movie.Title} />
      <h3>{movie.Title}</h3>
    </div>
  );
};
