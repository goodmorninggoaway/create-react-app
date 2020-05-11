import { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import autobind from 'react-autobind';
import { onUserContextChange } from '@infosight/shell-api/lib/UserProfile';
import { loadTenant, loadUser, loadExperimental, changeUserContext } from '../user/actionCreators';
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
class ShellStateCache extends Component {
  constructor(props) {
    super(props);
    autobind(this);

    this.state = { loaded: false };
  }

  async componentDidMount() {
    this.getShellState();
    this.unsubscribe = onUserContextChange(this.handleUpdate);
  }

  componentWillUnmount() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }

  getShellState() {
    Promise.all([this.props.loadTenant(), this.props.loadUser(), this.props.loadExperimental()]).then(() => {
      this.setState({ loaded: true }, triggerShellStateUpdated);
    });
  }

  handleUpdate(reason) {
    // First, trigger all the reducers that need to reset when the tenant changes
    this.props.changeUserContext(reason);

    // Then update cached state.
    this.getShellState(reason);
  }

  render() {
    // If the data is not loaded, don't render children. This prevents us from attempting to use some state before it is defined.
    if (!this.state.loaded) {
      return null;
    }

    return this.props.children;
  }
}

ShellStateCache.propTypes = {
  children: PropTypes.node.isRequired,
  changeUserContext: PropTypes.func.isRequired,
  loadTenant: PropTypes.func.isRequired,
  loadUser: PropTypes.func.isRequired,
  loadExperimental: PropTypes.func.isRequired,
};

const mapStateToProps = () => ({});

export default connect(mapStateToProps, { changeUserContext, loadTenant, loadUser, loadExperimental })(ShellStateCache);
