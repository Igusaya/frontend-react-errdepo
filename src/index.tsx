import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';

import App from 'app/component';
import reducer from 'reducer';
import rootSaga from 'saga';

const sagaMiddleWare = createSagaMiddleware();
const enhancer =
  process.env.NODE_ENV === 'development'
    ? composeWithDevTools(applyMiddleware(sagaMiddleWare))
    : applyMiddleware(sagaMiddleWare);
const store = createStore(reducer, enhancer);
ReactDOM.render(
  <Provider store={store}>
    <App isSignIn={true} />
  </Provider>,
  document.getElementById('root')
);

sagaMiddleWare.run(rootSaga);
serviceWorker.unregister();
