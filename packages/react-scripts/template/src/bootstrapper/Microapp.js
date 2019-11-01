import React from 'react';
import { Provider } from 'react-redux';
import getStore from '../utils/getStore';
import ShellStateCache from './ShellStateCache';
import PrimaryNavExtension from './PrimaryNavExtension';
import RouterExtension from './RouterExtension';
import HomeExtension from './HomeExtension';

const Microapp = () => (
  <Provider store={getStore()}>
    <ShellStateCache>
      <PrimaryNavExtension />
      <RouterExtension />
      <HomeExtension />
      {/* TODO: SearchExtension */}
    </ShellStateCache>
  </Provider>
);

export default Microapp;
