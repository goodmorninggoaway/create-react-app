import { Component, lazy } from 'react';
import autobind from 'react-autobind';
import { removeRouter, addRouter } from '@infosight/shell-api/lib/Router';
import { buildUrl } from '@infosight/elmer/dist/utils/url';
import { pageBoundaryRouteRenderer } from '@infosight/elmer/dist/page';

const Router = lazy(() => import('./Router'));

class RouterExtension extends Component {
  constructor(props) {
    super(props);
    autobind(this);
  }

  componentDidMount() {
    this.handleUpdate();
  }

  handleUpdate() {
    [
      {
        url: buildUrl('dashboards', process.env.REACT_APP_MICROAPP_ID),
        router: pageBoundaryRouteRenderer(Router),
        exact: false,
        appId: process.env.REACT_APP_MICROAPP_ID,
      },
    ].forEach(extension => {
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
