import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withRouter from 'react-router-dom/withRouter';
import { Jumbotron, Container } from 'reactstrap';
import { toast } from 'react-toastify';
import UserMenuPage from '../usermenu/usermenu.page';
import './menu.page.scss';

class MenuPage extends Component {
  static propTypes = {
    logined: PropTypes.bool.isRequired,
    admin: PropTypes.bool.isRequired,
    username: PropTypes.string.isRequired,
    money: PropTypes.number.isRequired,
    luckyNumber: PropTypes.number.isRequired,
    bringDataOfUser: PropTypes.func.isRequired,
    // bringSuccess: PropTypes.bool.isRequired,
    // bringPending: PropTypes.bool.isRequired,
    error: PropTypes.func.isRequired,
    history: PropTypes.any.isRequired, // eslint-disable-line react/forbid-prop-types
  };

  componentDidMount() {
    if (this.props.username === '' && this.props.logined === true) {
      this.props
        .bringDataOfUser()
        .then((res) => {
          console.log('bringDataOfUser');
          toast(`환영합니다 ${this.props.username} 님 !`);
        })
        .catch((err) => {
          console.log('Error');
          toast('에러 발생 ! 재 로그인해 주세요');
          localStorage.clear();
          this.props.error();
          this.props.history.push('/');
        });
    }
  }

  render() {
    const { username, money, luckyNumber } = this.props;
    return (
      <div className="menu-container">
        <Jumbotron fluid style={{ boxShadow: '1px 1px 1px 1px #999' }} className="menu-jumbo">
          <Container>
            <p className="display-4">{`${username} 님`}</p>
            <p className="lead">{`남은 돈: ${money}`}</p>
            <p className="lead">{`내 행운권 추첨 번호: ${luckyNumber}`}</p>
            <p className="lead">2018 / 10 / 4</p>
          </Container>
          <div className="menu-buttons">{this.props.admin === true ? <div>aewijfaio;ew</div> : <UserMenuPage />}</div>
        </Jumbotron>
      </div>
    );
  }
}

export default withRouter(MenuPage);
