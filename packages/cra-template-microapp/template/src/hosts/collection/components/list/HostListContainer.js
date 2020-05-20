import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import HostList from './HostList';
import { fetchHosts as fetchHostsActionCreator } from '../../actionCreators';
import { hostsSelector } from '../../reducer';

const HostListContainer = props => {
  const { fetchHosts } = props;
  useEffect(() => {
    fetchHosts();
  }, [fetchHosts]);

  return <HostList {...props} />;
};

HostListContainer.propTypes = {
  fetchHosts: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  ...hostsSelector(state),
});

const mapDispatchToProps = { fetchHosts: fetchHostsActionCreator };

// Useful for testing this component
export const Unwrapped = HostListContainer;

export default connect(mapStateToProps, mapDispatchToProps)(HostListContainer);
