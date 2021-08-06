import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import appStore from './state/store';
import { Provider } from 'react-redux';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={appStore}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
