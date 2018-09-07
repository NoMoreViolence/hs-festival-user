import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import * as PropTypes from 'prop-types';
import { toast } from 'react-toastify';

class LoginPage extends Component {
  static propTypes = {
    loginAuto: PropTypes.func.isRequired,
    history: PropTypes.any.isRequired, // eslint-disable-line react/forbid-prop-types
    contain: PropTypes.func.isRequired,
  };

  componentDidMount() {
    if (localStorage.getItem('token')) {
      toast('자동 로그인 중...');
      this.props
        .loginAuto()
        .then((res) => {
          this.props.contain({
            admin: false,
            username: '추승원',
            money: 1500,
            luckyNumber: 123,
          });
          this.props.history.push('/menu');
          toast('로그인 성공 ! 환영합니다', { type: 'success' });
        })
        .catch((err) => {
          this.props.history.push('/');
          toast('로그인 에러 발생 ! 재 로그인해 주세요', { type: 'error' });
        });
    } else {
      this.props.history.push('/');
    }
  }

  componentDidUpdate() {
    console.log('someting changed');
  }

  componentWillUnmount() {
    console.log('난 사라져');
  }

  render() {
    return <div />;
  }
}

export default withRouter(LoginPage);
