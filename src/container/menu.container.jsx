import * as React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { UserActions } from '../store/modules/user';
import Menu from '../components/page/menu/menu.page';
import { LoginActions } from '../store/modules/login';

class MenuContainer extends React.Component {
  static propTypes = {
    logined: PropTypes.bool.isRequired,
    admin: PropTypes.bool.isRequired,
    username: PropTypes.string.isRequired,
    money: PropTypes.number.isRequired,
    luckyNumber: PropTypes.number.isRequired,
    bringDataOfUser: PropTypes.func.isRequired,
    bringSuccess: PropTypes.bool.isRequired,
    bringPending: PropTypes.bool.isRequired,
    error: PropTypes.func.isRequired,
  };

  render() {
    return (
      <Menu
        logined={this.props.logined}
        admin={this.props.admin}
        username={this.props.username}
        money={this.props.money}
        luckyNumber={this.props.luckyNumber}
        bringDataOfUser={this.props.bringDataOfUser}
        bringSuccess={this.props.bringSuccess}
        bringPending={this.props.bringPending}
        error={this.props.error}
      />
    );
  }
}

const mapStateToProps = (state) => {
  const { user, login } = state;

  return {
    logined: login.logined,
    admin: user.admin,
    username: user.username,
    money: user.money,
    luckyNumber: user.luckyNumber,
    bringSuccess: user.bringSuccess,
    bringPending: user.bringPending,
  };
};

const mapDispatchToProps = dispatch => ({
  // contain: bindActionCreators(UserActions.contain, dispatch),
  bringDataOfUser: bindActionCreators(UserActions.bringDataOfUser, dispatch),
  error: bindActionCreators(LoginActions.error, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MenuContainer);
