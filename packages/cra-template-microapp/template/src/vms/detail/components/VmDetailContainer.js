import React from 'react';
import PropTypes from 'prop-types';
import VmHeadlineContainer from './headline/VmHeadlineContainer';

const VmDetailContainer = props => (
  <div>
    <VmHeadlineContainer {...props} vmId={props.scope.id} />
  </div>
);

VmDetailContainer.propTypes = {
  // Injected by InfrastructurePages
  scope: PropTypes.shape({
    type: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
  }),
};

export default VmDetailContainer;
