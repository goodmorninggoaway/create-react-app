import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import HostList from './HostList';
import { fetchHosts } from '../../actionCreators';
import { hostsSelector } from '../../reducer';

class HostListContainer extends Component {
  componentDidMount() {
    this.props.fetchHosts();
  }

  render() {
    return <HostList {...this.props} />;
  }
}

HostListContainer.propTypes = {
  fetchHosts: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  ...hostsSelector(state),
});

const mapDispatchToProps = { fetchHosts };

// Useful for testing this component
export const Unwrapped = HostListContainer;

export default connect(mapStateToProps, mapDispatchToProps)(HostListContainer);
