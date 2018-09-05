import * as React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { LoginActions } from '../store/modules/login';
import Login from '../components/page/login/login.page';

class LoginContainer extends React.Component {
  static propTypes = {
    loginAuto: PropTypes.func.isRequired,
  };

  render() {
    return <Login loginAuto={this.props.loginAuto} />;
  }
}

const mapStateToProps = (state) => {};

const mapDispatchToProps = dispatch => ({
  loginAuto: bindActionCreators(LoginActions.loginAuto, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoginContainer);
