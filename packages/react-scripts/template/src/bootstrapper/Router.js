import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch, NavLink, Redirect } from 'react-router-dom';
import ScrollContainer from '@infosight/elmer/dist/components/ScrollContainer';
import { StaticBold } from '@infosight/elmer/dist/components/StaticBold';
import {
  SecondaryNavBar,
  NavItem,
  Title,
} from '@infosight/elmer/dist/components/SecondaryNavBar';
import { pageBoundaryRouteRenderer } from '@infosight/elmer/dist/page';
import { buildUrl } from '@infosight/elmer/dist/utils/url';
import SamplePage1 from '../samples/SamplePage1';
import SamplePage2 from '../samples/SamplePage2';

const objects = [
  {
    label: 'Sample Page 1',
    url: 'page-1',
    component: SamplePage1,
    visible: true,
  },
  {
    label: 'Sample Page 2',
    url: 'page-2',
    component: SamplePage2,
    visible: true,
  },
];

const Router = ({ match }) => (
  <ScrollContainer>
    <ScrollContainer.Fixed>
      <SecondaryNavBar>
        <Title name="Hello World" className="align-center" />
        {objects
          .filter(x => x.visible)
          .map(({ label, url }) => (
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
        {objects.map(({ url, component, label }) => (
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

Router.propTypes = {
  match: PropTypes.object.isRequired,
};

export default Router;
