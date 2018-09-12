import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Button } from 'reactstrap';
import './userbill.page.scss';

class UserBillPage extends Component {
  static propTypes = {
    bill: PropTypes.array.isRequired,
  };

  state = {
    elementShowNone: [],
  };

  componentDidMount() {
    const elements = this.props.bill.map(object => (object.chargeType ? false : !object.approved));
    console.log(elements);
    this.setState({
      elementShowNone: elements,
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.bill !== this.props.bill) {
      const elements = this.props.bill.map(object => (object.chargeType ? false : !object.approved));
      console.log(elements);
      this.setState({
        elementShowNone: elements,
      });
    }
  }

  render() {
    const { bill } = this.props;

    const bills = data => data.map((object, i) => (
      <div className="selected-container important" key={i}>
        <div className="bill-type">
          <span className={`${object.chargeType ? 'red' : 'blue'}`}>{object.chargeType ? '충전' : '소비'}</span>
          <span className="bill-changed">{`${object.before} → ${object.after}`}</span>
          <span
            onClick={() => {
              const changed = this.state.elementShowNone.map((source, j) => (j === i ? !source : source));
              this.setState({
                elementShowNone: changed,
              });
            }}
          >
            <img src="/images/image/down.svg" alt="" />
          </span>
        </div>
        <div className="bill-more" style={{ display: this.state.elementShowNone[i] ? 'block' : 'none', padding: '1rem' }}>
          <div className="bill-changed">
            <div>
              <span className={`${object.chargeType ? 'red' : 'blue'}`}>{object.chargeType ? '+' : '-'}</span>
              <span className={`${object.chargeType ? 'red' : 'blue'}`}>{object.changed}</span>
            </div>
            <div>
              <span>{object.chargeType ? object.approver : object.class}</span>
            </div>
          </div>
          <div className="bill-deepdown-logo">
            <span>거래내용: </span>
          </div>
          <div className="bill-deepdown-content">
            {object.chargeType ? (
              <div className="bill-deepdown-content-stuffs">
                <span>{`${object.before} → ${object.after}`}</span>
              </div>
            ) : (
              object.what.map((stuff, base) => {
                console.log('hell');
                console.log(`${stuff} ${base}`);
                return (
                  <div className="bill-deepdown-content-stuffs" key={base}>
                    <span>{`${stuff.name} X ${stuff.number}`}</span>
                    <span>{stuff.price}</span>
                  </div>
                );
              })
            )}
          </div>
          <div className="bill-time">
            <span>거래 시간</span>
          </div>
          <div className="bill-time-content">
            <span>{object.time.toString()}</span>
          </div>
          {!object.chargeType && (
          <div className="bill-button">
            {!object.approved && <Button outline color="danger">결제 취소</Button>}
            <Button outline color="primary" disabled={object.approved}>
              {object.approved ? '결제 확인 됨' : '결제 확인'}
            </Button>
          </div>
          )}
        </div>
      </div>
    ));
    return <React.Fragment>{bills(bill)}</React.Fragment>;
  }
}

export default UserBillPage;
