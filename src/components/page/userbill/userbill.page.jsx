import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './userbill.page.scss';

class UserBillPage extends Component {
  static propTypes = {
    bill: PropTypes.array.isRequired,
  };

  state = {
    elementShowNone: [],
  };

  componentDidMount() {
    const elements = this.props.bill.map(object => (!!object.chargeType));
    this.setState({
      elementShowNone: elements,
    });
  }

  render() {
    const { bill } = this.props;

    const bills = data => data.map((object, i) => (
      <div className="selected-container" key={i}>
        <div className="bill-type">
          <span className={`${object.chargeType ? 'red' : 'blue'}`}>{object.chargeType ? '충전' : '소비'}</span>
          <span className="bill-changed">{`${object.before} -> ${object.after}`}</span>
          <span>
            <img src="/images/image/down.svg" alt="" />
          </span>
        </div>
      </div>
    ));
    return <React.Fragment>{bills(bill)}</React.Fragment>;
  }
}

export default UserBillPage;
