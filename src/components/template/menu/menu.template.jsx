import React, { Component } from 'react';
import { Jumbotron, Container } from 'reactstrap';
import './menu.template.scss';

class Menu extends Component {
  state = {
    username: '추승원',
    money: 1500,
    luckyNumber: 2124,
    moneyShow: '',
  };

  componentDidMount() {
    this.setState({
      moneyShow: this.state.money.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'),
    });
  }

  render() {
    const { username, moneyShow, luckyNumber } = this.state;

    return (
      <div className="menu-container">
        <Jumbotron fluid style={{ boxShadow: '1px 1px 1px 1px #999' }} className="menu-jumbo">
          <Container fluid>
            <p className="display-4">{`${username} 님`}</p>
            <p className="lead">{`남은 돈: ${moneyShow}`}</p>
            <p className="lead">{`내 행운권 추첨 번호: ${luckyNumber}`}</p>
            <p className="lead">2018 / 10 / 4</p>
          </Container>
        </Jumbotron>
      </div>
    );
  }
}

export default Menu;
