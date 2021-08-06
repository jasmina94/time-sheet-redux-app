import React from 'react';
import ReactDOM from 'react-dom';
import appStore from './state/store';
import { Provider } from 'react-redux';
import { App} from './app/App';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={appStore}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
