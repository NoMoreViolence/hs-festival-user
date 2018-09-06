import React, { Component } from 'react';
import { Jumbotron, Container } from 'reactstrap';

class Menu extends Component {
  state = {
    username: '추승원',
    money: 1500,
    luckyNumber: 2124,
  };

  render() {
    const { username, money, luckyNumber } = this.state;

    return (
      <div>
        <Jumbotron fluid style={{ boxShadow: '3px 3px 3px 3px #999' }}>
          <Container fluid>
            <p className="display-4">{`${username} 님`}</p>
            <p className="lead">{`현재 가지고 있는 돈의 양: ${money}`}</p>
            <p className="lead">{`내 행운권 추첨 번호: ${luckyNumber}`}</p>
            <p className="lead">2018 / 10 / 4</p>
          </Container>
        </Jumbotron>
      </div>
    );
  }
}

export default Menu;
