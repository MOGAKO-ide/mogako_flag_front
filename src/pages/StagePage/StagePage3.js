import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './StagePage3.css';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import HomeIcon from '@mui/icons-material/Home';
import axiosInstance from '../../Components/AxiosInstance';




function StagePage3() 
{
  const navigate = useNavigate(); 
  const [score, setScore] = useState(0);
  const [skyOpacity, setSkyOpacity] = useState(0);  //감
  const [inputValue, setInputValue] = useState(''); //감
  const [waterRotation, setWaterRotation] = useState('rotate(0deg)'); // 건 초기 상태 설정
  const [transformCorrect, setTransformCorrect] = useState(false); // 건 상태 만들어서 입력 확인하기
 // 마지막 질문에 대해 작성중 아직 수정 중 - 10월 7일 이정원 -
 const [fireOrder, setFireOrder] = useState(2);  
 const [earthOrder, setEarthOrder] = useState(1);


 const sendScoreToBackend = async () => {
    try {
        const response = await axiosInstance.post('api/users/6b68642f-c5a9-4c09-9151-1474d6a896aa/flags', {flagCode:'KR3' });
        console.log(response.data);
    } catch (error) {
        console.error('Error sending score:', error);
    }
  }

  // 값이 정확한지 확인하고 점수를 업데이트 해주는 유저 이펙트 //
  useEffect(() => {
    let tempScore = 0;
    if (skyOpacity === 1) tempScore += 33; 
    if (transformCorrect) tempScore += 33;

    if (fireOrder === 1) tempScore += 34; // '화'와 '토'의 순서가 올바를 때 추가 점수

    setScore(tempScore);

    if (tempScore === 100) {
        sendScoreToBackend();
    }
    
}, [skyOpacity, waterRotation, transformCorrect, fireOrder, ]); 

  
  // 여기까지 유저이펙트 끝 아직 수정중 //

  //---  dynamicStyles 객체에 sky 클래스에 대한 스타일을 추가  -----//
  const dynamicStyles = {
    '.sky': {
      opacity: skyOpacity
    },
    '.water': {
      transform: waterRotation
    }
};


  //---------- 여기까지 다이나믹 객체 --------//

  const goToNextLevel = () => {
    alert('한국 국기 완료!');
    navigate("/ChooseStage");
  };

  const goBack = () => {
    navigate(-1);
};

// 메인 홈페이지로 이동

const goToChooseStagePage = () => {
  navigate('/ChooseStage');
};

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
            <div className="fire" style={{ order: fireOrder }}>
                    <div className="brick"></div>
                    <div className="brick"></div>
                    <div className="brick"></div>
                    <div className="brick"></div>
                </div>
                <div className="earth" style={{ order: earthOrder }}>
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
        placeholder=""
        onChange={(e) => {
            setInputValue(e.target.value);
            if (e.target.value === 'opacity') {
                setSkyOpacity(1);
            }
        }}
        value={inputValue}
    />
    {': 1;                           \n}'} 
    </pre>
    <div className="tooltip">
        Touch
        <div className="tooltiptext">
            힌트: 'opacity'는 요소의 투명도를 설정합니다. <br />
            '0'은 완전 투명, '1'은 완전 불투명을 의미합니다.
        </div>
    </div>
</div>

                <br/><br />

    {/* second 질문  --------------------------------------- */}    
    <div className="input-line">
    <pre>.water {'{\n'}          
    <input
    placeholder=""
    onChange={(e) => {
        if (e.target.value === 'transform') {
            setTransformCorrect(true); 
            setWaterRotation('rotate(50deg)');
        } else {
            setTransformCorrect(false); 
        }
    }}
/>
{': rotate(50deg);               \n}'} </pre>              
    <div className="tooltip">
        Touch
        <div className="tooltiptext">
            힌트:<br /> 'transform'은 요소의 모양을 바꾸는데 사용됩니다.
        </div>
    </div>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

    <div className="tooltip">
        Touch
        <div className="tooltiptext">
            힌트:<br /> 'rotate'는 요소를 지정된 각도로 회전시킵니다.
        </div>
    </div>
</div>

<br/><br />
    {/* 마지막질문  --------------------------------------- */}    
      {/* 마지막 질문 --------------------------------------- */}
      <div className="input-line">
    <pre>.fire {'{\n'}          
        <input
            placeholder=""
            onChange={(e) => {
              if (e.target.value === 'order') {
                  setFireOrder(1);
              }
          }}
        />
        {': 1;                           \n}'} </pre>              
    <div className="tooltip">
        Touch
        <div className="tooltiptext">
            힌트: 'order'는 아이템의 순서를 바꾸는데 사용됩니다. <br />
            숫자가 클수록 아이템은 더 뒤쪽으로 갑니다.
        </div>
    </div>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

    <div className="tooltip">
        Touch
        <div className="tooltiptext">
            힌트:<br /> 팔괘중 리는 곤보다 <br />
            숫자가 더 높습니다.
        </div>
    </div>
</div>
<br/><br />
        </div>
        </div>
        
    {/*————— 여기까지 질문 화면 끝 ———— 아직 수정중  */}



        <div className="right">
        <p>Hint</p>
        <div className="hint">
    <p>1. '건'의 투명도를 조절해보세요.</p>
    <p>2. '감'의 각도를 회전시켜 보세요.</p>
    <p>3. '곤'과 '리'의 위치를 원래대로 변경해보세요.</p>
</div>

          <br /><br />
          <div className="scoreContainer">
            <p>완성도: {score}점</p>
            {score === 100 && <button-3 onClick={goToNextLevel}>대한민국 완료!</button-3>}
          </div>
        </div>
      </div>
    </div>
  );
}


export default StagePage3;

/*
스테이지3
완전한 태극기를 만들어보며 여러가지의 css 속성 배우기
기울기와 투명도 그리고 간단한 우선순위? 를 배우며 css 속성 배우기
*/