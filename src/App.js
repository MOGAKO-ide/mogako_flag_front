import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/LoginPage/LoginPage';
import MyPage from './pages/MyPage/MyPage';
import ChangePasswordPage from './pages/ChangePasswordPage/ChangePasswordPage';
import ChooseStage from './pages/ChooseStagePage/ChooseStagePage';
import StagePage1 from './pages/StagePage/StagePage1';
import StagePage2 from './pages/StagePage/StagePage2';
import StagePage3 from './pages/StagePage/StagePage3';

function App() {
  const [loggedInUser, setLoggedInUser] = useState(null); // 로그인한 사용자 정보
  useEffect(() => {
    console.log(loggedInUser);
  }, [loggedInUser]);

  const handleLogout = () => {
    setLoggedInUser(null);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login onLogin={setLoggedInUser} />} />
        <Route path="/mypage" element={<MyPage user={loggedInUser} onLogout={handleLogout} />} />
        <Route path="/changepassword" element={<ChangePasswordPage user={loggedInUser} />} />
        <Route path="/choosestage" element={<ChooseStage user={loggedInUser} />} />
        <Route path="/stage" element={<StagePage1 />} />
        <Route path="/stage2" element={<StagePage2 />} />
        <Route path="/stage3" element={<StagePage3 />} />
      </Routes>
    </Router>
  );
}

export default App;
