import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames/bind';
import { ObjectDetailLink } from '@infosight/elmer/dist/infrastructure';
import { OBJECTS } from '../../../../inventory/constants';
import style from './style.module.scss';

const cx = classnames.bind(style);

function ClusterCardHeadline({ clusterInfo }) {
  return (
    <div>
      <div className="row">
        <div className="small-12 large-12">
          <span className={cx('cluster-name')}>
            <ObjectDetailLink name={clusterInfo.name} uuid={clusterInfo.uuid} objectType={OBJECTS.CLUSTER} />
          </span>
        </div>
      </div>
    </div>
  );
}

ClusterCardHeadline.propTypes = {
  clusterInfo: PropTypes.object,
};

export default ClusterCardHeadline;
