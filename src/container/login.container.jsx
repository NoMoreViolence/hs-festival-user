import * as React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { LoginActions } from '../store/modules/login';
import Login from '../components/page/login/login.page';
import { UserActions } from '../store/modules/user';
import { UserMenuActions } from '../store/modules/usermenu';

class LoginContainer extends React.Component {
  static propTypes = {
    pending: PropTypes.bool.isRequired,
    logined: PropTypes.bool.isRequired,
    error: PropTypes.bool.isRequired,
    login: PropTypes.func.isRequired,
    contain: PropTypes.func.isRequired,
    dataInStore: PropTypes.func.isRequired,
    dataInTime: PropTypes.func.isRequired,
  };

  render() {
    return (
      <Login
        pending={this.props.pending}
        logined={this.props.logined}
        error={this.props.error}
        login={this.props.login}
        contain={this.props.contain}
        dataInStore={this.props.dataInStore}
        dataInTime={this.props.dataInTime}
      />
    );
  }
}

const mapStateToProps = (state) => {
  const { login } = state;
  return { pending: login.pending, logined: login.logined, error: login.error };
};

const mapDispatchToProps = dispatch => ({
  contain: bindActionCreators(UserActions.contain, dispatch),
  login: bindActionCreators(LoginActions.login, dispatch),
  dataInStore: bindActionCreators(UserMenuActions.dataInStore, dispatch),
  dataInTime: bindActionCreators(UserMenuActions.dataInTime, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoginContainer);
