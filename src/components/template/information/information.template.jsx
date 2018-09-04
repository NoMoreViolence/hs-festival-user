import React from 'react';
import './information.template.scss';

import * as moment from 'moment';
import LoginContainer from '../../../container/login/login.container';

import 'moment/locale/ko';

moment.locale('ko');

class LoginTemplate extends React.Component {
  state = {
    showLogin: false, // 로그인 컴포넌트
    showRegister: false, // 회원가입 컴포넌트
    time: moment().format('llll'), // 페이지가 로딩된 시점의 현재 시간만 가져온다, 시계가 아님
  };

  // Register
  showRegister = () => {
    this.setState({
      showRegister: !this.state.showRegister,
      showLogin: false,
    });
  };

  // Login
  showLogin = () => {
    this.setState({
      showLogin: !this.state.showLogin,
      showRegister: false,
    });
  };

  render() {
    const { showLogin, showRegister } = this.state;

    return (
      <div className="container information-container">
        <div className="card">
          <header className="card-header has-background-white-bis">
            <div className="header">코딩노예 이지훈과 함께하는 한세축제</div>
          </header>
          <div className="card-content has-background-white-ter">
            <div className="content">
              <div className="content-text">한세인의 재미있는 축제</div>
              <div className="content-text">코딩노예 이지훈 의 축제 페이지 만들기 작업</div>
              <div className="content-text">무료봉사</div>
            </div>
            <div className="time">
              <time className="time-text">{`${this.state.time}`}</time>
            </div>
          </div>
          <footer className="card-footer has-background-white-bis">
            <div className="buttons">
              <button type="button" name="showRegister" className="button has-text-link" onClick={this.showRegister}>
                회원가입
              </button>
              <button type="button" name="showLogin" className="button has-text-success" onClick={this.showLogin}>
                로그인
              </button>
            </div>
          </footer>
        </div>
        <div className={`card ${showLogin || showRegister ? 'login-and-register show' : 'login-and-register'}`}>
          {showLogin && <LoginContainer />}
        </div>
      </div>
    );
  }
}

export default LoginTemplate;
