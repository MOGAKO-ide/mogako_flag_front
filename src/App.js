import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './LoginPage';
import Join from './JoinPage';

import MyPage from './MyPage';
import ChangePasswordPage from './ChangePasswordPage';
import ChooseStage from './ChooseStagePage';
import StagePage1 from './StagePage1';
import StagePage2 from './StagePage2';

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
        
        
        <Route path="/join" element={<Join />} />
        <Route path="/" element={<Login onLogin={setLoggedInUser} />} />
        <Route path="/mypage" element={<MyPage user={loggedInUser} onLogout={handleLogout} />} />
        <Route path="/changepassword" element={<ChangePasswordPage user={loggedInUser} />} />
        <Route path="/choosestage" element={<ChooseStage user={loggedInUser} />} />
        <Route path="/stage" element={<StagePage1 />} />
        <Route path="/stage2" element={<StagePage2 />} />
      </Routes>
    </Router>
  );
}

export default App;
