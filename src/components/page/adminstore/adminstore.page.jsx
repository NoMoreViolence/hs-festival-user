import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Button } from 'reactstrap';
import './adminstore.page.scss';
import { toast } from 'react-toastify';

const propTypes = {
  getAllStore: PropTypes.func.isRequired,
  allStore: PropTypes.array.isRequired,
  sortStoreData: PropTypes.func.isRequired,
  changeCanbuy: PropTypes.func.isRequired,
  showStoreMore: PropTypes.func.isRequired,
};

class AdminStorePage extends Component {
  state = {
    left: true,
    center: false,
    right: false,
  };

  canbuy = null;

  componentDidMount() {
    this.props
      .getAllStore()
      .then(() => {
        this.props.sortStoreData('기본');
      })
      .catch(err => console.log(err));
    console.log(this.props.allStore);
  }

  changeSortWay = (data) => {
    this.setState({
      left: data.currentTarget.innerText === '기본',
      center: data.currentTarget.innerText === '매출',
      right: data.currentTarget.innerText === '판매',
    });
    this.props.sortStoreData(data.currentTarget.innerText);
  };

  changeCanBuy = (data) => {
    const callData = data.currentTarget.id.split(' ');
    console.log(callData);
    this.props.changeCanbuy(callData[0], callData[1], callData[2]).then((res) => {
      console.log(res);
      this.canbuy = toast('변경 시작...', { position: toast.POSITION.TOP_LEFT, autoClose: 10000 });
      this.props
        .getAllStore()
        .then(() => {
          toast.update(this.canbuy, {
            render: '변경 성공 !',
            position: toast.POSITION.TOP_RIGHT,
            type: toast.TYPE.SUCCESS,
            autoClose: 3000,
          });
          this.props.sortStoreData('기본');
        })
        .catch(err => toast.update(this.canbuy, {
          render: '변경 실패 ! ',
          position: toast.POSITION.TOP_RIGHT,
          type: toast.TYPE.ERROR,
          autoClose: 3000,
        }));
    });
  };

  render() {
    const showFuckingStore = data => data.map((object, i) => (
      <div key={i} className="selected-container admin-store-container">
        <div
          className="admin-store-title"
          onClick={() => {
            this.props.showStoreMore(i);
          }}
        >
          <span>{object.class}</span>
          <span>{object.introduction}</span>
        </div>
        {object.show && (
        <div className="admin-store-content">
          <div className="admin-store-content-basic-info">
            <span>{`판매 수량: ${object.buyCount.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}`}</span>
            <span>{`총 매출: ${object.income.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}`}</span>
          </div>
          {object.items.map((item, j) => (
            <div
              key={j}
              className={`admin-store-content-item ${item.phrase === 'HOT' && 'hot'} ${item.phrase === '추천'
                    && 'recommend'}`}
            >
              <div className="item-info">
                <span className="item-name">{item.name}</span>
                <span className="item-price">{item.price.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</span>
              </div>
              <div className="item-button">
                <Button
                  id={`${object._id} ${item._id} ${!item.canbuy}`}
                  outline
                  color={`${item.canbuy === true ? 'danger' : 'primary'}`}
                  onClick={this.changeCanBuy}
                >
                  {item.canbuy === true ? '구매 불가로 변환' : '구매 가능으로 변환'}
                </Button>
              </div>
            </div>
          ))}
        </div>
        )}
      </div>
    ));

    return (
      <React.Fragment>
        <div className="selected-container admin-store-select-container">
          <Button
            className="admin-store-select-left-button"
            color="primary"
            outline={this.state.left}
            onClick={this.changeSortWay}
          >
            기본
          </Button>
          <Button
            className="admin-store-select-center-button"
            color="primary"
            outline={this.state.center}
            onClick={this.changeSortWay}
          >
            매출
          </Button>
          <Button
            className="admin-store-select-right-button"
            color="primary"
            outline={this.state.right}
            onClick={this.changeSortWay}
          >
            판매
          </Button>
        </div>
        {showFuckingStore(this.props.allStore)}
      </React.Fragment>
    );
  }
}

AdminStorePage.propTypes = propTypes;

export default AdminStorePage;
