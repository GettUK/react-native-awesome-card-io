import React from 'react';
import PropTypes from 'prop-types';
import { ActivityIndicator, Text, View } from 'react-native';
import { Icon } from 'components';
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
            <ActivityIndicator style={styles.loading} size="small" color="rgb(216,216,216)" />
        }
      </View>
    </View>
  );
  return (
    <View style={[styles.container, style]}>
      {
        renderBlockItem({
          label: strings(`label.${timeLabel || 'estimatedJourneyTime'}`),
          text: time,
          icon: <Icon style={styles.icon} name="journeyTime" width={20} height={24} color="rgb(216,216,216)" />
        })
      }
      <View style={styles.divider} />
      {
        renderBlockItem({
          label: strings('label.distance'),
          text: distance,
          icon: <Icon style={styles.icon} name="distance" width={24} height={14} color="rgb(216,216,216)" />
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
