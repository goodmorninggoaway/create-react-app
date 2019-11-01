import { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import autobind from 'react-autobind';
import { withRouter } from 'react-router-dom';
import { addHome } from '@infosight/shell-api/lib/Home';
import { buildUrl } from '@infosight/elmer/dist/utils/url';
import { authzSelector } from '../user/reducer';


class HomeExtension extends Component {
  constructor(props) {
    super(props);
    autobind(this);
  }

  componentDidMount() {
    this.handleUpdate();
  }

  componentDidUpdate() {
    this.handleUpdate();
  }

  handleUpdate() { // eslint-disable-line class-methods-use-this
    const { authz, match } = this.props;
    addHome({
      id: process.env.REACT_APP_MICROAPP_ID,
      pages: authz.filter([
        {
          title: 'Sample Home',
          url: buildUrl(match.url, `/dashboards/${process.env.REACT_APP_MICROAPP_ID}/page-1`),
          access: true,
        },
      ]),
    });
  }

  render() {
    return null;
  }
}

HomeExtension.propTypes = {
  match: PropTypes.object.isRequired,
  authz: PropTypes.shape({ filter: PropTypes.func, evaluate: PropTypes.func }).isRequired,
};

const mapStateToProps = state => ({
  authz: authzSelector(state),
});

export default withRouter(connect(mapStateToProps)(HomeExtension));
