import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames/bind';
import { IconAdaptor } from '@infosight/elmer/dist/components/IconAdaptor';
import { ObjectDetailLink } from '@infosight/elmer/dist/infrastructure';
import style from './style.module.scss';
import { OBJECTS } from '../../../../inventory/constants';

const cx = classnames.bind(style);

const ClusterCardBody = ({ hostsByCluster }) => {
  if (hostsByCluster) {
    return (
      <div className={cx('elmer-grid-view', 'cluster-card-table')}>
        <table className={cx('no-border')}>
          <thead>
            <tr>
              <th className={cx('col-center')}>
                <IconAdaptor type="clarity">
                  <clr-icon shape="host" />
                </IconAdaptor>
                <span> Host</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {hostsByCluster.map(host => {
              const { hostId, hostname } = host;
              return (
                <tr key={hostId}>
                  <td className={cx('large-column', 'align-justify', 'ellipse-no-overflow')}>
                    <ObjectDetailLink className={cx('hostname-align')} name={hostname} id={hostId.toString()} objectType={OBJECTS.HOST} includeIcon={false} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
  return (
    <div className={classnames('flex-container', 'align-justify')}>
      <span>No hosts available.</span>
    </div>
  );
};

ClusterCardBody.propTypes = {
  hostsByCluster: PropTypes.arrayOf(PropTypes.object),
};

export default ClusterCardBody;
