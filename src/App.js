import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './Login';
import MyPage from './MyPage';
import ChangePasswordPage from './ChangePasswordPage';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/mypage" exact component={MyPage} />
        <Route path="/changepassword" exact component={ChangePasswordPage} />
      </Switch>
    </Router>
  );
}

export default App;
