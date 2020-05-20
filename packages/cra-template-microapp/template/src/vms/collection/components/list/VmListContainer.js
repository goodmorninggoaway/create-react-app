import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import VmList from './VmList';
import { fetchVms as fetchVmsActionCreator } from '../../actionCreators';
import { vmsSelector } from '../../reducer';

const VmListContainer = props => {
  const { fetchVms, productInterface, scope } = props;
  useEffect(() => {
    fetchVms({
      scope: productInterface.convertToGenericQueryScope(scope),
    });
  }, [fetchVms, productInterface, scope]);

  return <VmList {...props} />;
};

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

const mapDispatchToProps = { fetchVms: fetchVmsActionCreator };

// Useful for testing this component
export const Unwrapped = VmListContainer;

export default connect(mapStateToProps, mapDispatchToProps)(VmListContainer);
