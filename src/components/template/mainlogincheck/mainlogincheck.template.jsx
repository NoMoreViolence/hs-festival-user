import React from 'react';
import { withRouter } from 'react-router-dom';
import MainLoginCheckContainer from '../../../container/mainlogincheck.container';

class MainLoginCheckTemplate extends React.Component {
  render() {
    return <MainLoginCheckContainer />;
  }
}

export default withRouter(MainLoginCheckTemplate);
