import React from 'react';
import PropTypes from 'prop-types';
import Map from 'react-native-maps';

import { prepareCoordinates } from 'utils';

class MarkerBasic extends React.Component {
  render() {
    const { coordinate, children, id, anchorX, anchorY, ...rest } = this.props;

    return (
      <Map.Marker
        key={id}
        coordinate={prepareCoordinates(coordinate)}
        anchor={{ x: anchorX, y: anchorY }}
        stopPropagation
        tracksViewChanges={false}
        {...rest}
      >
        {children}
      </Map.Marker>
    );
  }
}

MarkerBasic.propTypes = {
  coordinate: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired,
  anchorX: PropTypes.number,
  anchorY: PropTypes.number,
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
};

MarkerBasic.defaultProps = {
  anchorX: 0.5,
  anchorY: 0.5
};

export default MarkerBasic;
