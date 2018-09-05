import React from 'react';
import './information.template.scss';
import * as moment from 'moment';
import {
  Jumbotron, Container, Row, Col, Button,
} from 'reactstrap';

import 'moment/locale/ko';
// import LoginPage from '../../page/login/login.page';
import RegisterPage from '../../page/register/register.page';
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
        <Jumbotron fluid style={{ boxShadow: '3px 3px 3px 3px #999' }}>
          <Container fluid>
            <p className="display-3">한세의 민족</p>
            <p className="lead">탄감자의 쇄국정책 축제 잘 즐기세요</p>
            <p className="lead">2018 / 10 / 4</p>
          </Container>

          <Container>
            <Row>
              <Col className="information-button-parent">
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
        {register && <RegisterPage />}
      </div>
    );
  }
}

export default InformationTemplate;
