import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

import App from 'app/container';
import reducer from 'reducer';
import rootSaga from 'saga';

const sagaMiddleWare = createSagaMiddleware();
const enhancer =
  process.env.NODE_ENV === 'development'
    ? composeWithDevTools(applyMiddleware(sagaMiddleWare))
    : applyMiddleware(sagaMiddleWare);
const store = createStore(reducer, enhancer);
sagaMiddleWare.run(rootSaga);

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#a4e1ea',
      main: '#8EDAE5',
      dark: '#7fc4ce',
      contrastText: '#5c5958'
    },
    secondary: {
      light: '#faabaa',
      main: '#F99695',
      dark: '#ae6968',
      contrastText: '#5c5958'
    }
  }
});

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </Provider>,
  document.getElementById('root')
);

serviceWorker.unregister();
