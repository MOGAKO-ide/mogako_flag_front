import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

function ChangePasswordPage({ onChangePassword, onCancel }) {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handlePasswordChange = () => {
    if (newPassword === confirmPassword) {
      onChangePassword(currentPassword, newPassword);
    } else {
      alert('New passwords do not match!');
    }
  };

  return (
    <div className="change-password-container">
      <TextField
        label="Current Password"
        type="password"
        fullWidth
        value={currentPassword}
        onChange={(e) => setCurrentPassword(e.target.value)}
      />
      <TextField
        label="New Password"
        type="password"
        fullWidth
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />
      <TextField
        label="Confirm New Password"
        type="password"
        fullWidth
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />

      <Button variant="contained" color="primary" onClick={handlePasswordChange}>
        Change Password
      </Button>
      <Button variant="contained" color="secondary" onClick={onCancel}>
        Cancel
      </Button>
    </div>
  );
}

export default ChangePasswordPage;
