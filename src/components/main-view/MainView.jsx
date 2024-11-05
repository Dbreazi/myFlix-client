import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { MovieCard } from "../movie-card/MovieCard";
import { MovieView } from "../movie-view/MovieView";
import { LoginView } from "../login-view/LoginView";
import { SignupView } from "../signup-view/SignupView";
import ProfileView from "../profile-view/ProfileView";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { NavigationBar } from "../navigation-bar/NavigationBar";
import "./MainView.scss";

export const MainView = () => {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem("user")) || null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    if (!token) return;

    fetch("https://strobeapp-583fefccfb94.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((response) => {
        if (!response.ok) throw new Error("Failed to fetch movies");
        return response.json();
      })
      .then((data) => {
        setMovies(data.map(({ _id, Title, Description, Genre, Director, ImagePath, Featured }) => ({
          _id, Title, Description, Genre, Director, ImagePath, Featured
        })));
      })
      .catch((error) => console.error("Error fetching movies:", error));
  }, [token]);

  const handleLogout = () => {
    setUser(null);
    setToken(null);
    localStorage.clear();
  };

  return (
    <BrowserRouter>
      <Container>
        <NavigationBar user={user} onLoggedOut={handleLogout} />
        <Routes>
          <Route
            path="/login"
            element={<LoginView onLoggedIn={(user, token) => { setUser(user); setToken(token); }} />}
          />
          <Route path="/signup" element={<SignupView />} />
          <Route
            path="/"
            element={
              !user ? (
                <Navigate to="/login" />
              ) : (
                <div className="main-view-container">
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
                </div>
              )
            }
          />
          <Route
            path="/movies/:movieId"
            element={!user ? <Navigate to="/login" /> : <MovieView movies={movies} user={user} token={token} />}
          />
          <Route
            path="/profile"
            element={!user ? <Navigate to="/login" /> : <ProfileView user={user} movies={movies} onLoggedOut={handleLogout} />}
          />
        </Routes>
      </Container>
    </BrowserRouter>
  );
};
