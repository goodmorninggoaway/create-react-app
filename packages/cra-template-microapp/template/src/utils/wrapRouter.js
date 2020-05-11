import React from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@infosight/elmer/dist/components/ThemeProvider';
import store from '../bootstrapper/store';

// this function will just take a component and return a new component that has any needed contexts in its component tree
const wrapRouter = WrappedComponent => props => (
  <Provider store={store}>
    <ThemeProvider>
      <WrappedComponent {...props} />
    </ThemeProvider>
  </Provider>
);

export default wrapRouter;
