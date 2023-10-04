import React, { useState, useEffect } from 'react';
import './StagePage.css';

function StagePage() {
  const [flagBgColor, setFlagBgColor] = useState('');
  const [taegukRedColor, setTaegukRedColor] = useState('');
  const [taegukBlueColor, setTaegukBlueColor] = useState('');
  const [score, setScore] = useState(0);

  useEffect(() => {
    let tempScore = 0;
    if (flagBgColor === 'white') tempScore += 33;
    if (taegukRedColor === 'red') tempScore += 33;
    if (taegukBlueColor === 'blue') tempScore += 34; // 최종 점수를 100점으로 만들기 위해 1점 추가
    setScore(tempScore);
  }, [flagBgColor, taegukRedColor, taegukBlueColor]);



  const dynamicStyles = {
    '.flag': {
      'backgroundColor': flagBgColor
    },
    '.taeguk-red': {
      'backgroundColor': taegukRedColor
    },
    '.taeguk-blue': {
      'backgroundColor': taegukBlueColor
    }
  };

  return (
    <div className="container">
      <div className="top-bar">
        <span>MOGAKO FLAG - Korea</span>
      </div>

      <div className="app">
        <div className="left">
          <div className="flag" style={dynamicStyles['.flag']}>
            <div className="taeguk-red" style={dynamicStyles['.taeguk-red']}></div>
            <div className="taeguk-blue" style={dynamicStyles['.taeguk-blue']}></div>
          </div>
      <br></br>
          <div className="code-container">
            <div className="input-line">
              <pre>.flag {'{\n'}  background-color: </pre>
              <input 
                value={flagBgColor} 
                onChange={(e) => setFlagBgColor(e.target.value)} 
                placeholder="값 입력"
              />
              <pre>;}</pre>
            </div>

            <div className="input-line">
              <pre>.taeguk-red {'{\n'}  background-color: </pre>
              <input 
                value={taegukRedColor} 
                onChange={(e) => setTaegukRedColor(e.target.value)} 
                placeholder="값 입력"
              />
              <pre>;}</pre>
            </div>

            <div className="input-line">
              <pre>.taeguk-blue {'{\n'}  background-color: </pre>
              <input 
                value={taegukBlueColor} 
                onChange={(e) => setTaegukBlueColor(e.target.value)} 
                placeholder="값 입력"
              />
              <pre>;}</pre>
            </div>
          </div>
        </div>

        <div className="right">
  <p>Hint</p>
  <div className="hint">
    <p>1. 국기의 배경색은 흰색입니다.</p>
    <p>2. 태극의 빨간색 부분은 빨간색(red)입니다.</p>
    <p>3. 태극의 파란색 부분은 파란색(blue)입니다.</p>
  </div>
  <br></br><br></br>
  <p>완성도: {score}점</p>  {/* 점수 표시 부분 추가 */}
</div>
        </div>
      </div>
    
  );
}

export default StagePage;
