import React from 'react';
import PropTypes from 'prop-types';
import numeral from 'numeral';
import Headline from '@infosight/elmer/dist/components/Headline';
import KeyStatistic from '@infosight/elmer/dist/components/KeyStatistic';

const VmHeadline = ({ vm }) => {
  const { name, iopsAvg, latencyAvgMs, latencyMaxMs } = vm.length && vm[0];

  return (
    <Headline>
      <Headline.Section className="columns medium-8">
        <div>
          <div className="row align-center">
            <h6>Summary</h6>
          </div>
          <div className="row">
            <div className="columns">
              <KeyStatistic>{name}</KeyStatistic>
            </div>
          </div>
        </div>
      </Headline.Section>
      <Headline.Section>
        <h6>
          Performance
          <br />
          <small>(Past 24 hrs Avg)</small>
        </h6>
        <div className="row">
          <div className="columns">
            <KeyStatistic>{numeral(iopsAvg).format('0,0.00')}</KeyStatistic>
            <h6 className="no-margin">Avg IOPS</h6>
          </div>
          <div className="columns">
            <KeyStatistic>
              {numeral(latencyAvgMs).format('0,0.00')} <small>ms</small>
            </KeyStatistic>
            <h6 className="no-margin">Avg Latency</h6>
          </div>
          <div className="columns end">
            <KeyStatistic>
              {numeral(latencyMaxMs).format('0,0.00')} <small>ms</small>
            </KeyStatistic>
            <h6 className="no-margin">Max Latency</h6>
          </div>
        </div>
      </Headline.Section>
    </Headline>
  );
};

VmHeadline.propTypes = {
  vm: PropTypes.arrayOf(PropTypes.object),
};

VmHeadline.defaultProps = {
  vm: [],
};

export default VmHeadline;
