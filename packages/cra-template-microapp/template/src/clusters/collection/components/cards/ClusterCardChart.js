import PropTypes from 'prop-types';
import React from 'react';
import numeral from 'numeral';
import classnames from 'classnames/bind';
import { NoData } from '@infosight/elmer/dist/components/NoData';
import { Progress } from '@infosight/elmer/dist/components/Progress';
import { IconAdaptor } from '@infosight/elmer/dist/components/IconAdaptor';
import { ObjectDetailLink } from '@infosight/elmer/dist/infrastructure';
import style from './style.module.scss';
import { OBJECTS } from '../../../../inventory/constants';

const cx = classnames.bind(style);

const ClusterCardChart = ({ hostsByCluster }) => {
  return (
    <NoData hasData={hostsByCluster} message="No hosts available.">
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
              <th className={cx('col-center')}>CPU Percentage</th>
            </tr>
          </thead>
          <tbody>
            {hostsByCluster.map(host => {
              const { hostId, hostname, cpuUsagePct } = host;
              return (
                <tr key={hostId}>
                  <td className={cx('large-column', 'align-justify', 'ellipse-no-overflow')}>
                    <ObjectDetailLink className={cx('hostname-align')} name={hostname} id={hostId.toString()} objectType={OBJECTS.HOST} includeIcon={false} />
                  </td>
                  <td>
                    <Progress
                      title={numeral(cpuUsagePct / 100).format('0%')}
                      className={cpuUsagePct >= 80 ? 'danger' : null}
                      min={0}
                      max={100}
                      value={cpuUsagePct}
                    />
                  </td>
                </tr>
              );
            })}
            <tr>
              <td />
              <td>
                <div className={classnames('flex-container', 'align-justify', cx('border-line'))}>
                  <span>&#160;</span>
                  <span>&#160;</span>
                </div>
                <div className={classnames('flex-container', 'align-justify')}>
                  <span>0%</span>
                  <span>100%</span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </NoData>
  );
};

ClusterCardChart.propTypes = {
  hostsByCluster: PropTypes.arrayOf(PropTypes.object),
};

export default ClusterCardChart;
