import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
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
  const [searchTerm, setSearchTerm] = useState(""); // Step 1: Add searchTerm state

  useEffect(() => {
    if (!token) return;

    fetch("https://strobeapp-583fefccfb94.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((response) => {
        if (!response.ok) throw new Error("Failed to fetch movies");
        return response.json();
      })
      .then((data) => setMovies(data))
      .catch((error) => console.error("Error fetching movies:", error));
  }, [token]);

  const handleLogout = () => {
    setUser(null);
    setToken(null);
    localStorage.clear();
  };

  const updateUserFavorites = (movieId, isAdding) => {
    setUser((prevUser) => {
      const updatedFavorites = isAdding
        ? [...prevUser.FavoriteMovies, movieId]
        : prevUser.FavoriteMovies.filter((id) => id !== movieId);

      const updatedUser = { ...prevUser, FavoriteMovies: updatedFavorites };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      return updatedUser;
    });
  };

  // Step 2: Filter movies based on the search term
  const filteredMovies = movies.filter((movie) =>
    movie.Title.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
                  {/* Step 3: Add search input */}
                  <Form.Control
                    type="text"
                    placeholder="Search movies"
                    className="mb-4"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <Row>
                    {filteredMovies.length === 0 ? (
                      <div>No movies found!</div>
                    ) : (
                      filteredMovies.map((movie) => (
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
            element={!user ? <Navigate to="/login" /> : (
              <MovieView 
                movies={movies} 
                user={user} 
                token={token} 
                onFavoriteToggle={updateUserFavorites}
              />
            )}
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
