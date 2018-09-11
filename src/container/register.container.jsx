import * as React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { RegisterActions } from '../store/modules/register';
import Register from '../components/page/register/register.page';

class RegisterContainer extends React.Component {
  static propTypes = {
    changeDoubleCheck: PropTypes.func.isRequired,
    doubleCheckPending: PropTypes.bool.isRequired,
    doubleCheckSuccess: PropTypes.bool.isRequired,
    registerPending: PropTypes.bool.isRequired,
    registerSuccess: PropTypes.bool.isRequired,
    doubleCheckId: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired,
  };

  render() {
    return (
      <Register
        changeDoubleCheck={this.props.changeDoubleCheck}
        doubleCheckPending={this.props.doubleCheckPending}
        doubleCheckSuccess={this.props.doubleCheckSuccess}
        registerPending={this.props.registerPending}
        registerSuccess={this.props.registerSuccess}
        doubleCheckId={this.props.doubleCheckId}
        register={this.props.register}
      />
    );
  }
}

const mapStateToProps = (state) => {
  const { register } = state;
  return {
    changeDoubleCheck: register.changeDoubleCheck,
    doubleCheckPending: register.doubleCheckPending,
    doubleCheckSuccess: register.doubleCheckSuccess,
    registerPending: register.registerPending,
    registerSuccess: register.registerSuccess,
  };
};

const mapDispatchToProps = dispatch => ({
  doubleCheckId: bindActionCreators(RegisterActions.doubleCheckId, dispatch),
  register: bindActionCreators(RegisterActions.register, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RegisterContainer);
