import React from 'react';
import numeral from 'numeral';
import { ObjectDetailLink } from '@infosight/elmer/dist/infrastructure';
import { COLUMN_WIDTHS } from '@infosight/elmer/dist/components/Table';
import { OBJECTS } from '../../../../inventory/constants';

// Configuration object for vms table
const vmListColumnConfig = [
  {
    Header: 'Name',
    accessor: 'name',
    sortable: true,
    filterable: true,
    Cell: cellInfo => <ObjectDetailLink objectType={OBJECTS.VM} id={cellInfo.original.id} name={cellInfo.original.name} />,
  },
  {
    Header: 'Host',
    accessor: 'hostName',
    sortable: true,
    filterable: true,
    Cell: cellInfo => <ObjectDetailLink objectType={OBJECTS.HOST} id={cellInfo.original.hostId} name={cellInfo.original.hostName} includeIcon={false} />,
  },
  {
    Header: 'Performance (past 24 hours)',
    headerClassName: 'text-center',
    columns: [
      {
        Header: 'IOPS Avg',
        headerClassName: 'text-right',
        accessor: 'iopsAvg',
        className: 'text-right',
        minWidth: COLUMN_WIDTHS.SMALL,
        Cell: ({ value }) => `${numeral(value).format('0,0.0')} IO/sec`,
      },
      {
        Header: 'Latency Avg',
        headerClassName: 'text-right',
        accessor: 'latencyAvgMs',
        className: 'text-right',
        minWidth: COLUMN_WIDTHS.SMALL,
        Cell: ({ value }) => `${numeral(value).format('0,0.0')} ms`,
      },
      {
        Header: 'Latency Max',
        headerClassName: 'text-right',
        accessor: 'latencyMaxMs',
        className: 'text-right',
        minWidth: COLUMN_WIDTHS.SMALL,
        Cell: ({ value }) => `${numeral(value).format('0,0.0')} ms`,
      },
    ],
  },
];

export default vmListColumnConfig;
