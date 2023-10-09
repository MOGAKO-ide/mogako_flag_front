import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage/LoginPage';
import JoinPage from './pages/JoinPage/JoinPage';
import MyPage from './pages/MyPage/MyPage';
import ChangePasswordPage from './pages/ChangePasswordPage/ChangePasswordPage';
import ChooseStage from './pages/ChooseStagePage/ChooseStagePage';
import StagePage1 from './pages/StagePage/StagePage1';
import StagePage2 from './pages/StagePage/StagePage2';
import StagePage3 from './pages/StagePage/StagePage3';
import JoinAndLoginPage from "./pages/JoinAndLoginPage/JoinAndLoginPage";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); 

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/main" />} />
          <Route path="/main/*" element={<JoinAndLoginPage onLogin={setIsLoggedIn} />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/join" element={<JoinPage />} />
          <Route path="/mypage" element={<MyPage isLoggedIn={isLoggedIn} onLogout={handleLogout} />} />
          <Route path="/changepassword" element={<ChangePasswordPage isLoggedIn={isLoggedIn} />} />
          <Route path="/choosestage" element={<ChooseStage isLoggedIn={isLoggedIn} />} />
          <Route path="/stage" element={<StagePage1 />} />
          <Route path="/stage2" element={<StagePage2 />} />
          <Route path="/stage3" element={<StagePage3 />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
