import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withRouter from 'react-router-dom/withRouter';
import { Jumbotron, Container } from 'reactstrap';
import { toast } from 'react-toastify';
import UserMenuPage from '../usermenu/usermenu.page';
import UserTimeTablePage from '../usertimetable/usertimetable.page';
import './menu.page.scss';

class MenuPage extends Component {
  static propTypes = {
    logined: PropTypes.bool.isRequired,
    admin: PropTypes.bool.isRequired,
    username: PropTypes.string.isRequired,
    basicInfo: PropTypes.string.isRequired,
    money: PropTypes.number.isRequired,
    luckyNumber: PropTypes.number.isRequired,
    bringDataOfUser: PropTypes.func.isRequired,
    // bringSuccess: PropTypes.bool.isRequired,
    // bringPending: PropTypes.bool.isRequired,
    error: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
    history: PropTypes.any.isRequired, // eslint-disable-line react/forbid-prop-types
  };

  state = {
    checkDate: '',
    userTimeTable: false,
    userBill: false,
    userStore: false,
  };

  componentDidMount() {
    if (this.props.username === '' && this.props.logined === true) {
      this.props
        .bringDataOfUser()
        .then((res) => {
          console.log('bringDataOfUser');
          toast(`환영합니다 ${this.props.username} 님 !`, { position: toast.POSITION.BOTTOM_CENTER });
        })
        .catch((err) => {
          console.log('Error');
          toast('에러 발생 ! 재 로그인해 주세요', { position: toast.POSITION.BOTTOM_CENTER });
          localStorage.clear();
          this.props.error();
          this.props.history.push('/');
        });
    }
  }

  changeTimeTable = () => {
    this.setState({
      userTimeTable: !this.state.userTimeTable,
      userBill: false,
      userStore: false,
    });
  };

  render() {
    const { username, money, luckyNumber } = this.props;
    return (
      <div className="menu-container">
        <Jumbotron fluid style={{ boxShadow: '1px 1px 1px 1px #999' }} className="menu-jumbo">
          <Container>
            <div className="name-and-logout">
              <p className="display-4">{`${username}`}</p>
              <span
                className="logout-button"
                onClick={() => {
                  // 처음 로그아웃 버튼을 누르거나, 로그아웃 버튼을 누르는 시간 간격이 너무 길면 다시 누르게끔 함
                  if (this.state.checkDate === '' || (new Date() - this.state.checkDate) / 1000 > 5) {
                    toast('정말 로그아웃 하시려면 한번 더 눌러주세요', { position: toast.POSITION.BOTTOM_CENTER });
                    this.setState({
                      checkDate: new Date(),
                    });
                  } else {
                    this.props.logout();
                    localStorage.clear();
                    toast(`${this.props.username}님! 로그아웃 처리 되었습니다 !`, { position: toast.POSITION.BOTTOM_CENTER });
                    this.props.history.push('/');
                  }
                }}
              >
                <img src="/images/image/logout.svg" alt="" />
              </span>
            </div>

            <p className="lead">{`학번: ${this.props.basicInfo}`}</p>
            <p className="lead">{`남은 돈: ${money.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}`}</p>
            <p className="lead">{`행운권 번호: ${luckyNumber}`}</p>
            <p className="lead">2018 / 10 / 4</p>
          </Container>
          <div className="menu-buttons">
            {this.props.admin === true ? <div>aewijfaio;ew</div> : <UserMenuPage timeTable={this.changeTimeTable} />}
          </div>
        </Jumbotron>

        {this.state.userTimeTable && (
          <div className="selected-container">
            <UserTimeTablePage />
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(MenuPage);
