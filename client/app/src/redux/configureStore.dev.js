import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import DevTools from '../components/DevTools';
import reducers from './reducers';

export default function (initialState = {}) {
  const store = createStore(reducers, initialState, compose(
    applyMiddleware(thunk),
    DevTools.instrument(),
  ));

  if (module.hot) {
    module.hot.accept('./reducers', () =>
      store.replaceReducer(reducers),
    );
  }
  return store;
}
