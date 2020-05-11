import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import VmList from './VmList';
import { fetchVms } from '../../actionCreators';
import { vmsSelector } from '../../reducer';

class VmListContainer extends Component {
  componentDidMount() {
    const { productInterface, scope } = this.props;
    this.props.fetchVms({
      scope: productInterface.convertToGenericQueryScope(scope),
    });
  }

  render() {
    return <VmList {...this.props} />;
  }
}

VmListContainer.propTypes = {
  fetchVms: PropTypes.func.isRequired,

  // Injected by InfrastructurePages
  productInterface: PropTypes.object.isRequired,
  scope: PropTypes.shape({
    type: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
  }),
};

const mapStateToProps = state => ({
  ...vmsSelector(state),
});

const mapDispatchToProps = { fetchVms };

// Useful for testing this component
export const Unwrapped = VmListContainer;

export default connect(mapStateToProps, mapDispatchToProps)(VmListContainer);
