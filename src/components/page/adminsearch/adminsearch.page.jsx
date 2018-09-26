import React, { Component } from 'react';
import PropTypes from 'prop-types';
// 이거 완전 뻑빡이네
import {
  Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Input, Button,
} from 'reactstrap';
import './adminsearch.page.scss';
import { toast } from 'react-toastify';

class AdminSearchPage extends Component {
  static propTypes = {
    searchUser: PropTypes.func.isRequired,
    searchUserSpending: PropTypes.func.isRequired,
    requestList: PropTypes.array.isRequired,
  };

  state = {
    grade: '학년',
    gradeOpen: false,
    major: '학과',
    majorOpen: false,
    class: '반',
    classOpen: false,
    id: '번호',
    idOpen: false,
    name: '',
    users: [],
  };

  search = null;

  componentDidMount() {
    const usersData = this.props.requestList.map(() => false);
    this.setState({
      users: usersData,
    });
  }

  changeUserSpendingShow = () => {
    const usersData = this.props.requestList.map(() => false);
    this.setState({
      users: usersData,
    });
  }

  changeGrade = (data) => {
    this.setState({
      grade: data.currentTarget.innerText,
    });
  };

  changeMajor = (data) => {
    this.setState({
      major: data.currentTarget.innerText,
    });
  };

  changeClass = (data) => {
    this.setState({
      class: data.currentTarget.innerText,
    });
  };

  changeId = (data) => {
    this.setState({
      id: data.currentTarget.innerText,
    });
  };

  // 삼항연산자를 쓰면 코드 줄 수가 줄어들긴 하지만 더럽다
  showSpending = (number) => {
    this.setState({
      users: this.state.users.map((object, i) => number === i && this.state.users[i] !== true),
    });
  }

  render() {
    const rederNumbers = () => {
      const number = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26];
      number.length = 26;
      return number.map((object, i) => (
        <DropdownItem key={i} style={{ flex: 1 }} onClick={this.changeId}>
          {object}
        </DropdownItem>
      ));
    };

