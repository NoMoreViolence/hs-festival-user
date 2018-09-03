import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.scss';

import LoginTemplate from './template/login/login.template';

class App extends Component {
  render() {
    return (
      <div className="root-container">
        <Route exact path="/" component={LoginTemplate} />
      </div>
    );
  }
}

export default App;
