import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch, NavLink, Redirect } from 'react-router-dom';
import ScrollContainer from 'elmer/dist/components/ScrollContainer';
import { StaticBold } from 'elmer/dist/components/StaticBold';
import { SecondaryNavBar, NavItem, Title } from 'elmer/dist/components/SecondaryNavBar';
import { pageBoundaryRouteRenderer } from 'elmer/dist/page';
import { buildUrl } from 'elmer/dist/utils/url';
import OperationalDashboard from '../dashboards/OperationalDashboard';
import ExecutiveDashboard from '../dashboards/ExecutiveDashboard';

const objects = [
    { label: 'Operational', url: 'operational', component: OperationalDashboard, visible: true },
    { label: 'Executive', url: 'executive', component: ExecutiveDashboard, visible: true },
];

const Router = ({ match }) => (
    <ScrollContainer>
        <ScrollContainer.Fixed>
            <SecondaryNavBar>
                <Title name="Hello World" className="align-center" />
                {objects.filter(x => x.visible).map(({ label, url }) => (
                    <NavItem key={url}>
                        <NavLink className="flex-container align-center flex-dir-column" to={buildUrl(match.url, url)}>
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
                <Redirect to={buildUrl(match.url, 'operational')} />
            </Switch>
        </ScrollContainer.Scrollable>
    </ScrollContainer>
);

Router.propTypes = {
    match: PropTypes.object.isRequired,
};

export default Router;
