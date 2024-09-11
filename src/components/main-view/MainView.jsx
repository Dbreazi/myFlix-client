import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { MovieCard } from "../movie-card/MovieCard";
import { MovieView } from "../movie-view/MovieView";
import { LoginView } from "../login-view/LoginView";
import { SignupView } from "../signup-view/SignupView";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser || null);
  const [token, setToken] = useState(storedToken || null);
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    if (!token) return;

    fetch("https://strobeapp-583fefccfb94.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((response) => response.json())
      .then((data) => {
        const moviesFromApi = data.map((movie) => ({
          _id: movie._id,
          Title: movie.Title,
          Description: movie.Description,
          Genre: movie.Genre,
          Director: movie.Director,
          ImagePath: movie.ImagePath,
          Featured: movie.Featured,
        }));
        setMovies(moviesFromApi);
      })
      .catch((error) => console.error('Error fetching movies:', error));
  }, [token]);

  if (!user) {
    return (
      <Container>
        <Row className="justify-content-center mt-4">
          <Col xs={12} className="text-center">
            <h1 className="my-flix-title">My-Flix</h1>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md={6} lg={4}>
            <LoginView onLoggedIn={(user, token) => {
              setUser(user);
              setToken(token);
            }} />
            <div className="text-center mt-4">or</div>
            <SignupView />
          </Col>
        </Row>
      </Container>
    );
  }

  if (selectedMovie) {
    return (
      <Container>
        <Row className="mb-4">
          <Col className="d-flex justify-content-end">
            <Button
              variant="primary"
              onClick={() => {
                setUser(null);
                setToken(null);
                localStorage.clear();
              }}
            >
              Logout
            </Button>
          </Col>
        </Row>
        <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
      </Container>
    );
  }

  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  }

  return (
    <Container>
      <Row className="mb-4">
        <Col className="d-flex justify-content-end">
          <Button
            variant="primary"
            onClick={() => {
              setUser(null);
              setToken(null);
              localStorage.clear();
            }}
          >
            Logout
          </Button>
        </Col>
      </Row>
      <Row>
        {movies.map((movie) => (
          <Col md={4} lg={3} key={movie._id} className="mb-4">
            <MovieCard
              movie={movie}
              onMovieClick={(newSelectedMovie) => {
                setSelectedMovie(newSelectedMovie);
              }}
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
};
