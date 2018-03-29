import React from 'react';
import { View } from 'react-native';
import SkypeIndicator from '../skype-indicator';
import styles from './style';

const LoaderLayer = ({ loading }) => (
  <View style={styles.modalContainer}>
    <View style={styles.modalBackground}>
      <View style={styles.activityIndicatorWrapper}>
        <SkypeIndicator
          animationDuration={1200}
          animating={loading}
        />
      </View>
    </View>
  </View>
);

export default LoaderLayer;
