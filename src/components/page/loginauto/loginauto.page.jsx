import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import * as PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { css } from 'glamor';

class LoginPage extends Component {
  static propTypes = {
    loginAuto: PropTypes.func.isRequired,
    history: PropTypes.any.isRequired, // eslint-disable-line react/forbid-prop-types
    contain: PropTypes.func.isRequired,
    dataInStore: PropTypes.func.isRequired,
    dataInTime: PropTypes.func.isRequired,
    getBillHistory: PropTypes.func.isRequired,
  };

  autologin = null;

  componentDidMount() {
    if (localStorage.getItem('token')) {
      this.autologin = toast('자동 로그인 중...', { position: toast.POSITION.BOTTOM_CENTER, autoClose: 10000 });
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
          toast.update(this.autologin, {
            render: '로그인 성공 ! 환영합니다',
            type: toast.TYPE.SUCCESS,
            position: toast.POSITION.BOTTOM_CENTER,
            className: css({
              transform: 'rotateY(360deg)',
              transition: 'transform 0.6s',
            }),
            autoClose: 3000,
          });
          // 이 세개의 Props는 오직 사용자를 위한 코드임, 관리자 메뉴를 따로 만들어야 함
          this.props.dataInStore();
          this.props.dataInTime();
          this.props.getBillHistory();
          this.props.history.push('/menu');
        })
        .catch((err) => {
          localStorage.clear();
          toast.update(this.autologin, {
            render: '로그인 실패 ! 재 로그인해 주세요 !',
            type: toast.TYPE.ERROR,
            position: toast.POSITION.BOTTOM_CENTER,
            className: css({
              transform: 'rotateY(360deg)',
              transition: 'transform 0.6s',
            }),
            autoClose: 3000,
          });
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
