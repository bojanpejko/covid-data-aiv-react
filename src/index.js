import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { Provider } from 'react-redux';
import { history } from './utils/history';
import { ConnectedRouter } from 'connected-react-router/immutable'

import Immutable from 'immutable';
import configureStore from './utils/history'
import reportWebVitals from './reportWebVitals';

const initialState = Immutable.Map();
const store = configureStore(initialState)

ReactDOM.render(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>
    </Provider>,
  document.getElementById('root')
);

reportWebVitals();
