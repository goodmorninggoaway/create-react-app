import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Switch, NavLink, Redirect, withRouter } from 'react-router-dom';
import ScrollContainer from '@infosight/elmer/dist/components/ScrollContainer';
import { StaticBold } from '@infosight/elmer/dist/components/StaticBold';
import {
  SecondaryNavBar,
  NavItem,
  Title,
} from '@infosight/elmer/dist/components/SecondaryNavBar';
import { pageBoundaryRouteRenderer } from '@infosight/elmer/dist/page';
import { buildUrl } from '@infosight/elmer/dist/utils/url';
import wrapRouter from '../utils/wrapRouter';
import { authzSelector } from '../user/reducer';
import SamplePage1 from '../samples/SamplePage1';
import SamplePage2 from '../samples/SamplePage2';

const objects = [
  {
    label: 'Sample Page 1',
    url: 'page-1',
    component: SamplePage1,
  },
  {
    label: 'Sample Page 2',
    url: 'page-2',
    component: SamplePage2,
    access: { userRealm: 'INTERNAL' },
  },
];

const DashboardsRouter = ({ match, authz }) => (
  <ScrollContainer>
    <ScrollContainer.Fixed>
      <SecondaryNavBar>
        <Title name="Hello World" className="align-center" />
        {authz.filter(objects).map(({ label, url }) => (
          <NavItem key={url}>
            <NavLink
              className="flex-container align-center flex-dir-column"
              to={buildUrl(match.url, url)}
            >
              <StaticBold parent={React.Fragment}>{label}</StaticBold>
            </NavLink>
          </NavItem>
        ))}
      </SecondaryNavBar>
    </ScrollContainer.Fixed>

    <ScrollContainer.Scrollable>
      <Switch>
        {authz.filter(objects).map(({ url, component, label }) => (
          <Route
            key={url}
            path={buildUrl(match.path, url)}
            render={pageBoundaryRouteRenderer(component, label)}
          />
        ))}
        <Redirect to={buildUrl(match.url, 'sample-1')} />
      </Switch>
    </ScrollContainer.Scrollable>
  </ScrollContainer>
);

DashboardsRouter.propTypes = {
  match: PropTypes.object.isRequired,
  authz: PropTypes.shape({ filter: PropTypes.func, evaluate: PropTypes.func })
    .isRequired,
};

const mapStateToProps = state => ({
  authz: authzSelector(state),
});

export default wrapRouter(
  withRouter(connect(mapStateToProps)(DashboardsRouter))
);
