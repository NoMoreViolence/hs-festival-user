import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Button } from 'reactstrap';
import './adminmenu.page.scss';

class AdminMenuPage extends Component {
  static propTypes = {
    cash: PropTypes.func.isRequired,
    store: PropTypes.func.isRequired,
    search: PropTypes.func.isRequired,
  };

  render() {
    return (
      <div className="adminmenu-container">
        <Button type="button" outline color="primary" className="border-button" onClick={() => this.props.cash()}>
          <img src="/images/image/money.svg" alt="" />
          <span>캐시충전</span>
        </Button>
        <Button type="button" outline color="primary" className="border-button" onClick={() => this.props.store()}>
          <img src="/images/image/information.svg" alt="" />
          <span>상점정보</span>
        </Button>
        <Button type="button" outline color="primary" className="" onClick={() => this.props.search()}>
          <img src="/images/image/search.svg" alt="" />
          <span>학생검색</span>
        </Button>
      </div>
    );
  }
}

export default AdminMenuPage;
