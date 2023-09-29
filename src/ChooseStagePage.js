import React from 'react';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

// ... 기존 import ...

function ChooseStagePage({ username }) {
  const navigate = useNavigate();

  const handleStageClick = (stage) => {
    if (stage === 'Stage 1') {
      navigate('/mypage');
    } else {
      window.alert("준비중입니다.");
    }
  };

  return (
    <div className="choose-stage-container">
      <div className="user-info-box">
        <span>{username}</span>
        <Button variant="contained" onClick={() => navigate('/mypage')}>
          My Page
        </Button>
      </div>

      <div className="stages">
        {['Stage 1', 'Stage 2', 'Stage 3', 'Stage 4'].map((stage, index) => (
          <Button
            key={index}
            variant="contained"
            style={{ width: '200px', height: '400px', margin: '10px' }}
            onClick={() => handleStageClick(stage)}  // 여기에서 stage 정보를 전달
          >
            {/* 이 부분에서 국기 이미지와 나라 이름을 추가/수정 */}
            <img src="path_to_flag_image" alt="Flag" style={{ width: '100px', height: '100px' }} />
            <div>{stage}</div>
            <div>진행도: XX%</div>
          </Button>
        ))}
      </div>
    </div>
  );
}

export default ChooseStagePage;
