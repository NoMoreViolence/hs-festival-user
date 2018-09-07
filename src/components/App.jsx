import React from 'react';
import { Route } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';

import InformationTemplate from './template/information/information.template';
import LoginAutoTemplate from './template/loginauto/loginauto.template';
import MenuTemplate from './template/menu/menu.template';
import MainLoginCheckTemplate from './template/mainlogincheck/mainlogincheck.template';

import './App.scss';

class App extends React.Component {
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
        <Route
          exact
          path="/"
          render={() => (
            <React.Fragment>
              <InformationTemplate />
              <MainLoginCheckTemplate />
            </React.Fragment>
          )}
        />
        <Route exact path="/menu" component={MenuTemplate} />
      </div>
    );
  }
}

export default App;
