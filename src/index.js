import 'react-app-polyfill/ie9';

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
// import { injectGlobal } from 'emotion';

import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import App from './ui/App';
// import MainRouter from './ui/MainRouter';
import * as serviceWorker from './serviceWorker';

import configureStore from './redux/configureStore';

// create store object
const store = configureStore();

// injectGlobal`
//   * {
//     box-sizing: border-box;
//     outline: 0;
//   }

//   html,
//   body {
//       margin: 0;
//       padding: 0;
//       height: 100%;
//       min-height: 100%;
//   }

//   body {
//     margin: 0;
//     padding: 0;
//     font-family: sans-serif;
//   }

//   body,
//   .application {
//     position: relative;
//     height: 100%;
//   }
// `;

class Index extends Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <App />
        {/* <MainRouter /> */}
        </BrowserRouter>
      </Provider>    
    );
  }
}

// class Index extends Component { // eslint-disable-line react/prefer-stateless-function
//   render() {
//     return (
//       <Provider store={store}>
//         <BrowserRouter>
//           <App />
//         </BrowserRouter>
//       </Provider>
//     );
//   }
// }

ReactDOM.render(<Index />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
