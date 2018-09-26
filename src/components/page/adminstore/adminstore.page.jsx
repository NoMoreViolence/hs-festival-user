import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Button } from 'reactstrap';
import './adminstore.page.scss';

const propTypes = {
  getAllStore: PropTypes.func.isRequired,
  allStore: PropTypes.array.isRequired,
  sortStoreData: PropTypes.func.isRequired,
};

class AdminStorePage extends Component {
  state = {
    left: true,
    center: false,
    right: false,
  };

  componentDidMount() {
    this.props
      .getAllStore()
      .then((data) => {
        console.log(data.value.data.data.store);
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

  render() {
    const showFuckingStore = data => data.map((object, i) => (
      <div key={i} className="selected-container admin-store-container">
        <div className="admin-store-title">
          <span>{object.class}</span>
          <span>{object.introduction}</span>
        </div>
      </div>
    ));
    return (
      <React.Fragment>
        <div className="selected-container admin-store-select-container">
          <Button className="admin-store-select-left-button" color="primary" onClick={this.changeSortWay}>
            기본
          </Button>
          <Button className="admin-store-select-center-button" color="primary" onClick={this.changeSortWay}>
            매출
          </Button>
          <Button className="admin-store-select-right-button" color="primary" onClick={this.changeSortWay}>
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
