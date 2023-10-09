import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/LoginPage/LoginPage';
import Join from './pages/JoinPage/JoinPage';
import MyPage from './pages/MyPage/MyPage';
import ChangePasswordPage from './pages/ChangePasswordPage/ChangePasswordPage';
import ChooseStage from './pages/ChooseStagePage/ChooseStagePage';
import StagePage1 from './pages/StagePage/StagePage1';
import StagePage2 from './pages/StagePage/StagePage2';
import StagePage3 from './pages/StagePage/StagePage3';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('AccessToken'));


  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <Routes>
        <Route path="/join" element={<Join />} />
        <Route path="/" element={<Login onLogin={setIsLoggedIn} />} />
        <Route path="/mypage" element={<MyPage isLoggedIn={isLoggedIn} onLogout={handleLogout} />} />
        <Route path="/changepassword" element={<ChangePasswordPage isLoggedIn={isLoggedIn} />} />
        <Route path="/choosestage" element={<ChooseStage isLoggedIn={isLoggedIn} />} />
        <Route path="/stage" element={<StagePage1 />} />
        <Route path="/stage2" element={<StagePage2 />} />
        <Route path="/stage3" element={<StagePage3 />} />
      </Routes>
    </Router>
  );
}

export default App;
