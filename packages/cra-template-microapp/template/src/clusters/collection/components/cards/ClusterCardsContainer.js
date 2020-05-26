import React, { Component } from 'react';
import { connect } from 'react-redux';
import autobind from 'react-autobind';
import classnames from 'classnames/bind';
import { clustersSelector } from '../../reducer';
import PropTypes from 'prop-types';
import { fetchClusterCards, reset } from '../../actionCreator';
import Async from '@infosight/elmer/dist/components/Async';
import { NoData } from '@infosight/elmer/dist/components/NoData';
import Card from '@infosight/elmer/dist/components/Card';
import Pagination from '@infosight/elmer/dist/components/Pagination';
import ClusterCardChart from './ClusterCardChart';
import ClusterCardHeadline from './ClusterCardHeadline';
import style from './style.module.scss';
import { CARD_BASE_HEIGHT, CARD_ROW_HEIGHT, MAX_NUM_HOST_ROWS } from '../../constants';

const cx = classnames.bind(style);

class ClusterCardsContainer extends Component {
  constructor(props) {
    super(props);
    autobind(this);
    this.state = { start: 0 };
  }

  componentDidMount() {
    this.fetchData();
  }

  componentWillUnmount() {
    this.props.reset();
  }

  fetchData() {
    this.props.fetchClusterCards();
  }

  makeSortedCards(clustersSummaryData, isLoading) {
    return (
      <Async loading={isLoading}>
        <NoData hasData={clustersSummaryData && clustersSummaryData.clusters && clustersSummaryData.clusters.length > 0}>
          {() => {
            const PAGE_SIZE = clustersSummaryData.hostsInClusters;

            return (
              <div className="row expanded">
                {clustersSummaryData.clusters.slice(this.state.start, this.state.start + PAGE_SIZE).map(cluster => {
                  const cardTitleHeadline = <ClusterCardHeadline clusterInfo={cluster.clusterInfo} />;

                  const numHostRows = Math.min(MAX_NUM_HOST_ROWS, cluster.maxHostCount);
                  const cardHeightStyle = {
                    height: CARD_BASE_HEIGHT + CARD_ROW_HEIGHT * numHostRows,
                  };
                  return (
                    <div key={`${cluster.clusterInfo.virtualCenterUid}-${cluster.clusterInfo.clusterUid}`} className="column small-12 large-8">
                      <Card className={cx('less-padding')} title={cardTitleHeadline} style={cardHeightStyle} headerClassName="display-block">
                        <ClusterCardChart hostsByCluster={cluster.hostsByCluster ? cluster.hostsByCluster.slice(0, numHostRows) : null} />
                      </Card>
                    </div>
                  );
                })}
                <Pagination
                  className={cx('pagination-margin', 'flex-container', 'align-right')}
                  itemCount={clustersSummaryData.clusters.length}
                  dataOffset={this.state.start}
                  numberPerPage={PAGE_SIZE}
                  onPageSelect={({ dataOffset }) => {
                    this.setState({ start: dataOffset });
                  }}
                />
              </div>
            );
          }}
        </NoData>
      </Async>
    );
  }

  render() {
    const { loadingClustersSummary, loadedClustersSummary, clustersSummary } = this.props;

    const clusterCards = this.makeSortedCards(clustersSummary, loadingClustersSummary || !loadedClustersSummary);

    return <div>{clusterCards}</div>;
  }
}

ClusterCardsContainer.propTypes = {
  reset: PropTypes.func.isRequired,
  loadingClustersSummary: PropTypes.bool.isRequired,
  loadedClustersSummary: PropTypes.bool.isRequired,
  fetchClusterCards: PropTypes.func.isRequired,
  clustersSummary: PropTypes.shape({
    clusters: PropTypes.arrayOf(PropTypes.object),
    hostsInClusters: PropTypes.number.isRequired,
  }),
};

ClusterCardsContainer.defaultProps = {
  loadingClusters: false,
  loadedClusters: false,
};

const mapStateToProps = state => ({
  ...clustersSelector(state),
});

export default connect(mapStateToProps, { fetchClusterCards, reset })(ClusterCardsContainer);
