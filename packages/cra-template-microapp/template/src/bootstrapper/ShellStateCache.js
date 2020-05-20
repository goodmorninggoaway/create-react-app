import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { onUserContextChange } from '@infosight/shell-api/lib/UserProfile';
import {
  changeUserContext as changeUserContextActionCreator,
  loadTenant as loadTenantActionCreator,
  loadUser as loadUserActionCreator,
  loadExperimental as loadExperimentalActionCreator,
} from '../user/actionCreators';
import { triggerShellStateUpdated } from '../user/utils';

/**
 * This maintains references to Shell data so that:
 * 1. You don't need to have Shell API references throughout the code
 * 2. You don't have to make everything async to get data from the shell, since it will be synchronously available via redux
 * 3. You can use certain values without littering code with null checks, since this guarantees the requested data will be available.
 *
 * You should use generally use this technique only for state that is static or rarely changes.
 * For dynamic state, strongly prefer making the consuming code async and fetching it directly from the Shell.
 */
const ShellStateCache = ({ changeUserContext, children, loadTenant, loadUser, loadExperimental }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const getShellState = () => {
      Promise.all([loadTenant(), loadUser(), loadExperimental()]).then(() => {
        setLoaded(true);
        triggerShellStateUpdated();
      });
    };

    const handleUpdate = reason => {
      // First, trigger all the reducers that need to reset when the tenant changes
      changeUserContext(reason);

      // Then update cached state.
      getShellState(reason);
    };

    getShellState();
    return onUserContextChange(handleUpdate);
  }, [changeUserContext, loadTenant, loadUser, loadExperimental]);

  // If the data is not loaded, don't render children. This prevents us from attempting to use some state before it is defined.
  if (!loaded) {
    return null;
  }

  return children;
};

ShellStateCache.propTypes = {
  children: PropTypes.node.isRequired,
  changeUserContext: PropTypes.func.isRequired,
  loadTenant: PropTypes.func.isRequired,
  loadUser: PropTypes.func.isRequired,
  loadExperimental: PropTypes.func.isRequired,
};

const mapStateToProps = () => ({});

const mapDispatchToProps = {
  changeUserContext: changeUserContextActionCreator,
  loadTenant: loadTenantActionCreator,
  loadUser: loadUserActionCreator,
  loadExperimental: loadExperimentalActionCreator,
};

export default connect(mapStateToProps, mapDispatchToProps)(ShellStateCache);
