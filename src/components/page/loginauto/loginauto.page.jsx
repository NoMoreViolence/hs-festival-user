import React, { Component } from 'react';
import * as PropTypes from 'prop-types';
import { toast } from 'react-toastify';

class LoginPage extends Component {
  static propTypes = {
    loginAuto: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props
      .loginAuto()
      .then((res) => {
        toast('로그인 성공 ! 환영합니다', { type: 'success' });
      })
      .catch((err) => {
        toast('토큰값 유효하지 않음 ! 재 로그인해 주세요', { type: 'error' });
      });
  }

  render() {
    return <div />;
  }
}

export default LoginPage;
