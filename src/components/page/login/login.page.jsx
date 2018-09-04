import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './login.page.scss';

class LoginPage extends Component {
  state = {
    clicked: false,
  };

  static propTypes = {
    id: PropTypes.string.isRequired,
    pw: PropTypes.string.isRequired,
    idChange: PropTypes.func.isRequired,
    pwChange: PropTypes.func.isRequired,
  };

  render() {
    const { clicked } = this.state;
    return (
      <div className="login-container has-background-primary">
        <div className="inputs">
          <input
            type="text"
            className="input has-text-success"
            placeholder="아이디를 입력해 주세요"
            value={this.props.id}
            onChange={this.props.idChange}
          />
          <input
            type="password"
            className="input has-text-success"
            placeholder="비밀번호를 입력해 주세요"
            value={this.props.pw}
            onChange={this.props.pwChange}
          />
        </div>

        <div className="login-button">
          <button
            type="button"
            className={`button has-text-success ${clicked && 'is-loading'}`}
            onClick={() => {
              this.setState({ clicked: !clicked });
            }}
          >
            로그인
          </button>
        </div>
      </div>
    );
  }
}

export default LoginPage;
