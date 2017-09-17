import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { initialize } from 'redux-oauth';

import App from './src/components/App';
import configureStore from './src/redux/configureStore';

const apiUrl = 'http://localhost:3001';
const reduxOauthConfig = {
  backend: {
    apiUrl,
    tokenValidationPath: '/validate',
    authProviderPaths: {
      yandex: '/auth',
    },
    signOutPath: null,
  },
  currentLocation: document.URL,
  cookies: document.cookie,
};

const store = configureStore();
store.dispatch(initialize(reduxOauthConfig)).then(
  () => {
    const component = (
      <Provider store={store}>
        <App />
      </Provider>
    );
    ReactDOM.render(component, document.getElementById('root'));

    if (process.env.NODE_ENV !== 'production') {
      /* eslint-disable global-require */
      const DevTools = require('./src/components/DevTools').default;
      ReactDOM.render(<DevTools store={store} />, document.getElementById('dev-tools'));
      /* eslint-enable global-require */
    }
  },
);
