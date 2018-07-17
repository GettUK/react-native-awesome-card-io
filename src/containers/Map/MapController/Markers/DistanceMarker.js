import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import InfoMarker from './InfoMarker';
import DestinationMarker from './DestinationMarker';

class DistanceMarker extends React.Component {
  render() {
    const { coordinate, value } = this.props;

    return (
      <Fragment>
        <InfoMarker
          coordinate={coordinate}
          title="Distance"
          icon="distance"
          value={value}
        />
        <DestinationMarker coordinate={coordinate} />
      </Fragment>
    );
  }
}

DistanceMarker.propTypes = {
  coordinate: PropTypes.object.isRequired
};

export default DistanceMarker;
