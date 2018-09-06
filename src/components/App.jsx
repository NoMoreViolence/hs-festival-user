import React from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';

import { ToastContainer, toast } from 'react-toastify';

import sizeMe from 'react-sizeme';
import Confetti from 'react-confetti';
import InformationTemplate from './template/information/information.template';
import LoginAutoTemplate from './template/loginauto/loginauto.template';
import MenuTemplate from './template/menu/menu.template';

import './App.scss';

const App = sizeMe({
  monitorHeight: true,
  monitorWidth: true,
})(
  class App extends React.Component {
    state = {
      isOpen: false,
    };

    static propTypes = {
      size: PropTypes.shape({
        width: PropTypes.number,
        height: PropTypes.number,
      }),
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
          <Confetti {...this.props.size} />
          <ToastContainer />
          <LoginAutoTemplate />
          <Route exact path="/" component={InformationTemplate} />
          <Route exact path="/menu" component={MenuTemplate} />
        </div>
      );
    }
  },
);

export default App;
