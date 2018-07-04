import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import InfoMarker from './InfoMarker';
import SourceActiveMarker from './SourceActiveMarker';

class ETAMarker extends React.Component {
  render() {
    const { coordinate, value } = this.props;

    return (
      <Fragment>
        <InfoMarker
          coordinate={coordinate}
          title="ETA"
          icon="journeyTime"
          value={value}
        />
        <SourceActiveMarker coordinate={coordinate} />
      </Fragment>
    );
  }
}

ETAMarker.propTypes = {
  coordinate: PropTypes.object.isRequired
};

export default ETAMarker;
