import * as React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { UserActions } from '../store/modules/user';
import Menu from '../components/page/menu/menu.page';
import { LoginActions } from '../store/modules/login';
import { UserMenuActions } from '../store/modules/usermenu';

class MenuContainer extends React.Component {
  static propTypes = {
    logined: PropTypes.bool.isRequired,
    admin: PropTypes.bool.isRequired,
    username: PropTypes.string.isRequired,
    basicInfo: PropTypes.string.isRequired,
    money: PropTypes.number.isRequired,
    luckyNumber: PropTypes.number.isRequired,
    bringDataOfUser: PropTypes.func.isRequired,
    bringSuccess: PropTypes.bool.isRequired,
    bringPending: PropTypes.bool.isRequired,
    logout: PropTypes.func.isRequired,
    error: PropTypes.func.isRequired,
    timeTable: PropTypes.array.isRequired,
    stores: PropTypes.array.isRequired,
    myStoreProduct: PropTypes.array.isRequired,
    add: PropTypes.func.isRequired,
    up: PropTypes.func.isRequired,
    down: PropTypes.func.isRequired,
    del: PropTypes.func.isRequired,
    myBill: PropTypes.array.isRequired,
  };

  render() {
    return (
      <Menu
        logined={this.props.logined}
        admin={this.props.admin}
        username={this.props.username}
        basicInfo={this.props.basicInfo}
        money={this.props.money}
        luckyNumber={this.props.luckyNumber}
        bringDataOfUser={this.props.bringDataOfUser}
        bringSuccess={this.props.bringSuccess}
        bringPending={this.props.bringPending}
        logout={this.props.logout}
        error={this.props.error}
        timeTable={this.props.timeTable}
        stores={this.props.stores}
        myStoreProduct={this.props.myStoreProduct}
        add={this.props.add}
        up={this.props.up}
        down={this.props.down}
        del={this.props.del}
        myBill={this.props.myBill}
      />
    );
  }
}

const mapStateToProps = (state) => {
  const { user, login, userMenu } = state;

  return {
    logined: login.logined,
    admin: user.admin,
    username: user.username,
    basicInfo: user.basicInfo,
    money: user.money,
    luckyNumber: user.luckyNumber,
    bringSuccess: user.bringSuccess,
    bringPending: user.bringPending,
    timeTable: userMenu.timeTable,
    stores: userMenu.stores,
    myStoreProduct: userMenu.myStoreProduct,
    myBill: userMenu.myBill,
  };
};

const mapDispatchToProps = dispatch => ({
  // contain: bindActionCreators(UserActions.contain, dispatch),
  bringDataOfUser: bindActionCreators(UserActions.bringDataOfUser, dispatch),
  error: bindActionCreators(LoginActions.error, dispatch),
  logout: bindActionCreators(LoginActions.logout, dispatch),
  add: bindActionCreators(UserMenuActions.add, dispatch),
  up: bindActionCreators(UserMenuActions.up, dispatch),
  down: bindActionCreators(UserMenuActions.down, dispatch),
  del: bindActionCreators(UserMenuActions.del, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MenuContainer);
