import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './LoginPage';
import Join from './JoinPage';

import MyPage from './MyPage';
import ChangePasswordPage from './ChangePasswordPage';
import ChooseStage from './ChooseStagePage';
import StagePage1 from './StagePage1';
import StagePage2 from './StagePage2';

function App() {
  return (
    <Router>
      <Routes>
        
        {/* 로그인페이지 */}
        <Route path="/join" element={<Join />} />


        <Route path="/" element={<Login />} />
        <Route path="/mypage" element={<MyPage 
          username="SampleUser"
          userId="user123"
          onLogout={() => console.log("Logout clicked!")}
        />} />
        <Route path="/changepassword" element={<ChangePasswordPage 
          onChangePassword={(current, newPass) => console.log(`Change from ${current} to ${newPass}`)}
        />} />
        <Route path="/choosestage" element={<ChooseStage
          username="SampleUser" 
        />} />
        <Route path="/stage" element={<StagePage1 />} />
        <Route path="/stage2" element={<StagePage2 />} />
      </Routes>
    </Router>
  );
}

export default App;


// 애플리케이션의 주요 구조와 라우팅을 담당