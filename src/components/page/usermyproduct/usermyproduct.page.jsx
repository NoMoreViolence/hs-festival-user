import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './usermyproduct.page.scss';
import { Table, Button } from 'reactstrap';
import { toast } from 'react-toastify';
import { css } from 'glamor';

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

  buyThing = null;

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
                toast('상품 개수는 0개가 될 수 없습니다 !', {
                  type: toast.TYPE.ERROR,
                  position: toast.POSITION.TOP_CENTER,
                  autoClose: 1000,
                });
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
              if (
                this.props.money
                  >= this.props.storeProduct.reduce((sum, current) => sum + current.price * current.item_count, 0)
                && this.props.storeProduct.length !== 0
              ) {
                this.buyThing = toast('구매 요청 시작', {
                  type: toast.TYPE.DEFAULT,
                  position: toast.POSITION.TOP_LEFT,
                  autoClose: 10000,
                });
                this.props
                  .buy({ store_id: this.props.storeProduct[0].store_id, items: this.props.storeProduct })
                  .then((res) => {
                    toast.update(this.buyThing, {
                      render: '구매 완료 !',
                      type: toast.TYPE.SUCCESS,
                      position: toast.POSITION.TOP_RIGHT,
                      className: css({
                        transform: 'rotateY(360deg)',
                        transition: 'transform 0.6s',
                      }),
                      autoClose: 3000,
                    });
                    this.props.dataInStore();
                    this.props.getBillHistory();
                  })
                  .catch((err) => {
                    console.log(err);
                    toast.update(this.buyThing, {
                      render: '구매실패 !',
                      type: toast.TYPE.ERROR,
                      position: toast.POSITION.TOP_CENTER,
                      className: css({
                        transform: 'rotateY(360deg)',
                        transition: 'transform 0.6s',
                      }),
                      autoClose: 3000,
                    });
                  });
              } else {
                this.props.money < this.props.storeProduct.reduce((sum, current) => sum + current.price * current.item_count, 0)
                  ? toast('구매할 돈이 부족합니다 !', { type: 'error', autoClose: 1000 })
                  : toast('구매할 상품을 선택해 주세요 !', { type: 'error', autoClose: 1000 });
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
