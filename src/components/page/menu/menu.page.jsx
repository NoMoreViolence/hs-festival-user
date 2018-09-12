import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withRouter from 'react-router-dom/withRouter';
import { Jumbotron, Container } from 'reactstrap';
import { toast } from 'react-toastify';
import AdminMenuPage from '../adminmenu/adminmenu.page';
import UserMenuPage from '../usermenu/usermenu.page';
import UserTimeTablePage from '../usertimetable/usertimetable.page';
import UserStorePage from '../userstore/userstore.page';
import UserMyProductPage from '../usermyproduct/usermyproduct.page';
import UserBillPage from '../userbill/userbill.page';
import './menu.page.scss';

class MenuPage extends Component {
  static propTypes = {
    // logined: PropTypes.bool.isRequired,
    admin: PropTypes.bool.isRequired,
    name: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    _id: PropTypes.number.isRequired,
    money: PropTypes.number.isRequired,
    logout: PropTypes.func.isRequired,
    bill: PropTypes.array.isRequired,

    timeTable: PropTypes.array.isRequired,
    stores: PropTypes.array.isRequired,
    storeProduct: PropTypes.array.isRequired,

    add: PropTypes.func.isRequired,
    up: PropTypes.func.isRequired,
    down: PropTypes.func.isRequired,
    del: PropTypes.func.isRequired,
    buy: PropTypes.func.isRequired,

    history: PropTypes.any.isRequired,
  };

  state = {
    checkDate: '',
    userTimeTable: false,
    userBill: false,
    userStore: false,
    adminCharge: false,
    adminConfirm: false,
  };

  changeCharge = () => {
    this.setState({
      adminCharge: true,
      adminConfirm: false,
    });
  };

  changeConfirm = () => {
    this.setState({
      adminConfirm: true,
      adminCharge: false,
    });
  };

  changeTimeTable = () => {
    this.setState({
      userTimeTable: !this.state.userTimeTable,
      userBill: false,
      userStore: false,
    });
  };

  changeBill = () => {
    this.setState({
      userTimeTable: false,
      userBill: !this.state.userBill,
      userStore: false,
    });
  };

  changeStore = () => {
    this.setState({
      userTimeTable: false,
      userBill: false,
      userStore: !this.state.userStore,
    });
  };

  render() {
    const { name, money, _id } = this.props;
    return (
      <div className="menu-container">
        <Jumbotron fluid style={{ boxShadow: '1px 1px 1px 1px #999' }} className="menu-jumbo">
          <Container>
            <div className="name-and-logout">
              <p className="display-4">{`${name}`}</p>
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
                    toast(`${this.props.name}님! 로그아웃 처리 되었습니다 !`, { position: toast.POSITION.BOTTOM_CENTER });
                    this.props.history.push('/');
                  }
                }}
              >
                <img src="/images/image/logout.svg" alt="" />
              </span>
            </div>

            <p className="lead">{`학번: ${this.props.id}`}</p>
            <p className="lead">{`남은 돈: ${money.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}`}</p>
            <p className="lead">{`행운권 번호: ${_id}`}</p>
            <p className="lead">2018 / 10 / 4</p>
          </Container>
          {this.props.name === '' ? null : (
            <div className="menu-buttons">
              {this.props.admin === true ? (
                <AdminMenuPage confirm={this.changeConfirm} charge={this.changeCharge} />
              ) : (
                <UserMenuPage store={this.changeStore} bill={this.changeBill} timeTable={this.changeTimeTable} />
              )}
            </div>
          )}
        </Jumbotron>
        {/* Admin menu */}
        {this.state.adminCharge && null}

        {/* User Menu */}
        {this.state.userTimeTable && (
          <div className="selected-container">
            <UserTimeTablePage timeTable={this.props.timeTable} />
          </div>
        )}
        {this.state.userBill && <UserBillPage bill={this.props.bill} elementNumber={this.props.bill.length} />}
        {this.state.userStore && (
          <React.Fragment>
            <div className="selected-container">
              <UserMyProductPage
                storeProduct={this.props.storeProduct}
                up={this.props.up}
                down={this.props.down}
                del={this.props.del}
                buy={this.props.buy}
                money={this.props.money}
              />
            </div>
            <div className="selected-container">
              <UserStorePage stores={this.props.stores} storeProduct={this.props.storeProduct} add={this.props.add} />
            </div>
          </React.Fragment>
        )}
      </div>
    );
  }
}

export default withRouter(MenuPage);
