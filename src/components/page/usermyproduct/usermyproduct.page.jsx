import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './usermyproduct.page.scss';
import { Table, Button } from 'reactstrap';

class UserMyProductPage extends Component {
  static propTypes = {};

  render() {
    return (
      <div className="myproduct-container">
        <h1 className="shopping-header">장바구니</h1>
        <Table responsive hover className="timetable-container">
          <thead>
            <tr>
              {/* <th>#</th>
              <th>
                <img src="/images/image/time.svg" alt="" />
              </th>
              <th>
                <img src="/images/image/whatfor.svg" alt="" />
              </th> */}
            </tr>
          </thead>
          <tbody>
            <tr className="shopping-product-tr">
              <td>1</td>
              <td>물건</td>
              <td>갯수?</td>
            </tr>
          </tbody>
        </Table>
        <div className="payment-wrapper">
          <div className="total-pay-wrapper">
            <div className="total-pay-heading">총 금액: </div>
            <div className="total-pay">{'100000'.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</div>
          </div>
          <Button className="btn-pay" outline>
            결제
          </Button>
        </div>
      </div>
    );
  }
}

export default UserMyProductPage;
