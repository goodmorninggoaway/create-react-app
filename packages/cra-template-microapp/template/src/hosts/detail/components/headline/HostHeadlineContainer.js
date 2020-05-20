import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Async } from '@infosight/elmer/dist/components/Async';
import HostHeadline from './HostHeadline';
import { fetchHost } from '../../actionCreators';
import { hostSelector } from '../../reducer';

const HostHeadlineContainer = props => {
  const { fetchHost, hostId, loadingHost } = props;
  useEffect(() => {
    // Gets host details by id
    fetchHost(hostId);
  }, [fetchHost, hostId]);

  return (
    <Async loading={loadingHost}>
      <HostHeadline {...props} />
    </Async>
  );
};

HostHeadlineContainer.propTypes = {
  hostId: PropTypes.string.isRequired,
  loadingHost: PropTypes.bool.isRequired,
  fetchHost: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  ...hostSelector(state),
});

const mapDispatchToProps = { fetchHost };

// Useful for testing this component
export const Unwrapped = HostHeadlineContainer;

export default connect(mapStateToProps, mapDispatchToProps)(HostHeadlineContainer);
