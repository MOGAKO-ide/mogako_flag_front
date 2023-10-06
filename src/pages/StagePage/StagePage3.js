import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './StagePage3.css';

function StagePage3() 
{
  const navigate = useNavigate(); 
  const [score, setScore] = useState(0);
  const [skyOpacity, setSkyOpacity] = useState(0);  //감
  const [inputValue, setInputValue] = useState(''); //감
  const [waterRotation, setWaterRotation] = useState('rotate(180deg)'); //건


  // 값이 정확한지 확인하고 점수를 업데이트 해주는 유저 이펙트 //
  useEffect(() => {
    let tempScore = 0;
    if (skyOpacity === 1) tempScore += 33; 
    if (waterRotation === 'rotate(-180deg)') tempScore += 33; 
    setScore(tempScore);
}, [skyOpacity, waterRotation]);



  
  // 여기까지 유저이펙트 끝 아직 수정중 //

  //---  dynamicStyles 객체에 sky 클래스에 대한 스타일을 추가  -----//
  const dynamicStyles = {
    '.sky': {
      opacity: skyOpacity === 'opacity' ? 1 : 0
    },
    '.water': {
      transform: waterRotation
    }
};


  //---------- 여기까지 다이나믹 객체 --------//

  const goToNextLevel = () => {
    alert('다음 난이도로 이동합니다!');
    navigate();
  };

  return (
    <div className="container">
      <div className="top-bar">
        <span>Mogako-Korea</span>
      </div>

      <div className="app">
        <div className="left">
          <div className="flag3">

 {/*-------------- 지금부터는 태극기 그리는 코드 -----------------*/}
            <div className="movable-red3"></div>
            <div className="taeguk1">
              <div className="taeguk1-red3"></div>
              <div className="taeguk1-blue3"></div>
            </div>  
              <div className="movable-blue3"></div>
        
        <div className="trigrams">
            <div className="top">
            <div className="sky" style={{ opacity: skyOpacity }}>
                    <div className="brick"></div>
                    <div className="brick"></div>
                    <div className="brick"></div>
                </div>
                <div className="water" style={dynamicStyles['.water']}>
                    <div className="brick"></div>
                    <div className="brick"></div>
                    <div className="brick"></div>
                    <div className="brick"></div>
                    <div className="brick"></div>
                </div>
            </div>
            <div className="bottom">
                <div className="fire">
                    <div className="brick"></div>
                    <div className="brick"></div>
                    <div className="brick"></div>
                    <div className="brick"></div>
                </div>
                <div className="earth">
                    <div className="brick"></div>
                    <div className="brick"></div>
                    <div className="brick"></div>
                    <div className="brick"></div>
                    <div className="brick"></div>
                    <div className="brick"></div>
                </div>
            </div>
        </div>
    </div>
    {/* 태극기는 여기까지 해서 완료 10월 6일 이정원 확인 -- */}

    {/* 지금부터는 질문화면 -- */}
          
    <br />
            <div className="code-container">

    {/* 처음 질문  --------------------------------------- */}    
                <div className="input-line">
                    <pre>.sky {'{\n'}          
                    <input
    placeholder="opacity"
    onChange={(e) => {
        setInputValue(e.target.value);
        if (e.target.value === 'opacity') {
            setSkyOpacity(1);
        }
    }}
    value={inputValue}
/>

                {': 1; \n}'} 
                    </pre>
                </div>
                <br/><br />

    {/* second 질문  --------------------------------------- */}    
    <div className="input-line">
    <pre>.water {'{\n'}          
    <input
    placeholder="transform"
    onChange={(e) => {
        if (e.target.value === 'transform') {
            setWaterRotation('rotate(-180deg)');
        }
    }}
/>{': rotate(180deg); \n}'} 
    </pre>
</div>
<br/><br />
    {/* 마지막질문  --------------------------------------- */}    



        </div>
        </div>
        
    {/*---------- 여기까지 질문 화면 끝 -------- 아직 수정중  */}



        <div className="right">
        <p>Hint</p>
          <div className="hint">
            {/* 힌트 내용을 작성. */}
            <p>1. '건'의 투명도를 조절해보세요.</p>
            <p>2. '곤'의 각도를 회전시켜 보세요.</p>
           
          </div>
          <br /><br />
          <div className="scoreContainer">
            <p>완성도: {score}점</p>
            {score === 100 && <button onClick={goToNextLevel}>대한민국 완료!</button>}
          </div>
        </div>
      </div>
    </div>
  );
}


export default StagePage3;
