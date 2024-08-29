import React, { useState } from "react";
import { MovieCard } from "../movie-card/MovieCard";
import { MovieView } from "../movie-view/MovieView";

export const MainView = () => {
  const [movies, setMovies] = useState([
    {
      _id: '1',
      Title: 'Inception',
      Description: 'A thief who steals corporate secrets through the use of dream-sharing technology...',
      Genre: { Name: 'Sci-Fi' },
      Director: {
        Name: 'Christopher Nolan',
        Bio: 'Updated bio for Christopher Nolan',
        Birth: '1970',
        Death: 'Present',
      },
      ImagePath: 'https://image.tmdb.org/t/p/w1280/oYuLEt3zVCKq57qu2F8dT7NIa6f.jpg',
      Featured: true,
    },
    {
      _id: '2',
      Title: 'The Matrix',
      Description: 'A computer hacker learns from mysterious rebels about the true nature of his reality...',
      Genre: { Name: 'Sci-Fi' },
      Director: {
        Name: 'The Wachowskis',
        Bio: 'Updated bio for The Wachowskis',
        Birth: '1965',
        Death: 'Present',
      },
      ImagePath: 'https://image.tmdb.org/t/p/w600_and_h900_bestv2/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg',
      Featured: true,
    },
    {
      _id: '3',
      Title: 'The Dark Knight',
      Description: 'When the menace known as the Joker emerges from his mysterious past...',
      Genre: { Name: 'Action' },
      Director: {
        Name: 'Christopher Nolan',
        Bio: 'Updated bio for Christopher Nolan',
        Birth: '1970',
        Death: 'Present',
      },
      ImagePath: 'https://image.tmdb.org/t/p/w600_and_h900_bestv2/qJ2tW6WMUDux911r6m7haRef0WH.jpg',
      Featured: true,
    },
  ]);

  const [selectedMovie, setSelectedMovie] = useState(null);

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
