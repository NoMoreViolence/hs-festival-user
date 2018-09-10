import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './usermyproduct.page.scss';
import { Table, Button } from 'reactstrap';
import { toast } from 'react-toastify';

class UserMyProductPage extends Component {
  static propTypes = {
    myStoreProduct: PropTypes.array.isRequired,
    up: PropTypes.func.isRequired,
    down: PropTypes.func.isRequired,
    del: PropTypes.func.isRequired,
  };

  shouldComponentUpdate() {
    console.log(this.props.myStoreProduct);
    return true;
  }

  render() {
    const showProduct = data => data.map((object, i) => (
      <tr className="shopping-product-tr" key={i}>
        <td className="first-number">
          <span
            onClick={() => {
              this.props.del(object.name);
            }}
          >
            <img src="/images/image/logout.svg" alt="" />
          </span>
        </td>
        <td>{object.name}</td>
        <td>
          <span
            onClick={() => {
              if (object.count === 1) {
                toast('이상한 짓 하지 마세요');
              } else {
                this.props.down(object.name);
              }
            }}
          >
            <img src="/images/image/down.svg" alt="" />
          </span>
          <span style={{ paddingRight: '0.75rem', paddingLeft: '0.75rem' }}>{object.count}</span>
          <span
            onClick={() => {
              this.props.up(object.name);
            }}
          >
            <img src="/images/image/up.svg" alt="" />
          </span>
        </td>
        <td>{(object.price * object.count).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</td>
      </tr>
    ));
    return (
      <div className="myproduct-container">
        <h1 className="shopping-header">장바구니</h1>
        <Table responsive hover className="timetable-container">
          <tbody>
            <tr className="shopping-product-tr" style={{ fontWeight: 'bold' }}>
              <td className="first-number" />
              <td>물건</td>
              <td>개수</td>
              <td>가격</td>
            </tr>
            {showProduct(this.props.myStoreProduct)}
          </tbody>
        </Table>
        <div className="payment-wrapper">
          <div className="total-pay-wrapper">
            <div className="total-pay-heading">총 금액: </div>
            <div className="total-pay">
              {this.props.myStoreProduct
                .reduce((sum, current) => sum + current.price * current.count, 0)
                .toString()
                .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}
            </div>
          </div>
          <Button className="btn-pay" outline color="primary">
            결제
          </Button>
        </div>
      </div>
    );
  }
}

export default UserMyProductPage;
