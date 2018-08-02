import React from 'react';
import { View, Image, Text } from 'react-native';
import moment from 'moment';

import assets from 'assets';

import { Icon } from 'components';

import { strings } from 'locales';

import { timeFormat } from 'utils';

import Popup from './Popup';

import styles from './style';

const FutureOrderSuggestionPopup = ({ innerRef, flightData, onPress }) => (
  <Popup
    ref={innerRef}
    title={null}
    contentWraperStyle={styles.futureOrderContainer}
    footerStyle={styles.futureOrderFooter}
    content={(
      <View>
        <Image style={styles.futureOrderImage} source={assets.flight} />

        <View style={styles.futureOrderInnerContainer}>
          <Text style={styles.futureOrderTitle}>
            {strings('popup.orderCreating.inProgress')}
          </Text>
          <Text style={styles.futureOrderDescription}>
            {`${strings('popup.orderCreating.description')} ${flightData && flightData.arrival.name}?`}
          </Text>

          <View style={styles.futureOrderRow}>
            <Text style={[styles.futureOrderTitle, { marginVertical: 0 }]}>
              {flightData && flightData.departure.code}
            </Text>
            <Icon style={styles.futureOrderDivider} height={22} width={134} name="flightInProgress" />
            <Text style={[styles.futureOrderTitle, { marginVertical: 0 }]}>
              {flightData && flightData.arrival.code}
            </Text>
          </View>

          <View style={[styles.futureOrderRow, { marginBottom: 42 }]}>
            <Text style={styles.futureOrderTime}>
              {flightData && moment(flightData.departure.time).format(timeFormat())}
            </Text>
            <Text style={styles.futureOrderTime}>
              {flightData && moment(flightData.arrival.time).format(timeFormat())}
            </Text>
          </View>
        </View>
      </View>
    )}
    buttons={[
      {
        title: strings('popup.orderCreating.button.decline'),
        style: styles.btnStyle,
        textStyle: styles.btnTextStyle
      },
      {
        title: strings('popup.orderCreating.button.accept'),
        onPress
      }
    ]}
  />
);

export default FutureOrderSuggestionPopup;
