import React, { Component } from 'react';
import './usermenu.page.scss';

import { Button } from 'reactstrap';

class UserMenuPage extends Component {
  render() {
    return (
      <div className="usermenu-container">
        <Button type="button" outline color="primary">
          <span>상점 보기</span>
          <img src="/images/image/store.svg" alt="" />
        </Button>
        <Button type="button" outline color="primary">
          <span>구매 내역</span>
          <img src="/images/image/history.svg" alt="" />
        </Button>
        <Button type="button" outline color="primary">
          <span>축제 시간표</span>
          <img src="/images/image/timetable.svg" alt="" />
        </Button>
      </div>
    );
  }
}

export default UserMenuPage;
