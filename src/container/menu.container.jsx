import * as React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { UserActions } from '../store/modules/user';
import { LoginActions } from '../store/modules/login';

import Menu from '../components/page/menu/menu.page';
import { UserMenuActions } from '../store/modules/usermenu';

class MenuContainer extends React.Component {
  static propTypes = {
    loginAuto: PropTypes.func.isRequired,
    logined: PropTypes.bool.isRequired,
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
    contain: PropTypes.func.isRequired,

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
  };

  render() {
    return (
      <Menu
        loginAuto={this.props.loginAuto}
        contain={this.props.contain}
        logined={this.props.logined}
        admin={this.props.admin}
        name={this.props.name}
        id={this.props.id}
        money={this.props.money}
        _id={this.props._id}
        bill={this.props.bill}
        getBillHistory={this.props.getBillHistory}
        confirmBill={this.props.confirmBill}
        cancelBill={this.props.cancelBill}
        storeProduct={this.props.storeProduct}
        logout={this.props.logout}
        cleanData={this.props.cleanData}
        timeTable={this.props.timeTable}
        dataInTime={this.props.dataInTime}
        stores={this.props.stores}
        dataInStore={this.props.dataInStore}
        add={this.props.add}
        up={this.props.up}
        down={this.props.down}
        del={this.props.del}
        buy={this.props.buy}
      />
    );
  }
}

const mapStateToProps = (state) => {
  const { user, login, userMenu } = state;

  return {
    logined: login.logined,
    admin: user.admin,
    name: user.name,
    id: user.id,
    money: user.money,
    _id: user._id,
    timeTable: userMenu.timeTable,
    stores: userMenu.stores,
    storeProduct: user.storeProduct,
    bill: user.bill,
  };
};

const mapDispatchToProps = dispatch => ({
  loginAuto: bindActionCreators(LoginActions.loginAuto, dispatch),
  contain: bindActionCreators(UserActions.contain, dispatch),
  getBillHistory: bindActionCreators(UserActions.getBillHistory, dispatch),
  confirmBill: bindActionCreators(UserActions.confirmBill, dispatch),
  cancelBill: bindActionCreators(UserActions.cancelBill, dispatch),
  dataInStore: bindActionCreators(UserMenuActions.dataInStore, dispatch),
  dataInTime: bindActionCreators(UserMenuActions.dataInTime, dispatch),
  logout: bindActionCreators(LoginActions.logout, dispatch),
  cleanData: bindActionCreators(UserActions.cleanData, dispatch),
  add: bindActionCreators(UserActions.add, dispatch),
  up: bindActionCreators(UserActions.up, dispatch),
  down: bindActionCreators(UserActions.down, dispatch),
  del: bindActionCreators(UserActions.del, dispatch),
  buy: bindActionCreators(UserActions.buy, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MenuContainer);
