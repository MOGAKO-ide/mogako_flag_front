import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Login from './Login';
import MyPage from './MyPage';
import ChangePasswordPage from './ChangePasswordPage';

import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));

/*
// 로그인 매인
root.render(
  <React.StrictMode>
    <Login />
  </React.StrictMode>
);

*/

/*
// 마이페이지
root.render(
  <React.StrictMode>
    <MyPage 
      username="SampleUser"
      userId="user123"
      onLogout={() => console.log("Logout clicked!")}
      onChangePasswordClick={() => console.log("Change Password clicked!")}
    />
  </React.StrictMode>
);
*/


// 비밀번호 변경
root.render(
  <React.StrictMode>
    <ChangePasswordPage 
      onChangePassword={(current, newPass) => console.log(`Change from ${current} to ${newPass}`)}
      onCancel={() => console.log("Cancel clicked!")}
    />
  </React.StrictMode>
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();