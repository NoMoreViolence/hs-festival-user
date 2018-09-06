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
        <Jumbotron fluid style={{ boxShadow: '3px 3px 3px 3px #999' }}>
          <Container fluid>
            <p className="display-4">한세의 민족</p>
            <p className="lead">탄감자의 쇄국정책 축제 잘 즐기세요</p>
            <p className="lead">이 개발자는 무보수로 모든걸 해결합니다</p>
            <p className="lead">앱 디자인이 조잡해 보이면 니가 하세요 시ㅣㅣ발롬아</p>
            <p className="lead">2018 / 10 / 4 한세 멸망의 날</p>
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
        {register && <RegisterContainer />}
      </div>
    );
  }
}

export default InformationTemplate;
