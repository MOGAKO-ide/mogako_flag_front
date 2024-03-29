import React, { useEffect, useState } from 'react';  // useEffect 추가
import { useNavigate } from 'react-router-dom';
import './ChooseStagePage.css';
import PersonIcon from '@mui/icons-material/Person';
import './ChooseStagePage.css';
import instance from '../../Components/AxiosInstance';

// 이미지 경로를 public 디렉토리를 기반으로 수정
const Stage1Flag = '/images/korea_flag.png';
const Stage2Flag = '/images/greece_flag.png';
const Stage3Flag = '/images/germany_flag.png';
const Stage4Flag = '/images/switzerland_flag.png';

function ChooseStagePage({ user }) {
  console.log(user); // 콘솔에 정보 넘어왔는지 확인 용도
  const navigate = useNavigate();
  const [totalStages, setTotalStages] = useState(0);
  const [completedStages, setCompltedStages] = useState(0);

  const isImpleted = {
    "Korea": true, 
    "Greece": false, 
    "Germany": false, 
    "Switzerland": false
  }
  
  useEffect(() => {  // useEffect를 사용하여 컴포넌트가 마운트될 때 실행
    const accessToken = localStorage.getItem('AccessToken');
    const userId = localStorage.getItem('userId');
    
    

    const headers = {
      Authroization: `Bearer ${accessToken}`
    }

    instance.get(`/api/users/${userId}/flags/KR`, headers)
      .then(response => {
        setTotalStages(response.data.totalStages);
        setCompltedStages(response.data.completedStages);

    }, error => {
      console.log(error);   
    })

  }, [navigate]); // navigate를 의존성 배열에 추가

  const flags = [Stage1Flag, Stage2Flag, Stage3Flag, Stage4Flag];

  const handleStageClick = (stage) => {
    if (stage === 'Korea') {
      navigate('/stage');
    } else {
      window.alert("준비중입니다.");
    }
  };

  return (
    <div className="choose-stage-container">
      <div className="user-info-box">
      <span>MOGAKO FLAG</span>
      <button onClick={() => navigate('/mypage')}>
        <PersonIcon />
          &nbsp;My Page
        </button>
      </div>

      <div className="stages">
        {['Korea', 'Greece', 'Germany', 'Switzerland'].map((stage, index) => (
          <button
            key={index}
            className="stage-button"
            onClick={() => handleStageClick(stage)} // stage 정보 전달
          >
            <img src={flags[index]} alt={`Flag for ${stage}`} />
            <div>{stage}</div>

            { isImpleted[stage] === true ? (
              <div>진행도: { (completedStages / totalStages * 100).toFixed(2)  } %</div>
            ) : (
              <div>준비중 입니다</div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

export default ChooseStagePage;
