import React from 'react';
import { Route } from 'react-router-dom';

import { ToastContainer } from 'react-toastify';

import InformationTemplate from './template/information/information.template';

import './App.scss';

export default class App extends React.Component {
  state = {
    isOpen: false,
  };

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  };

  render() {
    return (
      <div className="app-container">
        <ToastContainer />
        <Route exact path="/" component={InformationTemplate} />
      </div>
    );
  }
}
