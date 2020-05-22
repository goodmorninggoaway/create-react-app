import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchClusters } from '../../actionCreator';
import { clustersSelector } from '../../reducer';
import ClusterCards from './ClusterCards';
import PropTypes from 'prop-types';

//const cx = classnames.bind(style);

class ClusterCardsContainer extends Component {
  componentDidMount() {
    this.props.fetchClusters();
  }

  render() {
    return <ClusterCards {...this.props} />;
  }
}

ClusterCardsContainer.propTypes = {
  fetchClusters: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  ...clustersSelector(state),
});

const mapDispatchToProps = { fetchClusters };

export default connect(mapStateToProps, mapDispatchToProps)(ClusterCardsContainer);
