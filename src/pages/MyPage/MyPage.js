import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../Components/AxiosInstance';
import './MyPage.css';

function MyPage({ onLogout }) {
  const navigate = useNavigate();
  const userId = localStorage.getItem('username');
  const nickname = localStorage.getItem('nickname');
  // 페이지 이동 핸들러 함수 정의
  // 반응형 고려하면 별도의 핸들러 함수를 정의하는 방식이 더 유용하고 확장성 좋음

  // 로그인 상태 확인
  useEffect(() => {
    const token = localStorage.getItem('AccessToken');
    if (!token) {
      alert('로그인이 필요합니다.');
      navigate('/'); // 로그인 페이지로 리다이렉트
    }
  }, [navigate]);

  const handleLogoutRequest = async () => {
    try {
      await axiosInstance.post('api/auth/logout'); // 로그아웃 API 경로
  
      localStorage.removeItem('AccessToken'); // 로컬 토큰 삭제
      localStorage.removeItem('userId'); // 로컬 유저 고유 아이디 삭제
      localStorage.removeItem('username'); // 로컬 아이디 삭제
      localStorage.removeItem('nickname'); // 로컬 닉네임 삭제
      onLogout();  // App.js의 handleLogout 함수를 호출하여 상태를 초기화
      navigate('/'); // 로그아웃 후, 루트 홈페이지(Login)로 이동
  
    } catch (error) {
      if (error.response && error.response.status === 401) {
        // 401 에러 무시하고 로그아웃 처리
        onLogout();
        navigate('/');
      } else {
        alert('로그아웃 중 오류가 발생했습니다.');
      }
    }
  };
  

  const handleChangePasswordClick = () => {
    // 비밀번호 변경 버튼 클릭시 비밀번호 변경 페이지 이동
    navigate("/changepassword");
  };

  const handleGoBack = () => {
    // 돌아가기 버튼 클릭시 단계 선택 화면으로 이동
    navigate('/choosestage');
  };

  const handleReset = () => {
    const userId = localStorage.getItem('userId');
    axiosInstance.post(`/api/users/${userId}/flags/reset`).then(response => {
      console.log(response);
    }, error => {
      console.log(error);
    })
  }

  return (
    <div className="my-page-container">
      <span className="mogako-title">MOGAKO FLAG</span>
      <h2>Welcome, {nickname}!</h2>
      <p>{nickname}님이 로그인한 아이디: {userId}</p>

      <button className="logoutBtn" onClick={handleLogoutRequest}>
        로그아웃
      </button>

      <button className="changePasswordBtn" onClick={handleChangePasswordClick}>
        비밀번호 변경
      </button>

      <button className="backBtn" onClick={handleGoBack}>
        돌아가기
      </button>

      <button className="resetBtn" onClick={handleReset}>
        기록 초기화
      </button>

    </div>
  );
}

export default MyPage;
