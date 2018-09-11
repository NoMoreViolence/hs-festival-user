import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import * as PropTypes from 'prop-types';
import { toast } from 'react-toastify';

class LoginPage extends Component {
  static propTypes = {
    loginAuto: PropTypes.func.isRequired,
    history: PropTypes.any.isRequired, // eslint-disable-line react/forbid-prop-types
    contain: PropTypes.func.isRequired,
    dataInStore: PropTypes.func.isRequired,
    dataInTime: PropTypes.func.isRequired,
  };

  componentDidMount() {
    if (localStorage.getItem('token')) {
      toast('자동 로그인 중...', { position: toast.POSITION.BOTTOM_CENTER });
      this.props
        .loginAuto()
        .then((res) => {
          this.props.contain({
            admin: false,
            name: '추승원',
            id: 'H3120',
            _id: 123,
            money: 18000,
            bill: [],
          });
          this.props.history.push('/menu');
          this.props.dataInStore();
          this.props.dataInTime();
          toast('로그인 성공 ! 환영합니다', { type: 'success', position: toast.POSITION.BOTTOM_CENTER });
        })
        .catch((err) => {
          localStorage.clear();
          toast('로그인 에러 발생 ! 재 로그인해 주세요', { type: 'error', position: toast.POSITION.BOTTOM_CENTER });
          this.props.history.push('/');
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
