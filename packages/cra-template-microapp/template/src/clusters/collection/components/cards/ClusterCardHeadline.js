import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames/bind';
import { ObjectCollectionLink } from '@infosight/elmer/dist/infrastructure';
import { OBJECTS } from '../../../../inventory/constants';
import style from './style.module.scss';

const cx = classnames.bind(style);

function ClusterCardHeadline({ clusterInfo }) {
  const overutilizedColor = clusterInfo.overutilizedCount === 0 ? 'green' : 'yellow';
  const overutilizedLabel = clusterInfo.overutilizedCount === 1 ? 'Overutilized Host' : 'Overutilized Hosts';

  return (
    <div>
      <div className="row">
        <div className="small-12 large-12">
          <span className={cx('cluster-name')}>{clusterInfo.clusterName}</span>
        </div>
        <div className={cx('small-12', 'large-12', { invisible: clusterInfo.overutilizedCount < 0 })}>
          <span className={cx('overutilized-num', overutilizedColor)}>{clusterInfo.overutilizedCount}</span>
        </div>
      </div>
      <div className="row">
        <div className="small-12 large-12">
          <ObjectCollectionLink objectType={OBJECTS.HOST} scope={{ type: OBJECTS.CLUSTER, id: clusterInfo.clusterUid.toString() }}>
            {clusterInfo.hostCount} Hosts
          </ObjectCollectionLink>
          <span>&#160;|&#160;</span>
          <ObjectCollectionLink objectType={OBJECTS.VM} scope={{ type: OBJECTS.CLUSTER, id: clusterInfo.clusterUid.toString() }}>
            {clusterInfo.vmCount} VMs
          </ObjectCollectionLink>
        </div>
        <div className={cx('small-12', 'large-12', { invisible: clusterInfo.overutilizedCount < 0 })}>
          <span className={cx('overutilized', overutilizedColor)}>{overutilizedLabel}</span>
        </div>
      </div>
    </div>
  );
}

ClusterCardHeadline.propTypes = {
  clusterInfo: PropTypes.object,
};

export default ClusterCardHeadline;