import { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import autobind from 'react-autobind';
import { withRouter } from 'react-router-dom';
import { addMenu, removeMenu } from '@infosight/shell-api/lib/PrimaryNav';
import { buildUrl } from '@infosight/elmer/dist/utils/url';
import productInterface from './productInterface';
import { authzSelector } from '../user/reducer';
import { onShellStateUpdate } from '../user/utils';

const ID = process.env.REACT_APP_MICROAPP_ID;

class PrimaryNavExtension extends Component {
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

  getDashboard() {
    const { authz, match } = this.props;
    // Typically, here you would also remove access if the inventory was empty for the current organization
    const options = authz.filter([
      {
        id: ID,
        title: 'Hello World',
        options: authz.filter([
          {
            id: 'sample-1',
            title: 'Sample Page 1',
            url: buildUrl(match.url, `/dashboards/${ID}/page-1`),
          },
          {
            id: 'sample-2',
            title: 'Sample Page 2',
            url: buildUrl(match.url, `/dashboards/${ID}/page-2`),
            access: { userRealm: 'INTERNAL' },
          },
        ]),
      },
    ]);

    return options.length ? options : null;
  }

  getInfrastructure() {
    const { authz, match } = this.props;
    // Typically, here you would also remove access if the inventory was empty for the current organization
    const options = authz.filter([
      {
        id: 'storage/sample',
        title: productInterface.attributes.name,
        options: productInterface.getNavRoutes().map(({ type, route }) => ({
          id: route,
          url: buildUrl(match.url, 'infrastructure', 'storage', 'sample', route),
          title: productInterface.getPluralTitle(type),
          preserveQueries: productInterface.attributes.preserveQueries,
        })),
      },
    ]);

    if (!options.length) {
      return null;
    }

    return options.map(x => ({ tier: 'Storage', options: x }));
  }

  getResources() {
    // eslint-disable-line class-methods-use-this
    return null;
  }

  getSettings() {
    // eslint-disable-line class-methods-use-this
    return null;
  }

  handleUpdate() {
    // eslint-disable-line class-methods-use-this
    // Everything is always here so we can react to changes
    [
      { menuId: 'dashboards', id: ID, content: this.getDashboard() },
      { menuId: 'infrastructure', id: ID, content: this.getInfrastructure() },
      { menuId: 'resources', id: ID, content: this.getResources() },
      { menuId: 'settings', id: ID, content: this.getSettings() },
    ].forEach(extension => {
      if (extension.content) {
        addMenu(extension);
      } else {
        removeMenu(extension);
      }
    });
  }

  render() {
    return null;
  }
}

PrimaryNavExtension.propTypes = {
  match: PropTypes.object.isRequired,
  authz: PropTypes.shape({ filter: PropTypes.func, evaluate: PropTypes.func }).isRequired,
};

const mapStateToProps = state => ({
  authz: authzSelector(state),
});

export default withRouter(connect(mapStateToProps)(PrimaryNavExtension));
