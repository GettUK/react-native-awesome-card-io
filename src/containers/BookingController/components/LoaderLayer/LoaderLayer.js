import React from 'react';
import { View } from 'react-native';
import Indicator from '../Indicator';
import styles from './style';

const LoaderLayer = ({ loading }) => (
  <View style={styles.modalContainer}>
    <View style={styles.modalBackground}>
      <View style={styles.activityIndicatorWrapper}>
        <Indicator
          animationDuration={1200}
          animating={loading}
        />
      </View>
    </View>
  </View>
);

export default LoaderLayer;
