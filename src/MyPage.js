import React from 'react';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

function MyPage({ username, userId, onLogout }) {
  const navigate = useNavigate();


  // 페이지 이동 핸들러 함수 정의
  // 반응형 고려하면 별도의 핸들러 함수를 정의하는 방식이 더 유용하고 확장성 좋음

  const handleLogout = () => {
    // 로그아웃 로직을 처리한 후, 루트 홈페이지(Login)로 이동
    navigate('/');
  };

  const handleChangePasswordClick = () => {
    // 비밀번호 변경 버튼 클릭시 비밀번호 변경 페이지 이동
    navigate("/changepassword");
  };

  const handleGoBack = () => {
    // 돌아가기 버튼 클릭시 단계 선택 화면으로 이동
    navigate('/choosestage');
  };



  return (
    <div className="my-page-container">
      <h2>Welcome, {username}!</h2>
      <p>Your User ID: {userId}</p>

      <Button variant="contained" color="primary" onClick={handleLogout}>
        로그아웃
      </Button>

      <Button variant="contained" color="secondary" onClick={handleChangePasswordClick}>
        비밀번호 변경
      </Button>

      <Button variant="contained" onClick={handleGoBack}>
        돌아가기
      </Button>
    </div>
  );
}

export default MyPage;
