import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './usermyproduct.page.scss';
import { Table, Button } from 'reactstrap';
import { toast } from 'react-toastify';

class UserMyProductPage extends Component {
  static propTypes = {
    storeProduct: PropTypes.array.isRequired,
    up: PropTypes.func.isRequired,
    down: PropTypes.func.isRequired,
    del: PropTypes.func.isRequired,
    money: PropTypes.number.isRequired,
    buy: PropTypes.func.isRequired,

    getBillHistory: PropTypes.func.isRequired,
    dataInStore: PropTypes.func.isRequired,
  };

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
              if (object.item_count === 1) {
                toast('이상한 짓 하지 마세요');
              } else {
                this.props.down(object.name);
              }
            }}
          >
            <img src="/images/image/down.svg" alt="" />
          </span>
          <span style={{ paddingRight: '0.75rem', paddingLeft: '0.75rem' }}>{object.item_count}</span>
          <span
            onClick={() => {
              this.props.up(object.name);
            }}
          >
            <img src="/images/image/up.svg" alt="" />
          </span>
        </td>
        <td>{(object.price * object.item_count).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</td>
      </tr>
    ));
    return (
      <div className="myproduct-container">
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <h1 className="shopping-header">장바구니</h1>
          <h1 className="shopping-class-only">{this.props.storeProduct.length !== 0 && this.props.storeProduct[0].class}</h1>
        </div>
        <Table responsive hover className="timetable-container">
          <tbody>
            <tr className="shopping-product-tr" style={{ fontWeight: 'bold' }}>
              <td className="first-number" />
              <td>물건</td>
              <td>개수</td>
              <td>가격</td>
            </tr>
            {showProduct(this.props.storeProduct)}
          </tbody>
        </Table>
        <div className="payment-wrapper">
          <div className="total-pay-wrapper">
            <div className="total-pay-heading">총 금액: </div>
            <div className="total-pay">
              {this.props.storeProduct
                .reduce((sum, current) => sum + current.price * current.item_count, 0)
                .toString()
                .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}
            </div>
          </div>
          <Button
            className="btn-pay"
            outline
            color="primary"
            onClick={() => {
              if (this.props.money > this.props.storeProduct.reduce((sum, current) => sum + current.price * current.item_count, 0) && this.props.storeProduct.length !== 0) {
                toast('구매 요청 시작');
                this.props
                  .buy({ store_id: this.props.storeProduct[0].store_id, items: this.props.storeProduct })
                  .then((res) => {
                    console.log(res);
                    toast('구매가 완료 되었습니다 !', { type: 'success' });
                    this.props.dataInStore();
                    this.props.getBillHistory();
                  })
                  .catch((err) => {
                    console.log(err);
                    toast('구매 실패 입니다 !', { type: 'error' });
                  });
              } else {
                this.props.money < this.props.storeProduct.reduce((sum, current) => sum + current.price * current.item_count, 0)
                  ? toast('구매할 돈이 부족합니다 !', { type: 'error' })
                  : toast('구매할 상품을 선택해 주세요 !', { type: 'error' });
              }
            }}
          >
            결제
          </Button>
        </div>
      </div>
    );
  }
}

export default UserMyProductPage;
