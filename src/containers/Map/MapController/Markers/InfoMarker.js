import React from 'react';
import { View, Text, Platform } from 'react-native';
import PropTypes from 'prop-types';
import { color } from 'theme';

import { Icon } from 'components';
import assets from 'assets';

import Marker from './Basic';

import styles from './styles';

class InfoMarker extends React.Component {
  render() {
    const { coordinate, icon, title, value } = this.props;
    const isAndroid = Platform.OS === 'android';

    return (
      <Marker
        coordinate={coordinate}
        id={`infoMarker${title}${value}`}
        anchorY={1.2}
        image={isAndroid && assets.blockShadowAndroid}
      >
        <View style={styles.infoMarkerContainer}>
          <View style={styles.infoMarker}>
            <Icon style={styles.infoMarkerIcon} name={icon} size={18} color={color.pixelLine} />
            <View>
              <Text numberOfLines={1} style={styles.infoMarkerTitle}>{title}</Text>
              <Text numberOfLines={1} style={styles.infoMarkerValue}>{value}</Text>
            </View>
          </View>
        </View>
      </Marker>
    );
  }
}

InfoMarker.propTypes = {
  coordinate: PropTypes.object.isRequired
};

export default InfoMarker;
