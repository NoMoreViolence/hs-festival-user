import * as React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { LoginActions } from '../../store/modules/login';
import Login from '../../components/page/login/login.page';

class LoginContainer extends React.Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    idChange: PropTypes.func.isRequired,
    pwChange: PropTypes.func.isRequired,
  };

  idChange = (e) => {
    this.props.idChange(e.target.value);
  };

  pwChange = (e) => {
    this.props.pwChange(e.target.value);
  };

  render() {
    return <Login id={this.props.id} pw={this.props.password} idChange={this.idChange} pwChange={this.pwChange} />;
  }
}

const mapStateToProps = (state) => {
  const { login } = state;
  return { id: login.id, password: login.password };
};

const mapDispatchToProps = dispatch => ({
  idChange: bindActionCreators(LoginActions.changeId, dispatch),
  pwChange: bindActionCreators(LoginActions.changePassword, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoginContainer);
