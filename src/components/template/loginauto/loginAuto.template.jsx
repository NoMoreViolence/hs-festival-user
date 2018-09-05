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

    return <div className="information-container" />;
  }
}

export default InformationTemplate;
