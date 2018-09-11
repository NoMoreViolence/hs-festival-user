import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Input, Button } from 'reactstrap';
import { toast } from 'react-toastify';
import './register.page.scss';

class RegisterPage extends Component {
  state = {
    random: '',
    id: '',
    pw: '',
    rePw: '',
  };

  static propTypes = {
    changeDoubleCheck: PropTypes.func.isRequired,
    doubleCheckPending: PropTypes.bool.isRequired,
    doubleCheckSuccess: PropTypes.bool.isRequired,
    doubleCheckId: PropTypes.func.isRequired,
    registerPending: PropTypes.bool.isRequired,
    register: PropTypes.func.isRequired,
  };

  render() {
    const {
      random, id, pw, rePw,
    } = this.state;

    const {
      doubleCheckId, register, doubleCheckPending, registerPending, doubleCheckSuccess,
    } = this.props;

    return (
      <div className="register-container">
        <div className="random-input">
          <Input
            type="text"
            placeholder="발급받은 랜덤 키 입력"
            value={random}
            onChange={(e) => {
              this.setState({
                random: e.target.value,
              });
            }}
          />
        </div>
        <div className="id-input">
          <Input
            type="text"
            placeholder="ID"
            value={id}
            onChange={(e) => {
              this.props.changeDoubleCheck();
              this.setState({
                id: e.target.value,
              });
            }}
          />
          <Button
            outline
            disabled={doubleCheckSuccess}
            color="primary"
            onClick={() => {
              if (doubleCheckPending !== true) {
                toast('ID 중복확인 시작...', { position: toast.POSITION.BOTTOM_CENTER });
                doubleCheckId(id)
                  .then((res) => {
                    this.setState({ checked: true });
                    toast('ID 중복확인 성공 !', { type: 'success', position: toast.POSITION.BOTTOM_CENTER });
                  })
                  .catch((err) => {
                    this.setState({ checked: false, id: '' });
                    toast('ID 중복확인 실패 !', { type: 'error', position: toast.POSITION.BOTTOM_CENTER });
                  });
              } else {
                toast('ID 중복확인이 진행 중 입니다. 잠시만 기다려 주세요 !', { position: toast.POSITION.BOTTOM_CENTER });
              }
            }}
          >
            ID 중복확인
          </Button>
        </div>
        <div className="pw-input">
          <Input
            type="password"
            placeholder="PW"
            value={pw}
            onChange={(e) => {
              this.setState({ pw: e.target.value });
            }}
          />
          <Input
            type="password"
            placeholder="PW 재확인"
            value={rePw}
            onChange={(e) => {
              this.setState({ rePw: e.target.value });
            }}
          />
        </div>
        <div className="login-button">
          <Button
            outline
            color="primary"
            onClick={() => {
              if (registerPending === false) {
                if (pw === rePw && doubleCheckSuccess === true) {
                  toast('회원가입 시작...', { position: toast.POSITION.BOTTOM_CENTER });
                  register(id, pw, random)
                    .then((res) => {
                      toast('회원가입 성공 ! 로그인 해 주세요', { type: 'success', position: toast.POSITION.BOTTOM_CENTER });
                      this.setState({
                        id: '',
                        pw: '',
                        rePw: '',
                        random: '',
                      });
                    })
                    .catch(() => {
                      toast('회원가입 실패...', { type: 'error', position: toast.POSITION.BOTTOM_CENTER });
                      toast('ERR message', { type: 'error', position: toast.POSITION.BOTTOM_CENTER });
                    });
                }
                if (doubleCheckSuccess === false) {
                  toast('ID 중복확인을 해 주세요', { type: 'error', position: toast.POSITION.BOTTOM_CENTER });
                } else if (pw !== rePw) {
                  toast('비밀번호가 일치하지 않습니다 !', { type: 'error', position: toast.POSITION.BOTTOM_CENTER });
                }
              } else {
                toast('회원가입이 진행 중입니다. 잠시만 기다려 주세요 !', { position: toast.POSITION.BOTTOM_CENTER });
              }
            }}
          >
            회원가입
          </Button>
        </div>
      </div>
    );
  }
}

export default RegisterPage;
