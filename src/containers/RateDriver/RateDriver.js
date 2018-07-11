import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { View, Text, ScrollView } from 'react-native';
import { Avatar } from 'react-native-elements';
import { some } from 'lodash';
import { changeDriverRating, changeDriverRatingReasons } from 'actions/booking';
import { Divider, RatingLabel, GradientWrapper, Badge, Header, BackBtn } from 'components';
import { strings } from 'locales';
import Rating from './components/Rating';
import SaveRatingBtn from './components/SaveRatingBtn';

import styles from './styles';

class RateDriver extends PureComponent {
  goBack = () => this.props.navigation.goBack();

  renderDriverCarInfo = vehicle => (
    vehicle && <Text style={[styles.vehicleDetails, { marginTop: 8 }]}>{Object.values(vehicle).join(', ')}</Text>
  );

  renderDriverRating = () => {
    const { order: { driverDetails } } = this.props;

    return (
      <View style={[styles.listItem, { marginTop: 20 }]}>
        <Text style={styles.driverName}>{driverDetails.info.name}</Text>
        {driverDetails.info.rating && <RatingLabel label={driverDetails.info.rating} />}
      </View>
    );
  };

  render() {
    const {
      order: { driverDetails, ratingReasons, rateable = true, tempDriverRating, tempDriverRatingReasons },
      changeDriverRating,
      changeDriverRatingReasons,
      navigation
    } = this.props;
    const avatar = driverDetails.info.imageUrl;
    const labelText = (tempDriverRating || driverDetails.tripRating)
      ? strings('order.text.youRated') : strings('order.text.rateYourDriver');
    const isLowRating = tempDriverRating && tempDriverRating <= 4;

    return (
      <GradientWrapper
        start={{ x: 1, y: 1 }}
        end={{ x: 1, y: 0 }}
        style={[styles.flex, styles.wrapper]}
      >
        <Header
          navigation={navigation}
          leftButton={
            <BackBtn
              color="#fff"
              navigation={navigation}
              touchedPath="booking.currentOrder.tempDriverRating"
            />
          }
          rightButton={<SaveRatingBtn navigation={navigation} />}
        />

        <ScrollView contentContainerStyle={styles.content}>
          {!isLowRating && (
            <View>
              <Avatar
                rounded
                width={80}
                height={80}
                icon={{ name: 'user', type: 'font-awesome' }}
                source={avatar && { uri: avatar }}
              />
            </View>
          )}
          {this.renderDriverRating()}
          {this.renderDriverCarInfo(driverDetails.info.vehicle)}
          <Divider left={0} style={styles.divider}/>
          <Text style={styles.label}>{labelText}</Text>
          <Rating
            value={rateable ? tempDriverRating : driverDetails.tripRating}
            disabled={!rateable}
            onChange={changeDriverRating}
          />
          {isLowRating && (
            <View>
              <Divider left={0} style={styles.divider}/>
              <View style={styles.centerItems}>
                <Text style={styles.label}>{strings('order.text.howCanImprove')}</Text>
                <Text style={[styles.subLabel, { marginTop: 8 }]}>{strings('order.text.yourFeedback')}</Text>
                <View style={styles.badgesList}>
                  {(ratingReasons || []).map((reason, index) => (
                    <Badge
                      key={index}
                      active={some(tempDriverRatingReasons, reasonName => (reasonName === reason))}
                      label={strings(`order.ratingReason.${reason}`)}
                      onPress={() => changeDriverRatingReasons(reason)}
                    />
                  ))}
                </View>
                <Text style={styles.subLabel}>{strings('order.text.selectIssues')}</Text>
              </View>
            </View>
          )}
        </ScrollView>
      </GradientWrapper>
    );
  }
}

const mapState = ({ booking }) => ({
  order: booking.currentOrder
});

const mapDispatch = {
  changeDriverRating,
  changeDriverRatingReasons
};

export default connect(mapState, mapDispatch)(RateDriver);
