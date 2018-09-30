import React from 'react';
import './information.template.scss';
import * as moment from 'moment';
import {
  Jumbotron, Container, Row, Col, Button,
} from 'reactstrap';

import 'moment/locale/ko';
import RegisterContainer from '../../../container/register.container';
import LoginContainer from '../../../container/login.container';

moment.locale('ko');

class InformationTemplate extends React.Component {
  state = {
    login: false,
    register: false,
  };

  render() {
    const { login, register } = this.state;

    return (
      <div className="information-container">
        <div fluid className="information-jumbo">
          <div className="main-logo">
            <span style={{ fontSize: '4rem' }}>한세의 민족</span>
            <span style={{ fontSize: '1rem', fontWeight: 300 }}>2018 / 10 / 5</span>
          </div>

          <div className="info-buttons" style={{ display: 'flex' }}>
            <Button
              className="info-left-button"
              style={{ flex: 1 }}
              outline
              color="primary"
              onClick={() => {
                this.setState({
                  login: false,
                  register: true,
                });
              }}
            >
              회원가입
            </Button>
            <Button
              className="info-right-button"
              style={{ flex: 1 }}
              outline
              color="primary"
              onClick={() => {
                this.setState({
                  login: true,
                  register: false,
                });
              }}
            >
              로그인
            </Button>
          </div>
        </div>
        {login && <LoginContainer />}
        {register && <RegisterContainer />}
      </div>
    );
  }
}

export default InformationTemplate;
