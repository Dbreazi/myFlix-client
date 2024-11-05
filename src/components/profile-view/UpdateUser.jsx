import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Container } from 'react-bootstrap';

const UpdateUser = ({ userData, onProfileUpdate }) => {
  const [formData, setFormData] = useState({
    username: userData.username || '',
    password: '',
    email: userData.email || '',
    birthday: userData.birthday ? userData.birthday.split('T')[0] : ''
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
        username: formData.username,
        ...(formData.password && { password: formData.password }),
        email: formData.email,
        birthday: formData.birthday
      };

      const response = await fetch(`/users/${userData.username}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedData)
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
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
      <hr /> {/* Separator added here */}
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
    username: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    birthday: PropTypes.string
  }).isRequired,
  onProfileUpdate: PropTypes.func.isRequired
};

export default UpdateUser;
