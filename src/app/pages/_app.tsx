import React from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import ReduxThunk from 'redux-thunk';
import App, { Container } from 'next/app';
import withRedux from 'next-redux-wrapper';

import { authReducer } from '../store/auth/reducers';

const reducers = combineReducers({
  auth: authReducer,
});

const initStore = (initialState = {}, _) => {
  return createStore(
    reducers,
    initialState,
    composeWithDevTools(applyMiddleware(ReduxThunk)),
  );
};

interface AppProps {
  Component: React.Component;
  pageProps: any;
  store: any;
}

class MyApp extends App<AppProps> {
  static async getInitialProps ({ Component, ctx }) {
    return {
      pageProps: Component.getInitialProps
        ? await Component.getInitialProps(ctx)
        : {},
    };
  }

  render() {
    const { Component, pageProps, store } = this.props;

    return (
      <Container>
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </Container>
    );
  }
}

export default withRedux(initStore)(MyApp);
