import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './StagePage1.css';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import HomeIcon from '@mui/icons-material/Home';

/* 48번 째 줄의 문제를 해결하기 위해 컴포넌트 최상단에 재 정의  */
const acceptedWhiteColors = ['white', '#fff', '#ffffff', '#FFF', '#FFFFFF'];
const acceptedRedColors = ['red', '#f00', '#ff0000', '#F00', '#FF0000'];
const acceptedBlueColors = ['blue', '#00f', '#0000ff', '#00F', '#0000FF'];
/* 위에 코드 건들면 코드 꼬입니다!! - 이정원*/ 


/* 코치님이 분명 유즈 스테이트 말고 다른거 사용해보라고 했는데 기억나는 분 저한테 디코 한번만 부탁드릴게요! - 이정원 */
function StagePage1() {
  const navigate = useNavigate();  
  const [flagBgColor, setFlagBgColor] = useState('');
  const [taegukRedColor, setTaegukRedColor] = useState('');
  const [taegukBlueColor, setTaegukBlueColor] = useState('');
  const [score, setScore] = useState(0);


  // 정답 부분 --- 여러가지의 정답이 있어 아래의 코드들은 전부 정답으로 처리 했습니다. 
  useEffect(() => {
    let tempScore = 0;
  
    if (acceptedWhiteColors.includes(flagBgColor) && flagBgColor.length === acceptedWhiteColors.find(color => color === flagBgColor).length) tempScore += 33;
    if (acceptedRedColors.includes(taegukRedColor) && taegukRedColor.length === acceptedRedColors.find(color => color === taegukRedColor).length) tempScore += 33;
    if (acceptedBlueColors.includes(taegukBlueColor) && taegukBlueColor.length === acceptedBlueColors.find(color => color === taegukBlueColor).length) tempScore += 34;
  
    setScore(tempScore);
  }, [flagBgColor, taegukRedColor, taegukBlueColor]);
  // 여기까지 

/* 지금 정답에 추가로 뭐를 입력해도 색이 안변하는 문제를 발견해 수정하는 중 - 이정원 10 월 7일 시작 */
/* 아래의 코드가 가장 어렵네.. */
const allColors = [...acceptedWhiteColors, ...acceptedRedColors, ...acceptedBlueColors];

const dynamicStyles = {
  '.flag': {
    'backgroundColor': allColors.includes(flagBgColor) && flagBgColor.length === allColors.find(color => color === flagBgColor).length ? flagBgColor : 'transparent'
  },
  '.taeguk-red': {
    'backgroundColor': allColors.includes(taegukRedColor) && taegukRedColor.length === allColors.find(color => color === taegukRedColor).length ? taegukRedColor : 'transparent'
  },
  '.taeguk-blue': {
    'backgroundColor': allColors.includes(taegukBlueColor) && taegukBlueColor.length === allColors.find(color => color === taegukBlueColor).length ? taegukBlueColor : 'transparent'
  }
};

// 문제 해결 배열들이 dynamicStyles 내부에서 직접 접근되기 때문에 오류가 발생 한 것 같음 - 이정원 확인 

  /* ------------------  페이지 이동  -------------------*/
  // 다음레벨 -
  const goToNextLevel = () => {
    alert('다음 난이도로 이동합니다!');
    navigate('/stage2');
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
          <div className="flag1" style={dynamicStyles['.flag']}>
            <div className="taeguk-red" style={dynamicStyles['.taeguk-red']}></div>
            <div className="taeguk-blue" style={dynamicStyles['.taeguk-blue']}></div>
          </div>
      <br></br>

      {/*힌트를 추가하고 정답의 다양성을 추가 + 정답을 입력했지만 정답을 삭제할 경우 색상 초기화 및 점수 감점 추가 */}
          <div className="code-container">

            <div className="input-line">
              <pre>.flag {'{\n'}  background-color: </pre>
              <input 
                value={flagBgColor} 
                onChange={(e) => setFlagBgColor(e.target.value)} 
                placeholder="값 입력"
              />
              <pre>{";}"}       </pre>
              <div className="tooltip">
                   Touch
        <div className="tooltiptext">
            힌트: background-color는 <br></br> 요소의 배경색을 설정하는 CSS 속성입니다.
        </div>
    </div>
            </div>

            <div className="input-line">
              <pre>.taeguk-red {'{\n'}  background-color: </pre>
              <input 
                value={taegukRedColor} 
                onChange={(e) => setTaegukRedColor(e.target.value)} 
                placeholder="값 입력"
              />
                            <pre>{";}"}       </pre>
              <div className="tooltip">
              Touch
        <div className="tooltiptext">
            힌트: CSS 색상 코드는 대소문자를 구분하지 않습니다.
        </div>
            </div>
          </div>

            <div className="input-line">
              <pre>.taeguk-blue {'{\n'}  background-color: </pre>
              <input 
                value={taegukBlueColor} 
                onChange={(e) => setTaegukBlueColor(e.target.value)} 
                placeholder="값 입력"
              />
                            <pre>{";}"}       </pre>
              <div className="tooltip">
              Touch
        <div className="tooltiptext">
            힌트: 1. 하얀색< br /> 2. 빨간색   3. 파란색 < br />
        </div>
            </div>
            </div>
          </div>
        </div>

{/* 지금부터는 오른쪽 화면의 힌트들-----------------------------------------------------*/ }
        <div className="right">
    <p>Hint</p>
    <div className="hint">
        <p>1. 국기의 배경색은 흰색(white)입니다.</p>
        <p>하얀색상의 코드는 다음과 같습니다:<br />
        'white', '#fff', '#ffffff', '#FFF', '#FFFFFF'</p><br />
        <p>2. 태극의 빨간색 부분은 빨간색(red)입니다.</p>
        <p>빨간색상의 코드는 다음과 같습니다:<br />
        'red', '#f00', '#ff0000', '#F00', '#FF0000'</p><br />
        <p>3. 태극의 파란색 부분은 파란색(blue)입니다.</p>
        <p>파란색상의 코드는 다음과 같습니다:<br />
        'blue', '#00f', '#0000ff', '#00F', '#0000FF'</p>
    </div>
    <br /><br />
    <div className="scoreContainer">
        <p>완성도: {score}점</p>
        {score === 100 && <button onClick={goToNextLevel}>다음 난이도</button>}
    </div>
</div>

      </div>
    </div>
  );
}

export default StagePage1;



/*
스테이지 1
간단한 css를 배우기
뒤로가기, 홈버튼 추가
답변을 white, red, blue가 아닌 색상 코드를 입력해도 정답으로 인정
touch버튼을 통해 각 문법의 특성을 알 수 있음 (간단한 ux 디자인 채택)
완성도 100점을 통해 다음페이지로 이동 가능함

현재 white 라는 정답 뒤에 white1 이렇게 적어도 색이 변경되는 문제를 수정중 10 - 7일 - 이정원 
*문제 해결 acceptedBlueColors 배열들이 dynamicStyles 내부에서 직접 접근되기 때문에 오류가 발생 한 것 같음 - 이정원 확인 

정답을 입력하고 뒤에 실수로 뭐를 더 입력했을 때  색상 초기화 + 감점
 */