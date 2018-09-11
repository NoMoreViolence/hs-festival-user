import React, { Component } from 'react';
import PropTypes from 'prop-types';

class UserBillPage extends Component {
  static propTypes = {
    bill: PropTypes.array.isRequired,
  };

  componentDidMount() {
    console.log(this.props.bill);
  }

  render() {
    return <div />;
  }
}

export default UserBillPage;
