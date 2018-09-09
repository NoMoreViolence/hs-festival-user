import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import * as PropTypes from 'prop-types';
import { toast } from 'react-toastify';

class LoginPage extends Component {
  static propTypes = {
    loginAuto: PropTypes.func.isRequired,
    history: PropTypes.any.isRequired, // eslint-disable-line react/forbid-prop-types
    contain: PropTypes.func.isRequired,
    dataIn: PropTypes.func.isRequired,
  };

  componentDidMount() {
    if (localStorage.getItem('token')) {
      toast('자동 로그인 중...', { position: toast.POSITION.BOTTOM_CENTER });
      this.props
        .loginAuto()
        .then((res) => {
          this.props.contain({
            admin: false,
            username: '추승원',
            basicInfo: 'H3120',
            money: 1500,
            luckyNumber: 123,
          });
          this.props.dataIn();
          this.props.history.push('/menu');
          toast('로그인 성공 ! 환영합니다', { type: 'success', position: toast.POSITION.BOTTOM_CENTER });
        })
        .catch((err) => {
          this.props.history.push('/');
          toast('로그인 에러 발생 ! 재 로그인해 주세요', { type: 'error', position: toast.POSITION.BOTTOM_CENTER });
        });
    } else {
      this.props.history.push('/');
    }
  }

  render() {
    return <div />;
  }
}

export default withRouter(LoginPage);
