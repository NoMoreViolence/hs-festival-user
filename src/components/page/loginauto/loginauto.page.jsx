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
    getBillHistory: PropTypes.func.isRequired,
  };

  componentDidMount() {
    if (localStorage.getItem('token')) {
      toast('자동 로그인 중...', { position: toast.POSITION.BOTTOM_CENTER });
      this.props
        .loginAuto()
        .then((res) => {
          const { data } = res.action.payload.data;
          this.props.contain({
            admin: data.user.admin,
            name: data.user.name,
            id: data.user.class_id,
            _id: data.user._id,
            money: data.user.money,
            bill: [],
          });
          toast('로그인 성공 ! 환영합니다', { type: 'success', position: toast.POSITION.BOTTOM_CENTER });
          // 이 세개의 Props는 오직 사용자를 위한 코드임, 관리자 메뉴를 따로 만들어야 함
          this.props.dataInStore();
          this.props.dataInTime();
          this.props.getBillHistory();
          this.props.history.push('/menu');
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
