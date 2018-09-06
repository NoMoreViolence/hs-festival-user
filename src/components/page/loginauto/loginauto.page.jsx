import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import * as PropTypes from 'prop-types';
import { toast } from 'react-toastify';

class LoginPage extends Component {
  static propTypes = {
    loginAuto: PropTypes.func.isRequired,
    history: PropTypes.any.isRequired, // eslint-disable-line react/forbid-prop-types
  };

  componentDidMount() {
    if (localStorage.getItem('token')) {
      toast('자동 로그인 중...');
      this.props
        .loginAuto()
        .then((res) => {
          this.props.history.push('/menu');
          toast('로그인 성공 ! 환영합니다', { type: 'success' });
        })
        .catch((err) => {
          toast('토큰값 유효하지 않음 ! 재 로그인해 주세요', { type: 'error' });
        });
    }
  }

  render() {
    return <div />;
  }
}

export default withRouter(LoginPage);
