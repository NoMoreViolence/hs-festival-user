import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import * as PropTypes from 'prop-types';
import { toast } from 'react-toastify';

class LoginPage extends Component {
  static propTypes = {
    logined: PropTypes.bool.isRequired,
    history: PropTypes.any.isRequired, // eslint-disable-line react/forbid-prop-types
  };

  componentDidMount() {
    if (this.props.logined === true) {
      toast('접근 권한이 없습니다 !', { type: 'error', position: toast.POSITION.BOTTOM_CENTER });
      this.props.history.push('/menu');
    }
  }

  render() {
    return <div />;
  }
}

export default withRouter(LoginPage);
