import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { View, Text, ScrollView } from 'react-native';
import { Avatar } from 'react-native-elements';
import { changeDriverRating } from 'actions/booking';
import Rating from './components/Rating';

import styles from './styles';

class RateDriver extends PureComponent {
  goBack = () => this.props.navigation.goBack();

  render() {
    const { order: { driverDetails, rateable = true, tempDriverRating }, changeDriverRating } = this.props;
    const avatar = driverDetails.info.imageUrl;
    return (
      <View style={[styles.flex, styles.wrapper]}>
        <ScrollView contentContainerStyle={styles.content}>
          <View>
            <Avatar
              rounded
              width={120}
              height={120}
              icon={{ name: 'user', type: 'font-awesome' }}
              source={avatar && { uri: avatar }}
            />
            <View style={styles.ratingValueContainer}>
              <Text style={styles.ratingValue}>{driverDetails.info.rating}</Text>
            </View>
          </View>
          <Text style={styles.name}>{driverDetails.info.name}</Text>
          <Text style={styles.greyText}>{driverDetails.info.vehicle.model}</Text>
          <Rating
            value={rateable ? tempDriverRating : driverDetails.tripRating}
            disabled={!rateable}
            onChange={changeDriverRating}
          />
        </ScrollView>
      </View>
    );
  }
}

const mapState = ({ bookings }) => ({
  order: bookings.currentOrder
});

const mapDispatch = {
  changeDriverRating
};

export default connect(mapState, mapDispatch)(RateDriver);
