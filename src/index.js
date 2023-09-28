import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login';
import MyPage from './MyPage';
import ChangePasswordPage from './ChangePasswordPage';
import reportWebVitals from './reportWebVitals';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MyPage 
          username="SampleUser"
          userId="user123"
          onLogout={() => console.log("Logout clicked!")}
          onChangePasswordClick={() => console.log("Change Password clicked!")}
        />} />
        <Route path="/login" element={<Login />} />
        <Route path="/changepassword" element={<ChangePasswordPage 
          onChangePassword={(current, newPass) => console.log(`Change from ${current} to ${newPass}`)}
          onCancel={() => console.log("Cancel clicked!")}
        />} />
      </Routes>
    </Router>
  );
}

// Using ReactDOM.createRoot() with Concurrent Mode
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();

