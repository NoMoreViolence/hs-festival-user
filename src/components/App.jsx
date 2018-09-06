import React from 'react';
import { Route } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';

import InformationTemplate from './template/information/information.template';
import LoginAutoTemplate from './template/loginauto/loginauto.template';

import './App.scss';

export default class App extends React.Component {
  state = {
    isOpen: false,
  };

  componentDidMount() {
    toast('한세의 민족에 오신것을 환영합니다 !');
  }

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  };

  render() {
    return (
      <div className="app-container">
        <ToastContainer />
        <LoginAutoTemplate />
        <Route exact path="/" component={InformationTemplate} />
      </div>
    );
  }
}
