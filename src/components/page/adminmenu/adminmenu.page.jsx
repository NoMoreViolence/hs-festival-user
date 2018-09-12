import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Button } from 'reactstrap';
import './adminmenu.page.scss';

class AdminMenuPage extends Component {
  static propTypes = {
    confirm: PropTypes.func.isRequired,
    charge: PropTypes.func.isRequired,
  };

  render() {
    return (
      <div className="adminmenu-container">
        <Button type="button" outline color="primary" className="border-button" onClick={() => this.props.confirm()}>
          <img src="/images/image/confirm.svg" alt="" />
          <span>충전 승인</span>
        </Button>
        <Button type="button" outline color="primary" className="" onClick={() => this.props.charge()}>
          <img src="/images/image/require.svg" alt="" />
          <span>충전 신청</span>
        </Button>
      </div>
    );
  }
}

export default AdminMenuPage;
