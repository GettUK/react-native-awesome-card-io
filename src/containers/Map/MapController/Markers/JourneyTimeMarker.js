import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import InfoMarker from './InfoMarker';
import SourceActiveMarker from './SourceActiveMarker';

class JourneyTimeMarker extends React.Component {
  render() {
    const { coordinate, value } = this.props;

    return (
      <Fragment>
        <InfoMarker
          coordinate={coordinate}
          title="Journey Time"
          icon="journeyTime"
          value={value}
        />
        <SourceActiveMarker coordinate={coordinate} />
      </Fragment>
    );
  }
}

JourneyTimeMarker.propTypes = {
  coordinate: PropTypes.object.isRequired
};

export default JourneyTimeMarker;
