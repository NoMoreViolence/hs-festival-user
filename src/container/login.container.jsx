import * as React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { LoginActions } from '../store/modules/login';
import Login from '../components/page/login/login.page';

class LoginContainer extends React.Component {
  static propTypes = {
    pending: PropTypes.bool.isRequired,
    logined: PropTypes.bool.isRequired,
    error: PropTypes.bool.isRequired,
    login: PropTypes.func.isRequired,
  };

  render() {
    return <Login pending={this.props.pending} logined={this.props.logined} error={this.props.error} login={this.props.login} />;
  }
}

const mapStateToProps = (state) => {
  const { login } = state;
  return { pending: login.pending, logined: login.logined, error: login.error };
};

const mapDispatchToProps = dispatch => ({
  login: bindActionCreators(LoginActions.login, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoginContainer);
