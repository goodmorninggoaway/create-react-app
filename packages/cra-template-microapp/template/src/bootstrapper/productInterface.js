import React from 'react';
import { IconAdaptor } from '@infosight/elmer/dist/components/IconAdaptor';
import { ProductInterface, VIEW_TYPES } from '@infosight/elmer/dist/infrastructure';
import { findObject, getObjectTopology } from '../inventory/reducer';
import { OBJECTS } from '../inventory/constants';
import HostListContainer from '../hosts/collection/components/list/HostListContainer';
import HostDetailContainer from '../hosts/detail/components/HostDetailContainer';
import VmListContainer from '../vms/collection/components/list/VmListContainer';
import VmDetailContainer from '../vms/detail/components/VmDetailContainer';
import ClusterCardsContainer from '../clusters/collection/components/cards/ClusterCardsContainer';

const { CARD, TABLE } = VIEW_TYPES;
const { HOST, VM, CLUSTER } = OBJECTS;
const NOT_SCOPED = null;

// Configuration object for Infrastructure pages
const config = {
  id: 'SAMPLE',
  name: 'Sample Infra',
  rootPath: '/infrastructure/storage/sample',
  forceRootPath: false,
  category: 'storage',
  objects: [
    {
      type: HOST,
      singularName: 'Host',
      pluralName: 'Hosts',
      isScopingObject: true,
      isLeafObject: false,
      isLazyLoaded: false,
      genericQueryType: 'host',
      icon: props => (
        // we prefer grommet or font awesome icons for anything that is not vmware related
        <IconAdaptor {...props} type="clarity">
          <clr-icon shape="host" />
        </IconAdaptor>
      ),
      routeSegment: 'hosts',
      includeInNav: true,
      collectionViews: [
        {
          id: 'list',
          name: 'Host List',
          category: TABLE,
          component: HostListContainer,
          scopingObjectTypes: null,
          invisible: false,
          isDefault: true,
          requireScope: false,
        },
      ],
      detailView: {
        component: HostDetailContainer,
        invisible: false,
      },
    },
    {
      type: VM,
      singularName: 'Virtual Machine',
      pluralName: 'Virtual Machines',
      isScopingObject: true,
      isLeafObject: false,
      isLazyLoaded: false,
      genericQueryType: 'vm',
      icon: props => (
        // we prefer grommet or font awesome icons for anything that is not vmware related
        <IconAdaptor {...props} type="clarity">
          <clr-icon shape="vm" />
        </IconAdaptor>
      ),
      routeSegment: 'vms',
      includeInNav: true,
      collectionViews: [
        {
          id: 'list',
          name: 'Virtual Machine List',
          category: TABLE,
          component: VmListContainer,
          scopingObjectTypes: [HOST, NOT_SCOPED],
          invisible: false,
          isDefault: true,
          requireScope: false,
        },
      ],
      detailView: {
        component: VmDetailContainer,
        invisible: false,
      },
    },
    {
      type: CLUSTER,
      singularName: 'Cluster',
      pluralName: 'Clusters',
      isScopingObject: true,
      isLeafObject: false,
      isLazyLoaded: false,
      genericQueryType: 'vm',
      icon: props => (
        // we prefer grommet or font awesome icons for anything that is not vmware related
        <IconAdaptor {...props} type="clarity">
          <clr-icon shape="cluster" />
        </IconAdaptor>
      ),
      routeSegment: 'clusters',
      includeInNav: true,
      collectionViews: [
        {
          id: 'list',
          name: 'Cluster List',
          category: CARD,
          component: ClusterCardsContainer,
          scopingObjectTypes: null,
          invisible: false,
          isDefault: true,
          requireScope: false,
        },
      ],
    },
  ],
  topology: {
    getObjectTopology,
    findObject,
  },
};

export default new ProductInterface(config);
