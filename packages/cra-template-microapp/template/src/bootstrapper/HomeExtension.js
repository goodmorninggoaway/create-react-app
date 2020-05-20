import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { addHome } from '@infosight/shell-api/lib/Home';
import { buildUrl } from '@infosight/elmer/dist/utils/url';
import { authzSelector } from '../user/reducer';
import { onShellStateUpdate } from '../user/utils';

const ID = process.env.REACT_APP_MICROAPP_ID;

const HomeExtension = ({ authz, match }) => {
  useEffect(() => {
    const handleUpdate = () => {
      addHome({
        id: ID,
        pages: authz.filter([
          {
            title: 'Sample Home',
            url: buildUrl(match.url, `/dashboards/${ID}/page-1`),
            access: true,
          },
        ]),
      });
    };
    handleUpdate();
    return onShellStateUpdate(handleUpdate);
  }, [authz, match.url]);

  return null;
};

HomeExtension.propTypes = {
  match: PropTypes.object.isRequired,
  authz: PropTypes.shape({ filter: PropTypes.func, evaluate: PropTypes.func }).isRequired,
};

const mapStateToProps = state => ({
  authz: authzSelector(state),
});

export default withRouter(connect(mapStateToProps)(HomeExtension));
