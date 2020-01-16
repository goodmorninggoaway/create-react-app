// (C) Copyright 2018 Hewlett Packard Enterprise Development LP

import React from 'react';
import PropTypes from 'prop-types';
import HostHeadlineContainer from './headline/HostHeadlineContainer';

const HostDetailContainer = props => (
  <div>
    <HostHeadlineContainer {...props} hostId={props.scope.id} />
  </div>
);

HostDetailContainer.propsTypes = {
  // Injected by InfrastructurePages
  scope: PropTypes.shape({
    type: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
  }),
};

export default HostDetailContainer;
