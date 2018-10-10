import React, { Component } from 'react';
import autobind from 'react-autobind';
import { Provider } from 'react-redux';
import { removeRouter, addRouter } from '@infosight/shell-api/lib/Router';
import { ThemeProvider } from 'elmer/dist/components/ThemeProvider';
import { buildUrl } from 'elmer/dist/utils/url';
import WellnessRouter from './WellnessRouter';
import getStore from '../utils/getStore';
import { AuthorizationEvaluator } from '../user/utils';

function connectRedux(WrappedComponent) {
  return props => (
    <Provider store={getStore()}>
      <ThemeProvider>
        <WrappedComponent {...props} />
      </ThemeProvider>
    </Provider>
  );
}

class RouterExtension extends Component {
  constructor(props) {
    super(props);
    autobind(this);
  }

  componentDidMount() {
    this.handleUpdate();
  }

  handleUpdate() {
    AuthorizationEvaluator.filter([
      {
        url: buildUrl('newwellness'),
        router: connectRedux(WellnessRouter),
        exact: false,
        appId: 'wellness',
      },
    ]).forEach(extension => {
      if (extension.router) {
        addRouter(extension);
      } else {
        removeRouter(extension);
      }
    });
  }

  // Always return null
  render() {
    return null;
  }
}

export default RouterExtension;
