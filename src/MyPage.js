import React from 'react';
import Button from '@mui/material/Button';

function MyPage({ username, userId, onLogout, onChangePasswordClick }) {
  return (
    <div className="my-page-container">
      <h2>Welcome, {username}!</h2>
      <p>Your User ID: {userId}</p>

      <Button variant="contained" color="primary" onClick={onLogout}>
        Logout
      </Button>

      <Button variant="contained" color="secondary" onClick={onChangePasswordClick}>
        Change Password
      </Button>
    </div>
  );
}

export default MyPage;
