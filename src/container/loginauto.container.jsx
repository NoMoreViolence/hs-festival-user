import * as React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { LoginActions } from '../store/modules/login';
import LoginAuto from '../components/page/loginauto/loginauto.page';

class LoginAutoContainer extends React.Component {
  static propTypes = {
    loginAuto: PropTypes.func.isRequired,
  };

  render() {
    return <LoginAuto loginAuto={this.props.loginAuto} />;
  }
}

const mapStateToProps = state => state;

const mapDispatchToProps = dispatch => ({
  loginAuto: bindActionCreators(LoginActions.loginAuto, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoginAutoContainer);
