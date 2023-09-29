import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import MyPage from './MyPage';
import ChangePasswordPage from './ChangePasswordPage';
import ChooseStage from './ChooseStage';

function App() {
  return (
    <Router>
      <Routes>
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
      </Routes>
    </Router>
  );
}

export default App;


// 애플리케이션의 주요 구조와 라우팅을 담당