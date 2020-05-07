import { Component, lazy } from 'react';
import autobind from 'react-autobind';
import { removeRouter, addRouter } from '@infosight/shell-api/lib/Router';
import { buildUrl } from '@infosight/elmer/dist/utils/url';
import { pageBoundaryRouteRenderer } from '@infosight/elmer/dist/page';
import { onShellStateUpdate } from '../user/utils';

const InfrastructureRouter = lazy(() => import('./InfrastructureRouter'));
const DashboardsRouter = lazy(() => import('./DashboardsRouter'));

const ID = process.env.REACT_APP_MICROAPP_ID;

class RouterExtension extends Component {
  // eslint-disable-line react/no-multi-comp
  constructor(props) {
    super(props);
    autobind(this);
  }

  componentDidMount() {
    this.handleUpdate();
    this.unsubscribe = onShellStateUpdate(this.handleUpdate);
  }

  componentWillUnmount() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }

  handleUpdate() {
    // eslint-disable-line class-methods-use-this
    // Everything is always here so we can react to changes
    [
      {
        url: buildUrl('dashboards', ID),
        router: pageBoundaryRouteRenderer(DashboardsRouter),
        exact: false,
        appId: ID,
      },
      {
        url: buildUrl('infrastructure', 'storage', ID),
        router: pageBoundaryRouteRenderer(InfrastructureRouter),
        exact: false,
        appId: ID,
      },
      { url: buildUrl('resources', ID), router: null, exact: false, appId: ID },
      { url: buildUrl('settings', ID), router: null, exact: false, appId: ID },
    ].forEach(extension => {
      if (extension.router) {
        addRouter(extension);
      } else {
        removeRouter(extension);
      }
    });
  }

  render() {
    return null;
  }
}

export default RouterExtension;
