import React from 'react';
import PropTypes from 'prop-types';
import { ClientControlledTable } from '@infosight/elmer/dist/components/Table';
import vmListColumnConfig from './vmListColumnConfig';

const VmList = ({ vms, vmsLoading }) => (
  <ClientControlledTable
    tableId="_VMS"
    data={vms}
    columns={vmListColumnConfig}
    pageSize={20}
    loading={vmsLoading}
    defaultSorted={[
      {
        id: 'name',
        desc: false,
      },
    ]}
  />
);

VmList.propTypes = {
  vms: PropTypes.arrayOf(PropTypes.object),
  vmsLoading: PropTypes.bool,
  vmsLoaded: PropTypes.bool,
};

VmList.defaultProps = {
  vms: [],
  vmsLoading: false,
  vmsLoaded: false,
};

export default VmList;
