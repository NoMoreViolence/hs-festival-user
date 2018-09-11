import * as React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { UserActions } from '../store/modules/user';
import { LoginActions } from '../store/modules/login';

import Menu from '../components/page/menu/menu.page';

class MenuContainer extends React.Component {
  static propTypes = {
    logined: PropTypes.bool.isRequired,
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
  };

  render() {
    return (
      <Menu
        logined={this.props.logined}
        admin={this.props.admin}
        name={this.props.name}
        id={this.props.id}
        money={this.props.money}
        _id={this.props._id}
        bill={this.props.bill}
        storeProduct={this.props.storeProduct}
        logout={this.props.logout}
        timeTable={this.props.timeTable}
        stores={this.props.stores}
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
  logout: bindActionCreators(LoginActions.logout, dispatch),
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
