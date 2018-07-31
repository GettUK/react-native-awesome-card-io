import React from 'react';
import PropTypes from 'prop-types';
import { ActivityIndicator, Text, View } from 'react-native';
import { Icon } from 'components';
import { color } from 'theme';
import { strings } from 'locales';
import styles from './styles';

const JourneyDetails = ({ style, time, distance, loading, timeLabel }) => {
  const renderBlockItem = ({ label, text, icon }) => (
    <View style={styles.blockItem}>
      {icon}
      <View style={styles.textLines}>
        <Text numberOfLines={1} style={styles.label}>{label}</Text>
        {
          !loading ?
            <Text numberOfLines={1} style={styles.labelBold}>{text}</Text> :
            <ActivityIndicator style={styles.loading} size="small" color={color.pixelLine} />
        }
      </View>
    </View>
  );
  return (
    <View style={[styles.container, style]}>
      {
        renderBlockItem({
          label: strings(`order.label.${timeLabel || 'journeyTime'}`),
          text: time,
          icon: <Icon style={styles.icon} name="journeyTime" width={20} height={24} color={color.pixelLine} />
        })
      }
      <View style={styles.divider} />
      {
        renderBlockItem({
          label: strings('order.label.distance'),
          text: distance,
          icon: <Icon style={styles.icon} name="distance" width={24} height={14} color={color.pixelLine} />
        })
      }
    </View>
  );
};

JourneyDetails.propTypes = {
  style: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
    PropTypes.number
  ]),
  time: PropTypes.string,
  distance: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  loading: PropTypes.bool
};

JourneyDetails.defaultProps = {
  style: {},
  time: '',
  distance: ''
};

export default JourneyDetails;
