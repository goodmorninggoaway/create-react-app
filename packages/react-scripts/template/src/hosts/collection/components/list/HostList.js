import React from 'react';
import PropTypes from 'prop-types';
import { ClientControlledTable } from '@infosight/elmer/dist/components/Table';
import hostListColumnConfig from './hostListColumnConfig';

const HostList = ({ hosts, hostsLoading }) => (
  <ClientControlledTable
    tableId="_HOSTS"
    data={hosts}
    columns={hostListColumnConfig}
    pageSize={20}
    loading={hostsLoading}
    defaultSorted={[
      {
        id: 'name',
        desc: false,
      },
    ]}
    ignoreme={console.log('Rendering HostList')}
  />
);

HostList.propTypes = {
  hosts: PropTypes.arrayOf(PropTypes.object),
  hostsLoading: PropTypes.bool,
  hostsLoaded: PropTypes.bool,
};

HostList.defaultProps = {
  hosts: [],
  hostsLoading: false,
  hostsLoaded: false,
};

export default HostList;
