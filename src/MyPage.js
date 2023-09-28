import React from 'react';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

function MyPage({ username, userId, onLogout }) {
  const navigate = useNavigate();

  const handleChangePasswordClick = () => {
    navigate("/changepassword");
  };

  return (
    <div className="my-page-container">
      <h2>Welcome, {username}!</h2>
      <p>Your User ID: {userId}</p>

      <Button variant="contained" color="primary" onClick={onLogout}>
        Logout
      </Button>

      <Button variant="contained" color="secondary" onClick={handleChangePasswordClick}>
        Change Password
      </Button>
    </div>
  );
}

export default MyPage;
