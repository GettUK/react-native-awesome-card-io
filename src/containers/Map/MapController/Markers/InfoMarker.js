import React from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';

import { Icon } from 'components';

import Marker from './Basic';

import styles from './styles';

class InfoMarker extends React.Component {
  render() {
    const { coordinate, icon, title, value } = this.props;

    return (
      <Marker coordinate={coordinate} id={`infoMarker${title}${value}`} anchorY={1.2}>
        <View style={styles.infoMarkerContainer}>
          <View style={styles.infoMarker}>
            <Icon style={styles.infoMarkerIcon} name={icon} size={18} color="#d8d8d8" />
            <View>
              <Text style={styles.infoMarkerTitle}>{title}</Text>
              <Text style={styles.infoMarkerValue}>{value}</Text>
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
