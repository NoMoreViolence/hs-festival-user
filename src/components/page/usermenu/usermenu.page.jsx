import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Button } from 'reactstrap';
import './usermenu.page.scss';

class UserMenuPage extends Component {
  static propTypes = {
    timeTable: PropTypes.func.isRequired,
  };

  render() {
    return (
      <div className="usermenu-container">
        <Button type="button" outline color="primary" className="border-button">
          <img src="/images/image/store.svg" alt="" className="usermenu-img" />
          <span>상점</span>
        </Button>
        <Button type="button" outline color="primary" className="border-button">
          <img src="/images/image/history.svg" alt="" className="usermenu-img" />
          <span>계산서</span>
        </Button>
        <Button
          type="button"
          outline
          color="primary"
          onClick={() => {
            this.props.timeTable();
          }}
        >
          <img src="/images/image/timetable.svg" alt="" className="usermenu-img" />
          <span>시간표</span>
        </Button>
      </div>
    );
  }
}

export default UserMenuPage;
