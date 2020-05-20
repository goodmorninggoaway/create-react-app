import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Async } from '@infosight/elmer/dist/components/Async';
import VmHeadline from './VmHeadline';
import { fetchVm as fetchVmActionCreator } from '../../actionCreators';
import { vmSelector } from '../../reducer';

const VmHeadlineContainer = props => {
  const { fetchVm, vmId, loadingVm } = props;

  useEffect(() => {
    // Gets vm details by id
    fetchVm(vmId);
  }, [fetchVm, vmId]);

  return (
    <Async loading={loadingVm}>
      <VmHeadline {...props} />
    </Async>
  );
};

VmHeadlineContainer.propTypes = {
  vmId: PropTypes.string.isRequired,
  loadingVm: PropTypes.bool.isRequired,
  fetchVm: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  ...vmSelector(state),
});

const mapDispatchToProps = { fetchVm: fetchVmActionCreator };

// Useful for testing this component
export const Unwrapped = VmHeadlineContainer;

export default connect(mapStateToProps, mapDispatchToProps)(VmHeadlineContainer);
