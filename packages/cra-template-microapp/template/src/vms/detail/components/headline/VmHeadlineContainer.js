import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Async } from '@infosight/elmer/dist/components/Async';
import VmHeadline from './VmHeadline';
import { fetchVm } from '../../actionCreators';
import { vmSelector } from '../../reducer';

class VmHeadlineContainer extends Component {
  componentDidMount() {
    // Gets vm details by id
    this.props.fetchVm(this.props.vmId);
  }

  render() {
    const { loadingVm } = this.props;
    return (
      <Async loading={loadingVm}>
        <VmHeadline {...this.props} />
      </Async>
    );
  }
}

VmHeadlineContainer.propTypes = {
  vmId: PropTypes.string.isRequired,
  loadingVm: PropTypes.bool.isRequired,
  fetchVm: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  ...vmSelector(state),
});

const mapDispatchToProps = { fetchVm };

// Useful for testing this component
export const Unwrapped = VmHeadlineContainer;

export default connect(mapStateToProps, mapDispatchToProps)(VmHeadlineContainer);
