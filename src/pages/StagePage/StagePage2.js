import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './StagePage2.css';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import HomeIcon from '@mui/icons-material/Home';
import axiosInstance from '../../Components/AxiosInstance';


function StagePage2() 
{
  const navigate = useNavigate();  
  const [flagBgColor, setFlagBgColor] = useState('');
  const [taegukRedTranslate, setTaegukRedTranslate] = useState('');
  const [taegukBlueTranslate, setTaegukBlueTranslate] = useState('');
  const [score, setScore] = useState(0);

  const handleBlueTranslateChange = (e) => {
    const value = e.target.value;
    setTaegukBlueTranslate(value);
  }
  
  const sendScoreToBackend = async () => {
    // userId를 localStorage에서 가져옵니다.
    const userId = localStorage.getItem("userId");

    try {
        const response = await axiosInstance.post(`api/users/${userId}/flags`, {flagCode:'KR2' });
        console.log(response.data);
    } catch (error) {
        console.error('Error sending score:', error);
    }
  }


  /* 점수 계산하는 곳 아래의 답은 다 정답으로 처리 하니까 추가는 해도 삭제는 하지말아주세요! - 이정원 */
  useEffect(() => {
    let tempScore = 0;
    if (flagBgColor === 'background-color') tempScore += 33;
    if (taegukRedTranslate === "transform: translate"
    || taegukRedTranslate === "transform:translate"
    || taegukRedTranslate === "transform :translate"
    || taegukRedTranslate === "transform : translate") tempScore += 33; 
    if (taegukBlueTranslate === "-150%,0" 
    || taegukBlueTranslate === "-150%" 
    || taegukBlueTranslate === "-150%, 0" 
    || taegukBlueTranslate === "-150% , 0"
    || taegukBlueTranslate === "-150% ,0"
    || taegukBlueTranslate === "-150%,0px" 
    || taegukBlueTranslate === "-150% , 0px"
    || taegukBlueTranslate === "-150% ,0px" 
    || taegukBlueTranslate === "-150%, 0px"
    ||taegukBlueTranslate === "-150%,0%"
    ||taegukBlueTranslate === "-150% , 0%"
    ||taegukBlueTranslate === "-150% ,0%"
    ||taegukBlueTranslate === "-150%, 0%"
    ||taegukBlueTranslate === "-150%,0%"
    
    ) tempScore += 34;
    setScore(tempScore);

    if (tempScore === 100) {
      sendScoreToBackend();
  }

}, [flagBgColor, taegukRedTranslate, taegukBlueTranslate]);

/* 여기까지 점수 계산하는 코드 입니다! */


/* 아래의 코드는 값이 일치했을 때 flag클래스 안에 변화가 생기는 곳 */
const dynamicStyles = {
  '.flag': {
    'backgroundColor': flagBgColor === 'background-color' ? 'white' : ''
  },

  '.movable-red': {
    transform: (
      taegukRedTranslate === "transform: translate" 
    || taegukRedTranslate === "transform:translate" 
    || taegukRedTranslate === "transform : translate"
    || taegukRedTranslate === "transform :translate"
    ) ? 'translate(150%,0px)' : ''
  },
  
  '.taeguk1-blue': {
    transform: taegukBlueTranslate.includes('%') 
    ? `translate(${taegukBlueTranslate})` : ''
  }
  
};
/* 여기까지 ------------------------------------ */

  
  /* ------------------  페이지 이동  -------------------*/
  // 다음레벨 -
  const goToNextLevel = () => {
    alert('다음 난이도로 이동합니다!');
    navigate('/stage3');
  };

  // 이전 페이지
  const goBack = () => {
    navigate(-1);
};

// 메인 홈페이지로 이동

const goToChooseStagePage = () => {
  navigate('/ChooseStage');
};

  /* ------------------  페이지 이동 끝 -------------------*/

  return (
    <div className="container">
<div className="top-bar">
<span>Mogako-Korea</span>
    <div className="icon-container"> 
        <span onClick={goBack} style={{cursor: 'pointer'}}>  {/* goBack 함수를 호출합니다 */}
            <ArrowBackIcon className="arrow-back" />
        </span>
        <span onClick={goToChooseStagePage} style={{cursor: 'pointer'}}>
    <HomeIcon />
</span>
    </div>
</div>

      <div className="app">
        <div className="left">
          <div className="flag2" style={dynamicStyles['.flag']}>
          <div className="movable-red" style={dynamicStyles['.movable-red']}></div>
            <div className="taeguk1">
              <div className="taeguk1-red"></div>
              <div className="taeguk1-blue"></div>
            </div>  
              <div className="movable-blue" style={dynamicStyles['.taeguk1-blue']}></div>
          </div>
          <br />
          <div className="code-container">
    <div className="input-line">
        <pre>.flag {'{\n'}          <input
            value={flagBgColor} 
            onChange={(e) => setFlagBgColor(e.target.value)} 
            placeholder="" />{':  white;                   \n}'} </pre>              
            <div className="tooltip">
            Touch
 <div className="tooltiptext">
     힌트: background-color는 <br></br> 요소의 배경색을 설정하는 CSS 속성입니다.
 </div>
</div>
      </div>
            <br/><br />



            <div className="input-line">
              <pre>.taeguk1-red {'{\n'}          <input 
            value={taegukRedTranslate} 
            onChange={(e) => setTaegukRedTranslate(e.target.value)} 
            placeholder="" />{'(150%,0%);                  \n}'} </pre>              
            <div className="tooltip">
            Touch
 <div className="tooltiptext">
     힌트: transform: translate는 <br></br>x축과 y축 방향으로 이동시키는<br /> CSS 속성입니다.
 </div>
</div>
      </div>
              <br /><br />

              
{/* 실시간으로 파란 원이 움직이는걸 사용자들이 볼 수 있게 수정 중 - 10월 5일 이정원  */}
<div className="input-line">
  <pre>.taeguk1-blue {'{\n'}         transform: translate {"("}<input 
    value={taegukBlueTranslate}
    onChange={handleBlueTranslateChange}
    placeholder="x%, y%"/>{');     \n}'} </pre>            
                <div className="tooltip">
                Touch
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
     <div className="tooltiptext">
         힌트: -150%, 0%  < br />위 결과는 왼쪽으로 150만큼 < br />위아래로는 0만큼 이동합니다.   
     </div>
    </div>
    <div className="tooltip">
                Touch
     <div className="tooltiptext">
         힌트:<br /> x축과 y축을 작성하기 위해서는  < br /> x축과 y축 사이에  < br />(,)는 필수입니다!    
     </div>
    </div>
            </div>
          </div>
        </div>
{/* 여기까지 3가지 질문 끝  */}

        <div className="right">
          <p>Hint</p>
          <div className="hint">
  <p>1. 국기의 배경색을 하얀색으로 설정해보세요!<br /> `background-color`를 사용해 배경색을 지정할 수 있습니다.</p><br />
  <p>2. 빨간색 원의 위치를 조절해서 태극모양을 만들어보세요.<br />
      `transform: translate`를 사용하면 원의 위치를 조절할 수 있습니다.<br /></p><br />
  <p>3. 파란색 원을 실제 값을 넣어 태극모양을 완성해보세요.<br />
      (x%, y%) 형식으로 값을 입력해주세요.</p><br /><br /><br />
</div>

          <br /><br />
          <div className="scoreContainer">
            <p>완성도: {score}점</p>
            {score === 100 && <button-2 onClick={goToNextLevel}>다음 난이도</button-2>}
          </div>
        </div>
      </div>
    </div>
  );
}


export default StagePage2;


/*
스테이지 2
태극 문양을 만들어보며 클래스를 이동하는 css를 배우기
스테이지1 과 다른점
사용자가 값을 입력하면 실시간으로 상하 좌우로 움직이며 시각적인 환경에서 css를 배울 수 있도록 강조
여러가지의 중복되는 답을 전부 정답으로 처리 하면서 css의 넓은 입력값을 표현
*/