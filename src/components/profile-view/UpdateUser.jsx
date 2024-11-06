import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Container } from 'react-bootstrap';

const UpdateUser = ({ userData, onProfileUpdate }) => {
  const [formData, setFormData] = useState({
    username: userData.Username || '',
    password: '',
    email: userData.Email || '',
    birthday: userData.Birthday ? userData.Birthday.split('T')[0] : ''
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const updatedData = {
        Username: formData.username,
        ...(formData.password && { Password: formData.password }),
        Email: formData.email,
        Birthday: formData.birthday
      };

      const response = await fetch(
        `https://strobeapp-583fefccfb94.herokuapp.com/users/${userData.Username}`,
        {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(updatedData)
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText);
      }

      const data = await response.json();
      onProfileUpdate(data);
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('There was a problem updating your profile.');
    }
  };

  return (
    <Container>
      <h4 className="text-left mb-4">Update Profile</h4>
      <hr />
      <Form onSubmit={handleFormSubmit}>
        <Form.Group controlId="formUsername" className="mb-3">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            required
            minLength="3"
          />
        </Form.Group>

        <Form.Group controlId="formPassword" className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="Enter new password (optional)"
          />
        </Form.Group>

        <Form.Group controlId="formEmail" className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formBirthday" className="mb-3">
          <Form.Label>Birthday</Form.Label>
          <Form.Control
            type="date"
            name="birthday"
            value={formData.birthday}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="w-100">
          Update Profile
        </Button>
      </Form>
    </Container>
  );
};

UpdateUser.propTypes = {
  userData: PropTypes.shape({
    Username: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
    Birthday: PropTypes.string
  }).isRequired,
  onProfileUpdate: PropTypes.func.isRequired
};

export default UpdateUser;
