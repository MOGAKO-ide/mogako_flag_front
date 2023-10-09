import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../Components/AxiosInstance';
import './ChangePasswordPage.css';


function ChangePasswordPage({ user, onChangePassword }) {
  const navigate = useNavigate();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordState, setPasswordState] = useState('8자리 이상, 알파벳과 숫자만 입력 가능.(특수문자 제외)');
  const [passwordConfirmState, setPasswordConfirmState] = useState('동일한 비밀번호를 입력하여 주세요.');
  
  useEffect(() => {
    const token = localStorage.getItem('AccessToken');
    if (!token) {
      alert('로그인이 필요합니다.');
      navigate('/');
    }
  }, [navigate]);

  const handlePasswordCheck = (event) => {
    const newPassword = event.target.value;
    setNewPassword(newPassword);

    if (
      newPassword === "" ||
      newPassword.length < 8 ||
      !/^[a-zA-Z0-9]+$/.test(newPassword)
    ) {
      setPasswordState("8자리 이상, 알파벳과 숫자만 입력 가능.(특수문자 제외)");
    } else {
      setPasswordState("유효한 비밀번호 입니다.");
    }
  };

  const handlePasswordConfirm = (event) => {
    const newPasswordConfirm = event.target.value;
    setConfirmPassword(newPasswordConfirm);

    if (newPasswordConfirm !== "") {
      if (newPasswordConfirm !== newPassword) {
        setPasswordConfirmState("동일한 비밀번호를 입력하여 주세요.");
      } else {
        setPasswordConfirmState("비밀번호 확인완료.");
      }
    }
  };

  const handlePasswordChange = () => {
    const userId = localStorage.getItem('userId');
    if (newPassword === confirmPassword) {
      axiosInstance.put(`/api/users/${userId}`, { // 유저 정보를 이용하여 URL을 수정
        beforePassword: currentPassword,
        afterPassword: newPassword
      }).then(response => {
        alert('비밀번호 변경 성공!');
        navigate('/mypage')
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
    <div className="my-page-container">
        <span className="mogako-title">MOGAKO FLAG</span>  {/* 텍스트 추가 */}
        <div className="password-fields">
            <TextField
                label="새로운 비밀번호"
                type="password"
                fullWidth
                value={newPassword}
                onChange={(e) => {
                    setNewPassword(e.target.value);
                    handlePasswordCheck(e);
                }}
            />
            <div>{passwordState}</div>
            <TextField
                label="비밀번호 확인"
                type="password"
                fullWidth
                value={confirmPassword}
                onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    handlePasswordConfirm(e);
                }}
            />
            <div>{passwordConfirmState}</div>
        </div>
        <button className="changePasswordBtn" onClick={handlePasswordChange}>
            비밀번호 변경
        </button>
        <button className="backBtn" onClick={handleCancel}>
            취소하기
        </button>
    </div>
  );
}

export default ChangePasswordPage;
