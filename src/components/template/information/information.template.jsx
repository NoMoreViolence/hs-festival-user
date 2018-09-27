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
        <Jumbotron fluid style={{ boxShadow: '1px 1px 1px 1px #999' }} className="information-jumbo">
          <Container fluid>
            <p className="display-4">한세의 민족</p>
            <p className="lead">학교에 척화비를 세운 우리!</p>
            <p className="lead">우리의 축제는 우리만 !</p>
            <p className="lead">2018 / 10 / 5 한세제</p>
          </Container>

          <Container>
            <Row>
              <Col className="information-button-parent" style={{ borderRight: '1px solid #007bff' }}>
                <Button
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
              </Col>
              <Col className="information-button-parent">
                <Button
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
              </Col>
            </Row>
          </Container>
        </Jumbotron>
        {login && <LoginContainer />}
        {register && <RegisterContainer />}
      </div>
    );
  }
}

export default InformationTemplate;
