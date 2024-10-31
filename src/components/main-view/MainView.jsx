import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { MovieCard } from "../movie-card/MovieCard";
import { MovieView } from "../movie-view/MovieView";
import { LoginView } from "../login-view/LoginView";
import { SignupView } from "../signup-view/SignupView";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { NavigationBar } from "../navigation-bar/NavigationBar";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser || null);
  const [token, setToken] = useState(storedToken || null);
  const [movies, setMovies] = useState([]);

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

  return (
    <BrowserRouter>
      <Container>
        <NavigationBar 
          user={user} 
          onLoggedOut={() => {
            setUser(null);
            setToken(null);
            localStorage.clear();
          }} 
        />
        <Routes>
          <Route
            path="/login"
            element={
              <LoginView
                onLoggedIn={(user, token) => {
                  setUser(user);
                  setToken(token);
                }}
              />
            }
          />
          <Route path="/signup" element={<SignupView />} />
          <Route
            path="/"
            element={
              !user ? (
                <Navigate to="/login" />
              ) : (
                <Row>
                  {movies.length === 0 ? (
                    <div>The list is empty!</div>
                  ) : (
                    movies.map((movie) => (
                      <Col md={4} lg={3} key={movie._id} className="mb-4">
                        <MovieCard movie={movie} />
                      </Col>
                    ))
                  )}
                </Row>
              )
            }
          />
          <Route
            path="/movies/:movieId"
            element={
              !user ? <Navigate to="/login" /> : <MovieView movies={movies} />
            }
          />
        </Routes>
      </Container>
    </BrowserRouter>
  );
};
