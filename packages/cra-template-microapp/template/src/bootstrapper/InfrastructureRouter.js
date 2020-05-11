import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Async from '@infosight/elmer/dist/components/Async';
import NoData from '@infosight/elmer/dist/components/NoData';
import { InfrastructurePages } from '@infosight/elmer/dist/infrastructure';
import { fetchInventory, reset } from '../inventory/actionCreators';
import wrapRouter from '../utils/wrapRouter';
import { inventorySelector } from '../inventory/reducer';
import productInterface from './productInterface'; // eslint-disable-line import/no-named-as-default

class InfrastructureRouter extends Component {
  componentDidMount() {
    const { loadedObjects, loadingObjects } = this.props;
    if (!loadedObjects && !loadingObjects) {
      this.props.fetchInventory();
    }
  }

  render() {
    const { loadedObjects, loadingObjects } = this.props;
    return (
      <Async loading={loadingObjects}>
        <NoData hasData={loadedObjects}>{() => <InfrastructurePages productInterface={productInterface} />}</NoData>
      </Async>
    );
  }
}

InfrastructureRouter.propTypes = {
  fetchInventory: PropTypes.func.isRequired,
  loadingObjects: PropTypes.bool,
  loadedObjects: PropTypes.bool,
};

const mapStateToProps = state => ({
  ...inventorySelector(state),
});

const mapDispatchToProps = { fetchInventory, resetInventory: reset };

export default wrapRouter(connect(mapStateToProps, mapDispatchToProps)(InfrastructureRouter));
