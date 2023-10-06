import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../Components/AxiosInstance';

function ChangePasswordPage({ user, onChangePassword }) {
  const navigate = useNavigate();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handlePasswordChange = () => {
    if (newPassword === confirmPassword) {
      axiosInstance.put(`/api/users/66cba1ab-c7a3-4c06-a1db-9be83da2e818`, { // 유저 정보를 이용하여 URL을 수정
        beforePassword: currentPassword,
        afterPassword: newPassword
      }).then(response => {
        alert('비밀번호 변경 성공!');
      }).catch(error => {
        if (error.response && error.response.status === 400) {
          alert('이전 패스워드가 일치하지 않습니다.');
        } else {
        
          alert('비밀번호 변경 중 오류가 발생했습니다.');
        }
      });
    } else {
      alert('새로운 비밀번호가 일치하지 않습니다!');
    }
  };

  const handleCancel = () => {
    navigate('/mypage');
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
      <Button variant="contained" color="secondary" onClick={handleCancel}>
        Cancel
      </Button>
    </div>
  );
}

export default ChangePasswordPage;
