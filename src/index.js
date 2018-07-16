import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

// import css stylesheets
import './index.css';
import '../node_modules/@fortawesome/fontawesome-pro/css/all.css';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
