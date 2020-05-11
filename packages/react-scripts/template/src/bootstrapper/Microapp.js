import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import ShellStateCache from './ShellStateCache';
import PrimaryNavExtension from './PrimaryNavExtension';
import RouterExtension from './RouterExtension';
import HomeExtension from './HomeExtension';

const Microapp = () => (
  <Provider store={store}>
    <ShellStateCache>
      <PrimaryNavExtension />
      <RouterExtension />
      <HomeExtension />
      {/* TODO: SearchExtension */}
    </ShellStateCache>
  </Provider>
);

export default Microapp;
