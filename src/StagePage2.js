import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './StagePage2.css';

function StagePage2() {
  const navigate = useNavigate();
  
  const [flagBgColor, setFlagBgColor] = useState('');
  const [taegukRedTranslate, setTaegukRedTranslate] = useState('');
  const [taegukBlueTranslate, setTaegukBlueTranslate] = useState('');
  const [score, setScore] = useState(0);

  useEffect(() => {
    let tempScore = 0;
    if (flagBgColor === 'background-color') tempScore += 33;
    if (taegukRedTranslate === "transform: translate"
    || taegukRedTranslate === "transform:translate"
    || taegukRedTranslate === "transform : translate") tempScore += 33; 
    if (taegukBlueTranslate === "(-150%,0);" || taegukBlueTranslate === "(-150%);" 
    || taegukBlueTranslate === "(-150%, 0);" 
    || taegukBlueTranslate === "(-150% , 0);"
    || taegukBlueTranslate === "(-150%,0px);" 
    || taegukBlueTranslate === "(-150% , 0px);"
    || taegukBlueTranslate === "(-150% ,0px);" 
    || taegukBlueTranslate === "(-150%, 0px);") tempScore += 34;
    setScore(tempScore);
}, [flagBgColor, taegukRedTranslate, taegukBlueTranslate]);


const dynamicStyles = {
  '.flag': {
    'backgroundColor': flagBgColor === 'background-color' ? 'white' : ''
  },
  '.movable-red': {
    transform: taegukRedTranslate === 'transform: translate' ? 'translate(150%,0px)' : ''
  },
  '.taeguk1-blue': {
    transform: taegukBlueTranslate === "(-150%,0);" || taegukBlueTranslate === "(-150%);" ? 'translate(-150%,0px)' : ''
  }
  
  };

  // 배경색 변화


  

  const goToNextLevel = () => {
    alert('다음 난이도로 이동합니다!');
    navigate('/stage3');
  };

  return (
    <div className="container">
      <div className="top-bar">
        <span>Mogako-Korea</span>
      </div>

      <div className="app">
        <div className="left">
          <div className="flag" style={dynamicStyles['.flag']}>
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
            placeholder="background-color" />{':  white; \n}'} </pre>
      </div>
            <br/><br />



            <div className="input-line">
              <pre>.taeguk1-red {'{\n'}          <input 
            value={taegukRedTranslate} 
            onChange={(e) => setTaegukRedTranslate(e.target.value)} 
            placeholder="transform: translate" />{'(150%,0px); \n}'} </pre>
      </div>
              <br /><br />

              

            <div className="input-line">
              <pre>.taeguk1-blue {'{\n'}         transform: translate <input 
                value={taegukBlueTranslate}
                onChange={(e) => setTaegukBlueTranslate(e.target.value)}
                placeholder="(-150%, 0);"/>{'\n}'}</pre>
            </div>
          </div>
        </div>

        <div className="right">
          <p>Hint</p>
          <div className="hint">
  <p>1. 국기의 배경색을 하얀색으로 설정해보세요! `.flag`에서 `background-color` 값을 입력할 수 있습니다.</p><br />
  <p>2. `.taeguk1-red` 원의 위치를 조절해서 태극모양을 만들어보세요.<br />
      `transform: translate(...)`를 사용하면 원의 위치를 조절할 수 있습니다.<br /> 입력창에 원하는 값을 넣어 원을 움직여보세요!</p><br />
  <p>3. `.taeguk1-blue` 원도 마찬가지로 움직여 태극모양을 완성해보세요.<br />
      `transform: translate(...)`로 위치를 조절할 수 있습니다. (x 값, y 값) 형식으로 값을 입력하세요.</p><br /><br /><br />
  
  <p classname="hint"> Tip.<br /><br /> {"("}x,y{")"}중 x값은 왼쪽 오른쪽으로 움직여요 100% = 오른쪽으로 100%, <br />-100% = 왼쪽으로 100%
  {"("}x,y{")"}중 y값은 위 아래로 움직여요!<br /> 움직일 필요가 없다면 0을 작성해보세요 </p>
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

export default StagePage2;
