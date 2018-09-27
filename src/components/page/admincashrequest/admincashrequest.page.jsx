import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './admincashrequest.page.scss';
import { Input, Button } from 'reactstrap';
import axios from 'axios';
import { toast } from 'react-toastify';

class AdminCashRequestPage extends Component {
  static propTypes = {
    getUserChargeList: PropTypes.func.isRequired,
    userHistory: PropTypes.array.isRequired,
  };

  state = {
    show: false,
    class_id: '',
    real_class_id: '',
    username: '',
    suggestMoney: 0,
  };

  render() {
    const renderArray = data => data.map((object, i) => (
      <div key={i} className="show-hh">
        <div className="names">
          <span>{object.user_name}</span>
          <span>{object.admin_name}</span>
        </div>

        <div className="infos">
          <span style={{ minWidth: '150px', maxWidth: '300px' }}>
            {object.moneyBefore.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}
          </span>
          <span style={{ minWidth: '150px' }}>{object.money.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</span>
          <span>{object.moneyAfter.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</span>
        </div>

        <div className="buttons">
          <Button
            outline
            color="danger"
            onClick={() => {
              // this.props.cansel(object._id)
              axios
                .get(`/api/admin/charge/decline/${object._id}`, { headers: { token: localStorage.getItem('token') } })
                .then(res => this.props
                  .getUserChargeList(this.state.class_id)
                  .then((vl) => {
                    this.setState({ real_class_id: this.state.class_id });
                    toast('충전 취소가 승인되었습니다 !');
                  })
                  .catch((err) => {
                    toast('충선 취소 실패입니다 !');
                  }));
            }}
          >
              충전 신청 취소
          </Button>
          <Button
            outline
            color="primary"
            onClick={() => {
              // this.props.cansel(object._id)
              axios
                .get(`/api/admin/charge/accept/${object._id}`, { headers: { token: localStorage.getItem('token') } })
                .then(res => this.props
                  .getUserChargeList(object.user_classid)
                  .then((vl) => {
                    this.setState({ real_class_id: this.state.class_id });
                    toast('충전 신청이 승인되었습니다 !');
                  })
                  .catch((err) => {
                    toast('충선 신청 실패입니다 !');
                  }));
            }}
          >
              충전 신청 승인
          </Button>
        </div>
      </div>
    ));

    return (
      <React.Fragment>
        <div className="selected-container charge-search-container">
          <div className="search-title">
            <span>학생 검색</span>
          </div>
          <div className="search-bar">
            <Input
              type="text"
              placeholder="학번을 입력하세요..."
              onChange={(data) => {
                console.log(data.currentTarget.value);
                this.setState({
                  class_id: data.currentTarget.value,
                });
              }}
              value={this.state.class_id}
            />
            <Button
              outline
              color="primary"
              onClick={() => {
                console.log(this.state.class_id);
                this.props
                  .getUserChargeList(this.state.class_id)
                  .then((vl) => {
                    this.setState({ real_class_id: this.state.class_id });
                    toast('검색이 완료되었습니다 !');
                  })
                  .catch((err) => {
                    toast('검색 실패입니다 !');
                  });
              }}
            >
              검색 하기
            </Button>
          </div>
        </div>
        <div className="selected-container charge-result-container">
          <div className="result-title">
            {this.props.userHistory[0] ? (
              <React.Fragment>
                <span>{this.props.userHistory[0] ? this.props.userHistory[0].user_name : ''}</span>
                <span>{this.props.userHistory[0] ? this.props.userHistory[0].user_classid : ''}</span>
              </React.Fragment>
            ) : (
              <span>{this.state.real_class_id}</span>
            )}
          </div>
          <div className="result-bar">
            <Input
              type="text"
              placeholder="충전할 금액 입력"
              onChange={(data) => {
                this.setState({
                  suggestMoney: data.currentTarget.value,
                });
              }}
            />
            <Button
              outline
              color="primary"
              onClick={() => {
                axios
                  .post(
                    '/api/admin/charge/request',
                    {
                      class_id: this.props.userHistory[0] ? this.props.userHistory[0].user_classid : this.state.real_class_id,
                      money: this.state.suggestMoney,
                    },
                    { headers: { token: localStorage.getItem('token') } },
                  )
                  .then((vl) => {
                    toast('충전 신청이 완료되었습니다 !');
                  })
                  .catch((err) => {
                    toast('충전 신청 실패입니다 !');
                  });
              }}
            >
              충전 신청 하기
            </Button>
          </div>
        </div>

        <div className="selected-container charge-history-container">
          <div className="history-title">
            <span>충전 내역</span>
          </div>
          <div className="history-content">{renderArray(this.props.userHistory)}</div>
        </div>
      </React.Fragment>
    );
  }
}

export default AdminCashRequestPage;
