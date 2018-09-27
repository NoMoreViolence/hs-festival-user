import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withRouter from 'react-router-dom/withRouter';
import { Jumbotron, Container } from 'reactstrap';
import { toast } from 'react-toastify';
import { css } from 'glamor';
import AdminMenuPage from '../adminmenu/adminmenu.page';
import AdminSearchPage from '../adminsearch/adminsearch.page';
import AdminStorePage from '../adminstore/adminstore.page';
import UserMenuPage from '../usermenu/usermenu.page';
import UserTimeTablePage from '../usertimetable/usertimetable.page';
import UserStorePage from '../userstore/userstore.page';
import UserMyProductPage from '../usermyproduct/usermyproduct.page';
import UserBillPage from '../userbill/userbill.page';
import './menu.page.scss';
import AdminCashRequestPage from '../admincashrequest/admincashrequest.page';

class MenuPage extends Component {
  static propTypes = {
    loginAuto: PropTypes.func.isRequired,
    contain: PropTypes.func.isRequired,
    // logined: PropTypes.bool.isRequired,
    admin: PropTypes.bool.isRequired,
    name: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    _id: PropTypes.number.isRequired,
    money: PropTypes.number.isRequired,
    logout: PropTypes.func.isRequired,
    cleanData: PropTypes.func.isRequired,
    bill: PropTypes.array.isRequired,
    getBillHistory: PropTypes.func.isRequired,
    confirmBill: PropTypes.func.isRequired,
    cancelBill: PropTypes.func.isRequired,

    timeTable: PropTypes.array.isRequired,
    dataInTime: PropTypes.func.isRequired,
    stores: PropTypes.array.isRequired,
    dataInStore: PropTypes.func.isRequired,
    storeProduct: PropTypes.array.isRequired,

    add: PropTypes.func.isRequired,
    up: PropTypes.func.isRequired,
    down: PropTypes.func.isRequired,
    del: PropTypes.func.isRequired,
    buy: PropTypes.func.isRequired,

    history: PropTypes.any.isRequired,

    searchUser: PropTypes.func.isRequired,
    searchUserSpending: PropTypes.func.isRequired,
    requestList: PropTypes.array.isRequired,
    getAllStore: PropTypes.func.isRequired,
    allStore: PropTypes.array.isRequired,
    sortStoreData: PropTypes.func.isRequired,
    changeCanbuy: PropTypes.func.isRequired,
    showStoreMore: PropTypes.func.isRequired,
    getUserChargeList: PropTypes.func.isRequired,
    userHistory: PropTypes.array.isRequired,
  };

  state = {
    checkDate: '',
    userTimeTable: false,
    userBill: false,
    userStore: false,
    adminCash: false,
    adminStore: false,
    adminSearch: false,
  };

  logout = null;

  changeCash = () => {
    this.setState({
      adminCash: !this.state.adminCash,
      adminStore: false,
      adminSearch: false,
      userTimeTable: false,
      userBill: false,
      userStore: false,
    });
  };

  changeStoreAdmin = () => {
    this.setState({
      adminCash: false,
      adminStore: !this.state.adminStore,
      adminSearch: false,
      userTimeTable: false,
      userBill: false,
      userStore: false,
    });
  };

  changeSearch = () => {
    this.setState({
      adminCash: false,
      adminStore: false,
      adminSearch: !this.state.adminSearch,
      userTimeTable: false,
      userBill: false,
      userStore: false,
    });
  };

  changeTimeTable = () => {
    this.setState({
      userTimeTable: !this.state.userTimeTable,
      userBill: false,
      userStore: false,
      adminCash: false,
      adminStore: false,
      adminSearch: false,
    });
  };

  changeBill = () => {
    this.setState({
      userTimeTable: false,
      userBill: !this.state.userBill,
      userStore: false,
      adminCash: false,
      adminStore: false,
      adminSearch: false,
    });
  };

  changeStore = () => {
    this.setState({
      userTimeTable: false,
      userBill: false,
      userStore: !this.state.userStore,
      adminCash: false,
      adminStore: false,
      adminSearch: false,
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
                  if (this.state.checkDate === '' || (new Date() - this.state.checkDate) / 1000 > 3) {
                    this.logout = toast('정말 로그아웃 하시려면 한번 더 눌러주세요', {
                      position: toast.POSITION.BOTTOM_CENTER,
                      autoClose: 3000,
                    });
                    this.setState({
                      checkDate: new Date(),
                    });
                  } else {
                    this.props.logout();
                    this.props.cleanData();
                    localStorage.clear();
                    toast.update(this.logout, {
                      render: `${this.props.name}님! 로그아웃 처리 되었습니다 !`,
                      position: toast.POSITION.BOTTOM_CENTER,
                      className: css({
                        transform: 'rotateY(360deg)',
                        transition: 'transform 0.6s',
                      }),
                      autoClose: 3000,
                    });
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
              {this.props.admin === true && (
                <AdminMenuPage cash={this.changeCash} store={this.changeStoreAdmin} search={this.changeSearch} />
              )}
              <UserMenuPage store={this.changeStore} bill={this.changeBill} timeTable={this.changeTimeTable} />
            </div>
          )}
        </Jumbotron>
        {/* Admin menu */}
        {this.state.adminCash && (
          <AdminCashRequestPage getUserChargeList={this.props.getUserChargeList} userHistory={this.props.userHistory} />
        )}
        {this.state.adminStore && (
          <AdminStorePage
            getAllStore={this.props.getAllStore}
            allStore={this.props.allStore}
            sortStoreData={this.props.sortStoreData}
            changeCanbuy={this.props.changeCanbuy}
            showStoreMore={this.props.showStoreMore}
          />
        )}
        {this.state.adminSearch && (
          <AdminSearchPage
            searchUser={this.props.searchUser}
            searchUserSpending={this.props.searchUserSpending}
            requestList={this.props.requestList}
          />
        )}

        {/* User Menu */}
        {this.state.userTimeTable && (
          <div className="selected-container">
            <UserTimeTablePage timeTable={this.props.timeTable} dataInTime={this.props.dataInTime} />
          </div>
        )}
        {this.state.userBill && (
          <UserBillPage
            bill={this.props.bill}
            elementNumber={this.props.bill.length}
            getBillHistory={this.props.getBillHistory}
            confirmBill={this.props.confirmBill}
            cancelBill={this.props.cancelBill}
            loginAuto={this.props.loginAuto}
            contain={this.props.contain}
          />
        )}
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
                getBillHistory={this.props.getBillHistory}
                dataInStore={this.props.dataInStore}
              />
            </div>
            <div className="selected-container">
              <UserStorePage
                stores={this.props.stores}
                storeProduct={this.props.storeProduct}
                add={this.props.add}
                dataInStore={this.props.dataInStore}
              />
            </div>
          </React.Fragment>
        )}
      </div>
    );
  }
}

export default withRouter(MenuPage);
