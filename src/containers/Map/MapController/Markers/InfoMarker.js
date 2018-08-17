import React from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import { color } from 'theme';

import { Icon } from 'components';

import { withTheme } from 'providers';

import Marker from './Basic';

import styles from './styles';

class InfoMarker extends React.Component {
  render() {
    const { coordinate, icon, title, value, theme } = this.props;

    return (
      <Marker
        coordinate={coordinate}
        id={`infoMarker${title}${value}${theme.type}`}
        anchorY={1.2}
      >
        <View style={styles.infoMarkerContainer}>
          <View style={[styles.infoMarker, { backgroundColor: theme.color.bgPrimary }]}>
            <Icon style={styles.infoMarkerIcon} name={icon} size={18} color={color.pixelLine} />
            <View>
              <Text numberOfLines={1} style={[styles.infoMarkerTitle, { color: theme.color.secondaryText }]}>
                {title}
              </Text>
              <Text numberOfLines={1} style={[styles.infoMarkerValue, { color: theme.color.primaryText }]}>
                {value}
              </Text>
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

export default withTheme(InfoMarker);
