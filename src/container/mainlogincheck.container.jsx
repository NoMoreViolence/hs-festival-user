import * as React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import MainLoginCheck from '../components/page/mainlogincheck/mainlogincheck.page';

class MainLoginCheckContainer extends React.Component {
  static propTypes = {
    logined: PropTypes.bool.isRequired,
  };

  render() {
    return <MainLoginCheck logined={this.props.logined} />;
  }
}

const mapStateToProps = (state) => {
  const { login } = state;
  return { logined: login.logined };
};

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MainLoginCheckContainer);
