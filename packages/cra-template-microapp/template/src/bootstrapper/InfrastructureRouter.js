import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Async from '@infosight/elmer/dist/components/Async';
import NoData from '@infosight/elmer/dist/components/NoData';
import { InfrastructurePages } from '@infosight/elmer/dist/infrastructure';
import { fetchInventory as fetchInventoryActionCreator } from '../inventory/actionCreators';
import wrapRouter from '../utils/wrapRouter';
import { inventorySelector } from '../inventory/reducer';
import productInterface from './productInterface'; // eslint-disable-line import/no-named-as-default

const InfrastructureRouter = ({ fetchInventory, loadedObjects, loadingObjects }) => {
  useEffect(() => {
    if (!loadedObjects && !loadingObjects) {
      fetchInventory();
    }
  }, [fetchInventory, loadedObjects, loadingObjects]);

  return (
    <Async loading={loadingObjects}>
      <NoData hasData={loadedObjects}>{() => <InfrastructurePages productInterface={productInterface} />}</NoData>
    </Async>
  );
};

InfrastructureRouter.propTypes = {
  fetchInventory: PropTypes.func.isRequired,
  loadingObjects: PropTypes.bool,
  loadedObjects: PropTypes.bool,
};

const mapStateToProps = state => ({
  ...inventorySelector(state),
});

const mapDispatchToProps = { fetchInventory: fetchInventoryActionCreator };

export default wrapRouter(connect(mapStateToProps, mapDispatchToProps)(InfrastructureRouter));
