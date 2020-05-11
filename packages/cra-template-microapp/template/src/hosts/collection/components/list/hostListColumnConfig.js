import React from 'react';

import { ObjectDetailLink } from '@infosight/elmer/dist/infrastructure';
import { OBJECTS } from '../../../../inventory/constants';
import { COLUMN_WIDTHS } from '@infosight/elmer/dist/components/Table';

// Configuration object for hosts table
const hostListColumnConfig = [
  {
    Header: 'Serial Number',
    accessor: 'serialNumber',
    minWidth: COLUMN_WIDTHS.SMALL,
  },
  {
    Header: 'Name',
    accessor: 'name',
    sortable: true,
    filterable: true,
    Cell: cellInfo => <ObjectDetailLink objectType={OBJECTS.HOST} id={cellInfo.original.id} name={cellInfo.original.name} />,
  },
  {
    Header: 'Model',
    accessor: 'model',
    filterable: true,
    sortable: true,
  },
];

export default hostListColumnConfig;
