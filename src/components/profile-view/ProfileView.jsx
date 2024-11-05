import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import UserInfo from './UserInfo';
import UpdateUser from './UpdateUser';
import FavouriteMovies from './FavouriteMovies';
import { Container, Row, Col, Card } from 'react-bootstrap';
import './ProfileView.scss';

const ProfileView = ({ user, movies, onLoggedOut }) => {
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return;

        const response = await fetch(`https://strobeapp-583fefccfb94.herokuapp.com/users/${user.Username}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await response.json();
        setProfileData(data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [user.Username]);

  const handleProfileUpdate = (updatedProfile) => {
    setProfileData(updatedProfile);
  };

  const handleDeregister = async () => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete your account? This action cannot be undone.'
    );

    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      await fetch(`https://strobeapp-583fefccfb94.herokuapp.com/users/${user.Username}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });

      localStorage.clear();
      onLoggedOut();

      alert('Your account has been deleted.');
      window.location.href = '/login';
    } catch (error) {
      console.error('Error deleting account:', error);
      alert('There was a problem deleting your account.');
    }
  };

  if (!profileData) return <p>Loading profile...</p>;

  return (
    <Container className="profile-outer-container">
      <Row>
        <Col md={4}>
          <Card className="profile-inner-card mb-3">
            <Card.Body>
              {/* Pass the username along with email and birthday */}
              <UserInfo 
                username={profileData.Username} 
                email={profileData.Email} 
                birthday={profileData.Birthday} 
              />
            </Card.Body>
          </Card>
          <Card className="profile-inner-card mb-3">
            <Card.Body>
              <UpdateUser userData={profileData} onProfileUpdate={handleProfileUpdate} />
            </Card.Body>
          </Card>
          <Card className="profile-inner-card mb-3 delete-account-card">
            <Card.Body>
              <button className="btn btn-danger w-100 profile-button" onClick={handleDeregister}>
                Delete Account
              </button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={8} className="d-flex flex-column">
          <div className="favorite-movies-container">
            <FavouriteMovies
              movies={movies}
              favoriteMovieIds={profileData.FavoriteMovies}
              user={user}
              token={localStorage.getItem('token')}
              onFavoriteRemoved={(movieId) =>
                setProfileData({
                  ...profileData,
                  FavoriteMovies: profileData.FavoriteMovies.filter((id) => id !== movieId),
                })
              }
            />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

ProfileView.propTypes = {
  user: PropTypes.object.isRequired,
  movies: PropTypes.array.isRequired,
  onLoggedOut: PropTypes.func.isRequired
};

export default ProfileView;
