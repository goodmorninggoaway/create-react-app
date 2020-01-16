import React from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@infosight/elmer/dist/components/ThemeProvider';
import getStore from './getStore';

// this function will just take a component and return a new component that has any needed contexts in its component tree
export default WrappedComponent => () => (
  <Provider store={getStore()}>
    <ThemeProvider>
      <WrappedComponent />
    </ThemeProvider>
  </Provider>
);
