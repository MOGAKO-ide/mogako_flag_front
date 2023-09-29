import React from 'react';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

function ChooseStage({ username }) {
  const navigate = useNavigate();

  const handleStageClick = () => {
    // 추후 단계 내부 화면 구현 시 해당 경로로 수정 필요
    navigate('/mypage');
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
            onClick={handleStageClick}
          >
            {/* 이 부분에서 국기 이미지와 나라 이름을 추가/수정하실 수 있습니다. */}
            <img src="path_to_flag_image" alt="Flag" style={{ width: '100px', height: '100px' }} />
            <div>{stage}</div>
            <div>진행도: XX%</div>
          </Button>
        ))}
      </div>
    </div>
  );
}

export default ChooseStage;
