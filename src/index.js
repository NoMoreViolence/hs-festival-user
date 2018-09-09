import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import App from './components/App';
import './index.scss';
import 'react-toastify/scss/main.scss';
import 'bootstrap/scss/bootstrap.scss';

(function (url) {
  // Create a new `Image` instance
  const image = new Image();

  image.onload = function () {
    // Inside here we already have the dimensions of the loaded image
    const style = [
      // Hacky way of forcing image's viewport using `font-size` and `line-height`
      'font-size: 1px;',
      `line-height: ${this.height}px;`,

      // Hacky way of forcing a middle/center anchor point for the image
      `padding: ${this.height * 0.5}px ${this.width * 0.5}px;`,

      // Set image dimensions
      `background-size: ${this.width}px ${this.height}px;`,

      // Set image URL
      `background: url(${url});`,
    ].join(' ');

    console.log('%c', style);
  };

  // Actually loads the image
  image.src = url;
}('http://localhost:3000/images/history.svg'));

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'),
);
