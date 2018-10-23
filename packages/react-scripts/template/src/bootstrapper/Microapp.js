import React from 'react';
import { Provider } from 'react-redux';
import getStore from '../utils/getStore';
import PrimaryNavExtension from './PrimaryNavExtension';
import RouterExtension from './RouterExtension';

const Microapp = () => (
  <Provider store={getStore()}>
      <PrimaryNavExtension />
      <RouterExtension />
  </Provider>
);

export default Microapp;
