import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, Button } from 'reactstrap';
import './userstore.page.scss';
import { toast } from 'react-toastify';

class UserStorePage extends Component {
  state = {
    1: false,
    the11: '',
    the12: '',
    the13: '',
    the14: '',
    the15: '',
    the16: '',
    the17: '',
    the18: '',
    the19: '',
    2: false,
    the21: '',
    the22: '',
    the23: '',
    the24: '',
    the25: '',
    the26: '',
    the27: '',
    the28: '',
    the29: '',
    3: false,
    the31: '',
    the32: '',
    the33: '',
    the34: '',
    the35: '',
    the36: '',
    the37: '',
    the38: '',
    the39: '',
    4: false,
    the41: '',
    the42: '',
    the43: '',
    the44: '',
    the45: '',
    the46: '',
    the47: '',
    the48: '',
    the49: '',
    5: false,
    the51: '',
    the52: '',
    the53: '',
    the54: '',
    the55: '',
    the56: '',
    the57: '',
    the58: '',
    the59: '',
    6: false,
    the61: '',
    the62: '',
    the63: '',
    the64: '',
    the65: '',
    the66: '',
    the67: '',
    the68: '',
    the69: '',
    7: false,
    the71: '',
    the72: '',
    the73: '',
    the74: '',
    the75: '',
    the76: '',
    the77: '',
    the78: '',
    the79: '',
    8: false,
    the81: '',
    the82: '',
    the83: '',
    the84: '',
    the85: '',
    the86: '',
    the87: '',
    the88: '',
    the89: '',
    9: false,
    the91: '',
    the92: '',
    the93: '',
    the94: '',
    the95: '',
    the96: '',
    the97: '',
    the98: '',
    the99: '',
    10: false,
    the101: '',
    the102: '',
    the103: '',
    the104: '',
    the105: '',
    the106: '',
    the107: '',
    the108: '',
    the109: '',
    11: false,
    the111: '',
    the112: '',
    the113: '',
    the114: '',
    the115: '',
    the116: '',
    the117: '',
    the118: '',
    the119: '',
  };

  static propTypes = {
    stores: PropTypes.array.isRequired,
    storeProduct: PropTypes.array.isRequired,
    add: PropTypes.func.isRequired,

    dataInStore: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.dataInStore();
  }

  render() {
    const showStore = data => data.map((object, i) => (
      <React.Fragment key={i}>
        <tr
          onClick={() => {
            this.setState({
              [i]: !this.state[i],
            });
          }}
        >
          <td>{object.class}</td>
          <td>{object.introduction}</td>
        </tr>
        {this.state[i] && (
        <React.Fragment>
          {object.items.map((value, j) => (
            <tr
              style={{ background: 'rgb(222, 226, 230)' }}
              key={j + 1}
              onClick={() => {
                if (this.state[`the${i + 1}${j + 1}`] === '' || (new Date() - this.state[`the${i + 1}${j + 1}`]) / 1000 > 5) {
                  toast(`한번 더 ${value.name} 을/를 클릭하면 장바구니로 이동`, {});
                  this.setState({
                    [`the${i + 1}${j + 1}`]: new Date(),
                  });
                } else {
                  if (this.props.storeProduct.every(f => f.name !== value.name && f.class === object.class) === true) {
                    this.props.add({ class: object.class, item_count: 1, ...value });
                    toast(`${value.name} 상품이 장바구니에 추가 되었습니다 !`, {});
                    this.setState({
                      [`the${i + 1}${j + 1}`]: '',
                    });
                  } else {
                    toast('같은 클래스의 상품을 선택해 주세요');
                  }
                }
              }}
            >
              <td>{value.name}</td>
              <td style={{ display: 'flex', justifyContent: 'space-around' }}>
                <span>{value.price.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</span>
              </td>
            </tr>
          ))}
        </React.Fragment>
        )}
      </React.Fragment>
    ));

    // <div className="store-subject">
    //       <span>
    //         <img src="/images/image/store.svg" alt="" />
    //       </span>
    //     </div>
    return (
      <Table responsive className="storetable-container">
        <thead>
          <tr>
            <th style={{ minWidth: '150px' }}>
              <img src="/images/image/class.svg" alt="" />
            </th>
            <th style={{ minWidth: '150px' }}>
              <img src="/images/image/face.svg" alt="" />
            </th>
          </tr>
        </thead>
        <tbody>{showStore(this.props.stores)}</tbody>
      </Table>
    );
  }
}

export default UserStorePage;
