import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Button } from 'reactstrap';
import './userbill.page.scss';

class UserBillPage extends Component {
  static propTypes = {
    bill: PropTypes.array.isRequired,
    getBillHistory: PropTypes.func.isRequired,
  };

  state = {
    elementShowNone: [],
  };

  componentDidMount() {
    this.props.getBillHistory();
    const elements = this.props.bill.map(object => (object._type === '충전' ? false : !object.confirmed));
    console.log(elements);
    this.setState({
      elementShowNone: elements,
    });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.bill !== this.props.bill) {
      const elements = this.props.bill.map(object => (object._type === '충전' ? false : !object.confirmed));
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
          <span className={`${object._type === '충전' ? 'red' : 'blue'}`}>{object._type === '충전' ? '충전' : '소비'}</span>
          <span className="bill-changed">{`${object.moneyFlow.before} → ${object.moneyFlow.after}`.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</span>
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
              <span className={`${object._type === '충전' ? 'red' : 'blue'}`}>{object._type === '충전' ? '+' : '-'}</span>
              <span className={`${object._type === '충전' ? 'red' : 'blue'}`}>
                {object._type === '충전'
                  ? object.moneyFlow.after.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
                  : (object.moneyFlow.before - object.moneyFlow.after).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}
              </span>
            </div>
            <div>
              <span>{object._type === '충전' ? object.admin_name : object.class}</span>
            </div>
          </div>
          <div className="bill-deepdown-logo">
            <span>거래내용: </span>
          </div>
          <div className="bill-deepdown-content">
            {object._type === '충전' ? (
              <div className="bill-deepdown-content-stuffs">
                <span>{`${object.moneyFlow.before.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')} → ${object.moneyFlow.after.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}`}</span>
              </div>
            ) : (
              object.items.map((stuff, base) => (
                <div className="bill-deepdown-content-stuffs" key={base}>
                  <span>{`${stuff.item_name} X ${stuff.item_count}`}</span>
                  <span>{stuff.item_price.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</span>
                </div>
              ))
            )}
          </div>
          <div className="bill-time">
            <span>거래 시간</span>
          </div>
          <div className="bill-time-content">
            <span>{object.updatedAt.toString()}</span>
          </div>
          {object._type === '소비' && (
          <div className="bill-button">
            {!object.confirmed && (
            <Button outline color="danger">
                    결제 취소
            </Button>
            )}
            <Button outline color="primary" disabled={object.confirmed}>
              {object.confirmed ? '결제 확인 됨' : '결제 확인'}
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
