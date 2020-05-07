// (C) Copyright 2018 Hewlett Packard Enterprise Development LP

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Async } from '@infosight/elmer/dist/components/Async';
import HostHeadline from './HostHeadline';
import { fetchHost } from '../../actionCreators';
import { hostSelector } from '../../reducer';

class HostHeadlineContainer extends Component {
  componentDidMount() {
    // Gets host details by id
    this.props.fetchHost(this.props.hostId);
  }

  render() {
    const { loadingHost } = this.props;
    return (
      <Async loading={loadingHost}>
        <HostHeadline {...this.props} />
      </Async>
    );
  }
}

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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HostHeadlineContainer);
