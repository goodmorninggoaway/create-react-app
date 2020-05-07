import React from 'react';
import PropTypes from 'prop-types';
import Headline from '@infosight/elmer/dist/components/Headline';

const HostHeadline = ({ host }) => {
  const hostData = host.length && host[0];

  return (
    <Headline>
      <Headline.Section className="columns medium-8">
        <div>
          <div className="row align-center">
            <h6>Summary</h6>
          </div>
          <div className="text-left">
            <div className="row">
              <div className="small-8 large-8">Name:</div>
              <div className="small-16 large-16 text-right">
                <strong title={hostData.name}>{hostData.name}</strong>
              </div>
            </div>
            <div className="row">
              <div className="small-8 large-8">Model:</div>
              <div className="small-16 large-16 text-right ellipsis-on-overflow">
                <strong title={hostData.model}>{hostData.model}</strong>
              </div>
            </div>
          </div>
        </div>
      </Headline.Section>
    </Headline>
  );
};

HostHeadline.propTypes = {
  host: PropTypes.arrayOf(PropTypes.object),
};

HostHeadline.defaultProps = {
  host: [],
};

export default HostHeadline;
