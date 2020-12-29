import './index.css';

import { App } from './App';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Store } from './context/Store';

ReactDOM.render(
  <Store>
    <Router>
      <App />
    </Router>
  </Store>,
  document.getElementById('root')
);
