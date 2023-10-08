import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './StagePage1.css';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import HomeIcon from '@mui/icons-material/Home';

/* 48번 째 줄의 문제를 해결하기 위해 컴포넌트 최상단에 재 정의  */
const acceptedWhiteColors = ['white', '#fff', '#ffffff', '#FFF', '#FFFFFF'];
const acceptedRedColors = ['red', '#f00', '#ff0000', '#F00', '#FF0000'];
const acceptedBlueColors = ['blue', '#00f', '#0000ff', '#00F', '#0000FF'];
const acceptedGreenColors = ['green', '#0f0', '#00ff00', '#0F0', '#00FF00'];
const acceptedYellowColors = ['yellow', '#ff0', '#ffff00', '#FF0', '#FFFF00'];
const acceptedPurpleColors = ['purple', '#800080', '#800080', '#800080', '#800080'];
const acceptedOrangeColors = ['orange', '#ffa500', '#ffa500', '#FFA500', '#FFA500'];
const acceptedBlackColors = ['black', '#000', '#000000', '#000', '#000000'];
const acceptedGrayColors = ['gray', '#808080', '#808080', '#808080', '#808080'];
const acceptedPinkColors = ['pink', '#ffc0cb', '#ffc0cb', '#FFC0CB', '#FFC0CB'];
const acceptedBrownColors = ['brown', '#a52a2a', '#a52a2a', '#A52A2A', '#A52A2A'];
const acceptedTealColors = ['teal', '#008080', '#008080', '#008080', '#008080'];
const acceptedCyanColors = ['cyan', '#00ffff', '#00ffff', '#00FFFF', '#00FFFF'];
const acceptedMagentaColors = ['magenta', '#ff00ff', '#ff00ff', '#FF00FF', '#FF00FF'];
const acceptedLimeColors = ['lime', '#00ff00', '#00ff00', '#00FF00', '#00FF00'];
const acceptedIndigoColors = ['indigo', '#4b0082', '#4b0082', '#4B0082', '#4B0082'];
const acceptedBeigeColors = ['beige', '#f5f5dc', '#f5f5dc', '#F5F5DC', '#F5F5DC'];
const acceptedOliveColors = ['olive', '#808000', '#808000', '#808000', '#808000'];
const acceptedMaroonColors = ['maroon', '#800000', '#800000', '#800000', '#800000'];
const acceptedGoldColors = ['gold', '#ffd700', '#ffd700', '#FFD700', '#FFD700'];
const acceptedSilverColors = ['silver', '#c0c0c0', '#c0c0c0', '#C0C0C0', '#C0C0C0'];
const acceptedLavenderColors = ['lavender', '#e6e6fa', '#e6e6fa', '#E6E6FA', '#E6E6FA'];
const acceptedTanColors = ['tan', '#d2b48c', '#d2b48c', '#D2B48C', '#D2B48C'];
const acceptedCoralColors = ['coral', '#ff7f50', '#ff7f50', '#FF7F50', '#FF7F50'];
const acceptedNavyColors = ['navy', '#000080', '#000080', '#000080', '#000080'];
const acceptedTurquoiseColors = ['turquoise', '#40e0d0', '#40e0d0', '#40E0D0', '#40E0D0'];
const acceptedSteelBlueColors = ['steelblue', '#4682b4', '#4682b4', '#4682B4', '#4682B4'];
const acceptedPeruColors = ['peru', '#cd853f', '#cd853f', '#CD853F', '#CD853F'];
const acceptedChartreuseColors = ['chartreuse', '#7fff00', '#7fff00', '#7FFF00', '#7FFF00'];
const acceptedKhakiColors = ['khaki', '#f0e68c', '#f0e68c', '#F0E68C', '#F0E68C'];
const acceptedPlumColors = ['plum', '#dda0dd', '#dda0dd', '#DDA0DD', '#DDA0DD'];
const acceptedOliveDrabColors = ['olivedrab', '#6b8e23', '#6b8e23', '#6B8E23', '#6B8E23'];
const acceptedCrimsonColors = ['crimson', '#dc143c', '#dc143c', '#DC143C', '#DC143C'];
const acceptedDarkCyanColors = ['darkcyan', '#008b8b', '#008b8b', '#008B8B', '#008B8B'];
const acceptedLightSalmonColors = ['lightsalmon', '#ffa07a', '#ffa07a', '#FFA07A', '#FFA07A'];
const acceptedMediumPurpleColors = ['mediumpurple', '#9370db', '#9370db', '#9370DB', '#9370DB'];
const acceptedLightGreenColors = ['lightgreen', '#90ee90', '#90ee90', '#90EE90', '#90EE90'];
const acceptedSlateBlueColors = ['slateblue', '#6a5acd', '#6a5acd', '#6A5ACD', '#6A5ACD'];
const acceptedSandyBrownColors = ['sandybrown', '#f4a460', '#f4a460', '#F4A460', '#F4A460'];
const acceptedDarkMagentaColors = ['darkmagenta', '#8b008b', '#8b008b', '#8B008B', '#8B008B'];
const acceptedMediumSeaGreenColors = ['mediumseagreen', '#3cb371', '#3cb371', '#3CB371', '#3CB371'];
const acceptedRoyalBlueColors = ['royalblue', '#4169e1', '#4169e1', '#4169E1', '#4169E1'];
const acceptedMediumOrchidColors = ['mediumorchid', '#ba55d3', '#ba55d3', '#BA55D3', '#BA55D3'];
const acceptedLightCyanColors = ['lightcyan', '#e0ffff', '#e0ffff', '#E0FFFF', '#E0FFFF'];
const acceptedMediumTurquoiseColors = ['mediumturquoise', '#48d1cc', '#48d1cc', '#48D1CC', '#48D1CC'];
const acceptedGoldenrodColors = ['goldenrod', '#daa520', '#daa520', '#DAA520', '#DAA520'];
const acceptedAquamarineColors = ['aquamarine', '#7fffd4', '#7fffd4', '#7FFFD4', '#7FFFD4'];
const acceptedMediumSpringGreenColors = ['mediumspringgreen', '#00fa9a', '#00fa9a', '#00FA9A', '#00FA9A'];
const acceptedDarkOrangeColors = ['darkorange', '#ff8c00', '#ff8c00', '#FF8C00', '#FF8C00'];
const acceptedLightPinkColors = ['lightpink', '#ffb6c1', '#ffb6c1', '#FFB6C1', '#FFB6C1'];
/* 위에 코드 건들면 색상 입력코드 꼬입니다!! 사실 더 쉽게 하고싶은 방법을 찾고싶지만 실패했습니다..- 이정원*/ 


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
const allColors = [
  ...acceptedWhiteColors, ...acceptedRedColors, ...acceptedBlueColors, ...acceptedGreenColors, ...acceptedYellowColors, ...acceptedPurpleColors, ...acceptedOrangeColors, 
  ...acceptedBlackColors, ...acceptedGrayColors, ...acceptedPinkColors, ...acceptedBrownColors, ...acceptedTealColors, ...acceptedCyanColors, 
  ...acceptedMagentaColors, ...acceptedLimeColors,...acceptedIndigoColors, ...acceptedBeigeColors, ...acceptedOliveColors, ...acceptedMaroonColors, 
  ...acceptedGoldColors, ...acceptedSilverColors, ...acceptedLavenderColors, ...acceptedTanColors, ...acceptedCoralColors, 
  ...acceptedNavyColors, ...acceptedTurquoiseColors, ...acceptedSteelBlueColors, ...acceptedPeruColors, ...acceptedChartreuseColors, 
  ...acceptedKhakiColors, ...acceptedPlumColors, ...acceptedOliveDrabColors, ...acceptedCrimsonColors, ...acceptedDarkCyanColors, 
  ...acceptedLightSalmonColors, ...acceptedMediumPurpleColors, ...acceptedLightGreenColors, ...acceptedSlateBlueColors, ...acceptedSandyBrownColors, 
  ...acceptedDarkMagentaColors, ...acceptedMediumSeaGreenColors, ...acceptedRoyalBlueColors, ...acceptedMediumOrchidColors, ...acceptedLightCyanColors, 
  ...acceptedMediumTurquoiseColors, ...acceptedGoldenrodColors, ...acceptedAquamarineColors, ...acceptedMediumSpringGreenColors, ...acceptedDarkOrangeColors, ...acceptedLightPinkColors
];

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
        {score === 100 && <button1 onClick={goToNextLevel}>다음 난이도</button1>}
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