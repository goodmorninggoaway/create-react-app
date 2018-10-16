import React from 'react';
import { Provider } from 'react-redux';
import getStore from '../utils/getStore';
import PrimaryNavExtension from './PrimaryNavExtension';
import RouterExtension from './RouterExtension';
import ShellStateCache from './ShellStateCache';

const Application = () => (
  <Provider store={getStore()}>
    <ShellStateCache>
      <PrimaryNavExtension />
      <RouterExtension />
    </ShellStateCache>
  </Provider>
);

export default Application;
