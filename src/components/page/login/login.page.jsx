import React, { Component } from 'react';
import * as PropTypes from 'prop-types';
import { Input, Button } from 'reactstrap';
import './login.page.scss';
import { toast } from 'react-toastify';

class LoginPage extends Component {
  state = {
    id: '',
    pw: '',
  };

  static propTypes = {
    login: PropTypes.func.isRequired,
    pending: PropTypes.bool.isRequired,
  };

  render() {
    const { id, pw } = this.state;
    const { login, pending } = this.props;
    return (
      <div className="login-container">
        <div className="login-inputs">
          <Input
            type="text"
            placeholder="ID"
            value={id}
            onChange={(e) => {
              this.setState({ id: e.target.value });
            }}
          />
          <Input
            type="password"
            placeholder="PW"
            value={pw}
            onChange={(e) => {
              this.setState({ pw: e.target.value });
            }}
          />
        </div>
        <div className="login-button">
          <Button
            outline
            color="primary"
            onClick={() => {
              pending === true
                ? toast('로그인이 진행 중 입니다 !', { type: 'info' })
                : login(id, pw)
                  .then((res) => {
                    toast('로그인 성공 ! 환영합니다', { type: 'success' });
                  })
                  .catch((err) => {
                    toast('로그인 에러 !', { type: 'error' });
                    console.log(err.response);
                  });
            }}
          >
            로그인
          </Button>
        </div>
      </div>
    );
  }
}

export default LoginPage;
