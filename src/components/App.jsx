import React from 'react';
import { Route } from 'react-router-dom';
import './App.scss';

import InformationTemplate from './template/information/information.template';

const App = () => (
  <div className="root-container">
    <Route exact path="/" component={InformationTemplate} />
  </div>
);

export default App;
