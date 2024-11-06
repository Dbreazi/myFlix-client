import React from 'react';
import PropTypes from 'prop-types';

const UserInfo = ({ username, email, birthday }) => {
  return (
    <div className="user-info" style={{ padding: '1.25rem' }}>
      <h4>Hi, {username}!</h4> {/* Removed <strong> tag */}
      <hr />
      <p><strong>Email:</strong> {email}</p>
      <p><strong>Birthday:</strong> {new Date(birthday).toLocaleDateString()}</p>
    </div>
  );
};

UserInfo.propTypes = {
  username: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  birthday: PropTypes.string
};

export default UserInfo;
