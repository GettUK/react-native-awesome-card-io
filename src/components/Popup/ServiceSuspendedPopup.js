import React from 'react';
import { View, Text } from 'react-native';

import { strings } from 'locales';

import Popup from './Popup';

import styles from './style';

const ServiceSuspendedPopup = ({ innerRef }) => (
  <Popup
    ref={innerRef}
    title={strings('popup.serviceSuspended.title')}
    titleStyle={styles.serviceSuspendedTitle}
    content={(
      <View>
        <Text style={[styles.serviceSuspendedDescription, styles.serviceSuspendedGreeting]}>
          {strings('popup.serviceSuspended.greeting')}
        </Text>
        <Text style={styles.serviceSuspendedDescription}>
          {strings('popup.serviceSuspended.description')}
        </Text>
        <Text style={styles.serviceSuspendedSign}>
          {strings('popup.serviceSuspended.sign')}
        </Text>
      </View>
    )}
  />
);

export default ServiceSuspendedPopup;
