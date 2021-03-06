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
    username: PropTypes.string.isRequired,
    class_id: PropTypes.string.isRequired,
  };

  state = {
    show: false,
    user_id: '',
    suggestMoney: '',
    state: [],
  };

  componentDidMount() {
    const state = this.props.userHistory.map((object, i) => object.approved);
    this.setState({
      state,
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps !== this.props) {
      const state = this.props.userHistory.map((object, i) => object.approved);
      this.setState({
        state,
      });
    }
  }

  render() {
    const renderArray = data => data.map((object, i) => (
      <div key={i} className="show-hh">
        <div className="names">
          <span>{`유저: ${object.user_name}`}</span>
          {!object.approved ? (
            <span>{object.admin_name}</span>
          ) : (
            <React.Fragment>
              <span>{`신청자: ${object.requester_admin_name}`}</span>
              <span>{`승인자: ${object.admin_name}`}</span>
            </React.Fragment>
          )}
        </div>

        <div className="infos">
          <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '0.75rem' }}>
            <span style={{ minWidth: '150px', maxWidth: '300px' }}>{`충전 전: ${object.moneyBefore.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}`}</span>
            <span>{`충전 후: ${object.moneyAfter.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}`}</span>
          </div>
          <div style={{ paddingTop: '0.75rem' }}>
            <span style={{ minWidth: '150px' }}>{`충전량: ${object.money.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}`}</span>
          </div>
        </div>
        {!object.approved && (
        <div className="buttons">
          <Button
            outline
            color="danger"
            onClick={() => {
              // this.props.cansel(object._id)
              axios.get(`/api/admin/charge/decline/${object._id}`, { headers: { token: localStorage.getItem('token') } }).then(res => this.props
                .getUserChargeList(this.state.class_id)
                .then((vl) => {
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
              if (!this.state[i]) {
                const state = this.state.state.map((bool, j) => (i === j ? !bool : bool));
                this.setState({
                  state,
                });

                axios
                  .get(`/api/admin/charge/accept/${object._id}`, { headers: { token: localStorage.getItem('token') } })
                  .then(res => this.props
                    .getUserChargeList(object.user_classid)
                    .then((vl) => {
                      toast('충전 신청이 승인되었습니다 !');
                    })
                    .catch((err) => {
                      toast('충전 신청은 했지만, 데이터 불러오기에 실패했습니다 !');
                    }))
                  .catch((res) => {
                    const returnState = this.state.state.map((bool, j) => (i === j ? !bool : bool));
                    this.setState({
                      state: returnState,
                    });
                    toast('충전 신청 승인 실패입니다 !');
                  });
              } else {
                toast('충전 신청 중이거나 못하니까 좀 닥치고 있으세요');
              }
            }}
          >
                충전 신청 승인
          </Button>
        </div>
        )}
      </div>
    ));

    return (
      <React.Fragment>
        <div className="selected-container charge-search-container">
          <div className="search-title">
            <span>학생 조회</span>
          </div>
          <div className="search-bar">
            <Button
              outline
              color="primary"
              onClick={() => {
                this.props
                  .getUserChargeList(this.state.class_id)
                  .then((vl) => {
                    toast('검색이 완료되었습니다 !');
                  })
                  .catch((err) => {
                    toast('검색 실패입니다 !');
                  });
              }}
            >
              조회 하기
            </Button>
          </div>
        </div>
        <div className="selected-container charge-result-container">
          <div className="result-title">
            <span>{this.props.username}</span>
            <span>{this.props.class_id}</span>
          </div>
          <div className="result-bar">
            <Input
              type="text"
              placeholder="충전할 ㅅ끼 학번 입력"
              value={this.state.user_id}
              onChange={(data) => {
                this.setState({
                  user_id: data.currentTarget.value,
                });
              }}
            />
            <Input
              type="text"
              placeholder="충전할 금액 입력"
              value={this.state.suggestMoney}
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
                if (this.state.user_id.length === 5 && typeof (this.state.suggestMoney * 1) === 'number') {
                  axios
                    .post(
                      '/api/admin/charge/request',
                      {
                        class_id: this.state.user_id,
                        money: this.state.suggestMoney * 1,
                      },
                      { headers: { token: localStorage.getItem('token') } },
                    )
                    .then((vl) => {
                      toast('충전 신청이 완료되었습니다 !');
                      this.props
                        .getUserChargeList(this.props.class_id)
                        .then(res => console.log(res))
                        .catch(err => console.log(err));
                    })
                    .catch((err) => {
                      this.setState({
                        user_id: '왜 틀리니 한심하게',
                        money: '',
                      });
                      toast(err.response.data.message);
                    });
                } else {
                  toast('형식에 맞게 입력을 하렴 이 병신새끼야', { position: toast.POSITION.TOP_RIGHT, autoClose: 3000 });
                }
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
