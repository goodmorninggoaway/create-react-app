import { useEffect, lazy } from 'react';
import { removeRouter, addRouter } from '@infosight/shell-api/lib/Router';
import { buildUrl } from '@infosight/elmer/dist/utils/url';
import { pageBoundaryRouteRenderer } from '@infosight/elmer/dist/page';
import { onShellStateUpdate } from '../user/utils';

const InfrastructureRouter = lazy(() => import('./InfrastructureRouter'));
const DashboardsRouter = lazy(() => import('./DashboardsRouter'));

const ID = process.env.REACT_APP_MICROAPP_ID;

const RouterExtension = () => {
  useEffect(() => {
    const handleUpdate = () => {
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
    };

    handleUpdate();

    // returns unsubscribe function
    return onShellStateUpdate(handleUpdate);
  }, []);

  return null;
};

export default RouterExtension;