    const renderResult = data => data.map((object, i) => (
      <div key={i} className="admin-search-results" style={{ padding: '0.75rem' }}>
        <div className="admin-search-result-name-title" style={{ paddingBottom: '0.5rem' }}>
          <span style={{ fontSize: '2rem', fontWeight: '300' }}>{object.admin === true ? '관리자' : '비 관리자'}</span>
        </div>
        <div className="admin-search-result-unit" style={{ display: 'flex' }}>
          <div className="admin-search-left" style={{ flex: 1, paddingBottom: '0.5rem' }}>
            <span className="admin-search-result-unit-title" style={{ fontSize: '1.2rem', fontWeight: 400 }}>
              {`${object.name} / ${object.major} / ${object.sign === true ? '회원' : '비회원'}`}
            </span>
            <div className="admin-search-result-unit-offline-info" style={{ fontSize: '1.2rem', fontWeight: 400 }}>
              <span>{`${object.grade}학년 `}</span>
              <span>{`${object.class}반 `}</span>
              <span>{`${object.id}번 `}</span>
            </div>
          </div>
          <div className="admin-search-right" style={{ flex: 1, paddingBottom: '0.5rem' }}>
            <div>
              <div>
                <span style={{ fontSize: '1.2rem', fontWeight: 400 }}>
                  {`${object.sign === true ? `유저 ID: ${object.user_id}` : `랜덤 키 값: ${object.key}`}`}
                </span>
              </div>
              <Button
                outline
                color="primary"
                onClick={() => {
                  this.showSpending(i);
                  this.props.searchUserSpending(object._id);
                }}
              >
                소비내역 검색
              </Button>
            </div>
          </div>
        </div>
        {this.state.users[i] === true
          && (
          <div>
            {this.props.requestList[i].spendingData.map((spending, j) => (
              <div key={j} className="admin-search-result-spending-data" style={{ paddingBottom: '2.5rem' }}>
                <div style={{ fontSize: '2rem' }}>
                  <span>거래 내역</span>
                </div>
                <div>
                  <span style={{ fontSize: '2rem' }}>{spending.confirmed ? '거래 완료됨' : '거래 대기 중'}</span>
                </div>
                <div style={{ display: 'flex' }}>
                  <span style={{ fontSize: '1.4rem', fontWeight: 300, flex: 1 }}>
                    {`${spending.class}`}
                  </span>
                  <span style={{ fontSize: '1.2rem', fontWeight: 300, flex: 1 }}>
                    {spending.money.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}
                  </span>
                </div>
                <div>
                  <span style={{ fontSize: '1.2rem', fontWeight: 300 }}>
                    {`${spending.moneyBefore.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')} - 
                    ${spending.money.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')} = 
                    ${spending.moneyAfter.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}`}
                  </span>
                </div>
                <div className="bill-deepdown-logo" style={{ paddingTop: '0.75rem' }}>
                  <span style={{ fontSize: '1.2rem' }}>거래품목: </span>
                </div>
                <div className="bill-deepdown-content">
                  {(
                    spending.items.map(
                      (stuff, base) => (spending.items.length !== base ? (
                        <div className="" key={base} style={{ display: 'flex' }}>
                          {console.log(stuff.price)}
                          {console.log(stuff.count)}
                          {console.log(stuff.price * stuff.count)}
                          <span style={{ flex: 1, fontSize: '1.2rem' }}>{`${stuff.name} X ${stuff.count}`}</span>
                          <span style={{ flex: 1, fontSize: '1.2rem' }}>{(stuff.price * stuff.count).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</span>
                        </div>
                      ) : null),
                    )
                  )}
                </div>
                <div className="bill-time" style={{ paddingTop: '0.75rem' }}>
                  <span style={{ fontSize: '1.2rem' }}>거래 시간</span>
                </div>
                <div className="bill-time-content">
                  <span style={{ fontSize: '1.2rem' }}>
                    {`${new Date(spending.updatedAt.toString()).getMonth()}월 
                    ${new Date(spending.updatedAt.toString()).getDate()}일 
                    ${new Date(spending.updatedAt.toString()).getHours()}시 
                    ${new Date(spending.updatedAt.toString()).getMinutes()}분`}
                  </span>
                </div>
              </div>
            ))}
          </div>
          )}
      </div>
    ));

    return (
      <React.Fragment>
        <div className="selected-container admin-search-container">
          <div className="admin-search-title">
            <span>Student Search</span>
          </div>
          <div className="admin-search-buttons">
            <Dropdown
              className="admin-search-button"
              isOpen={this.state.gradeOpen}
              toggle={() => {
                this.setState({
                  gradeOpen: !this.state.gradeOpen,
                });
              }}
            >
              <DropdownToggle caret style={{ flex: 1 }} outline color="primary">
                {this.state.grade}
              </DropdownToggle>
              <DropdownMenu>
                {this.state.grade !== '학년' && <DropdownItem onClick={this.changeGrade}>학년</DropdownItem>}
                <DropdownItem onClick={this.changeGrade}>1</DropdownItem>
                <DropdownItem onClick={this.changeGrade}>2</DropdownItem>
                <DropdownItem onClick={this.changeGrade}>3</DropdownItem>
                <DropdownItem onClick={this.changeGrade}>T</DropdownItem>
              </DropdownMenu>
            </Dropdown>
            <Dropdown
              className="admin-search-button"
              isOpen={this.state.majorOpen}
              toggle={() => {
                this.setState({
                  majorOpen: !this.state.majorOpen,
                });
              }}
            >
              <DropdownToggle caret style={{ flex: 1 }} outline color="primary">
                {this.state.major}
              </DropdownToggle>
              <DropdownMenu>
                {this.state.major !== '학과' && <DropdownItem onClick={this.changeMajor}>학과</DropdownItem>}
                <DropdownItem onClick={this.changeMajor}>H</DropdownItem>
                <DropdownItem onClick={this.changeMajor}>U</DropdownItem>
                <DropdownItem onClick={this.changeMajor}>G</DropdownItem>
                <DropdownItem onClick={this.changeMajor}>T</DropdownItem>
              </DropdownMenu>
            </Dropdown>
            <Dropdown
              className="admin-search-button"
              isOpen={this.state.classOpen}
              toggle={() => {
                this.setState({
                  classOpen: !this.state.classOpen,
                });
              }}
            >
              <DropdownToggle caret style={{ flex: 1 }} outline color="primary">
                {this.state.class}
              </DropdownToggle>
              <DropdownMenu>
                {this.state.class !== '반' && <DropdownItem onClick={this.changeClass}>반</DropdownItem>}
                <DropdownItem onClick={this.changeClass}>1</DropdownItem>
                <DropdownItem onClick={this.changeClass}>2</DropdownItem>
                <DropdownItem onClick={this.changeClass}>T</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
          <div className="admin-search-buttons">
            <Dropdown
              className="admin-search-button"
              isOpen={this.state.idOpen}
              toggle={() => {
                this.setState({
                  idOpen: !this.state.idOpen,
                });
              }}
            >
              <DropdownToggle caret style={{ flex: 1 }} outline color="primary">
                {this.state.id}
              </DropdownToggle>
              <DropdownMenu
                style={{
                  maxHeight: '150px',
                  overflow: 'auto',
                  flex: 1,
                  width: '200px',
                }}
              >
                {this.state.id !== '번호' && <DropdownItem onClick={this.changeId}>번호</DropdownItem>}
                {rederNumbers()}
              </DropdownMenu>
            </Dropdown>
          </div>
          <div className="admin-search-buttons">
            <Input
              placeholder="이름 입력"
              value={this.state.name}
              onChange={data => this.setState({
                name: data.currentTarget.value,
              })
              }
            />
            <Button
              outline
              color="primary"
              onClick={() => {
                const request = {
                  grade: this.state.grade,
                  major: this.state.major,
                  class: this.state.class,
                  id: this.state.id,
                  name: this.state.name,
                };

                this.state.grade === '학년' ? delete request.grade : console.log();
                this.state.major === '학과' ? delete request.major : console.log();
                this.state.class === '반' ? delete request.class : console.log();
                this.state.id === '번호' ? delete request.id : console.log();
                this.state.name === '' ? delete request.name : console.log();

                const array = Object.keys(request).map(i => [i, request[i]]);
                const url = array.reduce(
                  (prev, curr, currIndex) => (currIndex !== 0 ? `${prev}&${curr[0]}=${curr[1]}` : `${prev}?${curr[0]}=${curr[1]}`),
                  '',
                );

                // 정말 거지같은 소스다. 30분만 더 이 파일을 만질 수 있다면 고치겠지만, 안고친다. 시간이 없다
                // 서버가 자꾸 뒤져버린다
                // 후...

                // 뻑빡도 이런 뻑빡이 없다
                // 왜이리 데이터가 씨발인거지??
                // API 리퀘스트를 때려도 좆같은 추성빈 밖에 오지 않는다
                // 뭔가 잘못되었어
                this.search = toast('검색 시작', { position: toast.POSITION.TOP_LEFT, autoClose: 10000 });
                this.props
                  .searchUser(url)
                  .then((data) => {
                    this.changeUserSpendingShow();
                    toast.update(this.search, {
                      render: '검색 완료되었습니다 !',
                      type: toast.TYPE.SUCCESS,
                      position: toast.POSITION.TOP_RIGHT,
                      autoClose: 3000,
                    });
                  })
                  .catch(err => toast.update(this.search, {
                    render: '검색 실패입니다 !',
                    type: toast.TYPE.ERROR,
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 3000,
                  }));
              }}
            >
              검색하기
            </Button>
          </div>
        </div>
        <div className="selected-container admin-search-container">
          <div className="admin-search-result-title">
            <span>Search Result</span>
          </div>
          <div className="admin-search-result-content">{renderResult(this.props.requestList)}</div>
        </div>
        <div className="selected-container admin-search-container">
          <div className="admin-add-user-title">
            <span>Add User</span>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default AdminSearchPage;
