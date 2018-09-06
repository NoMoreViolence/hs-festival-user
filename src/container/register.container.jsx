import * as React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { RegisterActions } from '../store/modules/register';
import Register from '../components/page/register/register.page';

class RegisterContainer extends React.Component {
  static propTypes = {
    doubleCheckPending: PropTypes.bool.isRequired,
    doubleCheckSuccess: PropTypes.bool.isRequired,
    doubleCheckFailure: PropTypes.bool.isRequired,
    registerPending: PropTypes.bool.isRequired,
    registerSuccess: PropTypes.bool.isRequired,
    registerFailure: PropTypes.bool.isRequired,
    doubleCheckId: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired,
  };

  render() {
    return (
      <Register
        doubleCheckPending={this.props.doubleCheckPending}
        doubleCheckSuccess={this.props.doubleCheckSuccess}
        doubleCheckFailure={this.props.doubleCheckFailure}
        registerPending={this.props.registerPending}
        registerSuccess={this.props.registerSuccess}
        registerFailure={this.props.registerFailure}
        doubleCheckId={this.props.doubleCheckId}
        register={this.props.register}
      />
    );
  }
}

const mapStateToProps = (state) => {
  const { register } = state;
  return {
    doubleCheckPending: register.doubleCheckPending,
    doubleCheckSuccess: register.doubleCheckSuccess,
    doubleCheckFailure: register.doubleCheckFailure,
    registerPending: register.registerPending,
    registerSuccess: register.registerSuccess,
    registerFailure: register.registerFailure,
  };
};

const mapDispatchToProps = dispatch => ({
  doubleCheckId: bindActionCreators(RegisterActions.DoubleCheckId, dispatch),
  register: bindActionCreators(RegisterActions.register, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RegisterContainer);
