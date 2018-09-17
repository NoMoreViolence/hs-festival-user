import React, { Component } from 'react';
import * as PropTypes from 'prop-types';
import { Input, Button } from 'reactstrap';
import './login.page.scss';
import { toast } from 'react-toastify';
import { withRouter } from 'react-router-dom';

class LoginPage extends Component {
  state = {
    id: '',
    pw: '',
  };

  static propTypes = {
    login: PropTypes.func.isRequired,
    pending: PropTypes.bool.isRequired,
    history: PropTypes.any.isRequired, // eslint-disable-line react/forbid-prop-types
    contain: PropTypes.func.isRequired,
    dataInStore: PropTypes.func.isRequired,
    dataInTime: PropTypes.func.isRequired,
    getBillHistory: PropTypes.func.isRequired,
  };

  render() {
    const { id, pw } = this.state;
    const {
      login, pending, history, contain,
    } = this.props;

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
              if (pending === true) {
                toast('로그인이 진행 중 입니다 !', { type: 'info', position: toast.POSITION.BOTTOM_CENTER });
              } else {
                toast('로그인 중...', { position: toast.POSITION.BOTTOM_CENTER });
                login(id, pw)
                  .then((res) => {
                    const { data } = res.action.payload.data;
                    contain({
                      admin: data.user.admin,
                      name: data.user.name,
                      id: data.user.class_id,
                      _id: data.user._id,
                      money: data.user.money,
                      bill: [],
                    });
                    localStorage.setItem('token', data.token);
                    toast('로그인 성공 ! 환영합니다', { type: 'success', position: toast.POSITION.BOTTOM_CENTER });

                    this.props.dataInStore();
                    this.props.dataInTime();
                    this.props.getBillHistory();
                    history.push('/menu');
                  })
                  .catch((err) => {
                    toast('로그인 에러 !', { type: 'error', position: toast.POSITION.BOTTOM_CENTER });
                    console.log(err.response);
                  });
              }
            }}
          >
            로그인
          </Button>
        </div>
      </div>
    );
  }
}
export default withRouter(LoginPage);
