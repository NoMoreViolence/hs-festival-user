import * as React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { LoginActions } from '../store/modules/login';
import LoginAuto from '../components/page/loginauto/loginauto.page';
import { UserActions } from '../store/modules/user';

class LoginAutoContainer extends React.Component {
  static propTypes = {
    loginAuto: PropTypes.func.isRequired,
    contain: PropTypes.func.isRequired,
  };

  render() {
    return <LoginAuto loginAuto={this.props.loginAuto} contain={this.props.contain} />;
  }
}

const mapStateToProps = state => state;

const mapDispatchToProps = dispatch => ({
  loginAuto: bindActionCreators(LoginActions.loginAuto, dispatch),
  contain: bindActionCreators(UserActions.contain, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoginAutoContainer);
