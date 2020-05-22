import React from 'react';
import classnames from 'classnames/bind';
import Card from '@infosight/elmer/dist/components/Card';
import ClusterCardHeadline from './ClusterCardHeadline';
import style from './style.module.scss';
import { CARD_BASE_HEIGHT, CARD_ROW_HEIGHT } from '../../constants';
import PropTypes from 'prop-types';

const cx = classnames.bind(style);

const ClusterCards = ({ clusters }) => (
  <div>
    {clusters.map(cluster => {
      // const cardTitleHeadline = <ClusterCardHeadline clusterInfo= cluster.name,  cluster.uuid} />;
      const cardTitleHeadline = `Name: ${cluster.name} uuid: ${cluster.uuid}`;
      const numHostRows = 1;
      const cardHeightStyle = {
        height: CARD_BASE_HEIGHT + CARD_ROW_HEIGHT * numHostRows,
      };
      return (
        <div key={cluster.uuid}>
          <Card className={cx('less-padding')} title={cardTitleHeadline} style={cardHeightStyle} headerClassName="display-block">
            {cluster.name}
          </Card>
        </div>
      );
    })}
    ;
  </div>
);

ClusterCards.propTypes = {
  clusters: PropTypes.arrayOf(PropTypes.object),
};

ClusterCards.defaultProps = {
  clusters: [],
};

export default ClusterCards;
