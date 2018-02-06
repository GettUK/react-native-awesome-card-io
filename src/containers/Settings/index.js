import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ScrollView, View } from 'react-native';
import { ListItem as ListItemEl, Avatar } from 'react-native-elements';
import { has, join, isEmpty, isNull, isEqual, capitalize } from 'lodash/fp';
import {
  passegerViewEmpty,
  receivePassegerView
} from 'actions/ui/passenger-view';
import { strings } from 'locales';
import styles from './style';

class Settings extends Component {
  componentDidMount() {
    const { passengerView: { results, errors } } = this.props;
    if (!isNull(errors)) {
      this.receivePasseger();
    } else {
      if (isNull(results)) {
        this.receivePasseger();
      }
    }
  }
  componentWillReceiveProps({ network: { isConnected } }) {
    const {
      network: { isConnected: oldIsConnected },
      sessionData: { member_id: memberId }
    } = this.props;

    if (!isEqual(oldIsConnected, isConnected)) {
      this.props.receivePassegerView(memberId);
    }
  }
  receivePasseger = () => {
    const {
      network: { isConnected },
      sessionData: { member_id: memberId }
    } = this.props;
    if (isConnected) {
      this.props.receivePassegerView(memberId);
    } else {
      this.props.passegerViewEmpty();
    }
  };
  render() {
    const { passengerView: { results } } = this.props;
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container}>
          <View style={styles.blockItems}>
            <ListItemEl
              onPress={() => {}}
              avatar={
                has('avatar_url', results) && !isEmpty(results.avatar_url) &&
                <Avatar
                  rounded
                  medium
                  source={{
                    uri: results.avatar_url
                  }}
                  title={
                    has('first_name', results) &&
                    has('last_name', results) &&
                    !isEmpty(results.first_name) &&
                    !isEmpty(results.last_name) ?
                      join(' ', [
                        capitalize(results.first_name),
                        capitalize(results.last_name)
                      ]) :
                      null
                  }
                />
              }
              title={
                has('first_name', results) &&
                has('last_name', results) &&
                !isEmpty(results.first_name) &&
                !isEmpty(results.last_name) ?
                  join(' ', [
                    capitalize(results.first_name),
                    capitalize(results.last_name)
                  ]) :
                  null
              }
              titleNumberOfLines={2}
              chevronColor="#C7C7CC"
              rightTitleStyle={styles.listItemRightTitle}
              titleStyle={[styles.listItemTitle, styles.avatarTitle]}
              titleContainerStyle={styles.listItemTitleContainer}
              containerStyle={[
                styles.listItemContainer,
                styles.avatarContainer
              ]}
            />
            <ListItemEl
              onPress={() => {}}
              title={strings('settings.phoneLabel')}
              titleNumberOfLines={2}
              rightTitle={
                has('phone', results) && !isEmpty(results.phone) ?
                  results.phone :
                  null
              }
              chevronColor="#C7C7CC"
              rightTitleStyle={styles.listItemRightTitle}
              titleStyle={styles.listItemTitle}
              titleContainerStyle={styles.listItemTitleContainer}
              containerStyle={styles.listItemContainer}
            />
            <ListItemEl
              onPress={() => {}}
              title={strings('settings.emailLabel')}
              titleNumberOfLines={2}
              rightTitle={
                has('email', results) && !isEmpty(results.email) ?
                  results.email :
                  null
              }
              chevronColor="#C7C7CC"
              rightTitleStyle={styles.listItemRightTitle}
              titleStyle={styles.listItemTitle}
              titleContainerStyle={styles.listItemTitleContainer}
              containerStyle={styles.listItemContainer}
            />
            <ListItemEl
              onPress={() => {}}
              title={strings('settings.cartypeLabel')}
              titleNumberOfLines={2}
              rightTitle={
                has('default_vehicle', results) &&
                !isEmpty(results.default_vehicle) ?
                  results.default_vehicle :
                  strings('settings.none')
              }
              chevronColor="#C7C7CC"
              rightTitleStyle={styles.listItemRightTitle}
              titleStyle={styles.listItemTitle}
              titleContainerStyle={styles.listItemTitleContainer}
              containerStyle={styles.listItemContainer}
            />
          </View>
          <View style={styles.blockItems}>
            <ListItemEl
              onPress={() => {}}
              leftIcon={{ name: 'home', color: '#8E8E93' }}
              title={strings('settings.homeLabel')}
              titleNumberOfLines={2}
              rightTitle={
                has('home_address', results) &&
                has('line', results.home_address) &&
                !isEmpty(results.home_address.line) ?
                  results.home_address.line :
                  strings('settings.none')
              }
              chevronColor="#C7C7CC"
              rightTitleStyle={styles.listItemRightTitle}
              titleStyle={styles.listItemTitle}
              titleContainerStyle={styles.listItemTitleContainer}
              containerStyle={styles.listItemContainer}
            />
            <ListItemEl
              onPress={() => {}}
              leftIcon={{ name: 'business-center', color: '#8E8E93' }}
              title={strings('settings.workLabel')}
              titleNumberOfLines={2}
              rightTitle={
                has('work_address', results) &&
                has('line', results.work_address) &&
                !isEmpty(results.work_address.line) ?
                  results.work_address.line :
                  strings('settings.none')
              }
              chevronColor="#C7C7CC"
              rightTitleStyle={styles.listItemRightTitle}
              titleStyle={styles.listItemTitle}
              titleContainerStyle={styles.listItemTitleContainer}
              containerStyle={styles.listItemContainer}
            />
            <ListItemEl
              onPress={() => {}}
              title={strings('settings.addressesLabel')}
              titleNumberOfLines={2}
              chevronColor="#C7C7CC"
              rightTitleStyle={styles.listItemRightTitle}
              titleStyle={styles.listItemTitle}
              titleContainerStyle={styles.listItemTitleContainer}
              containerStyle={styles.listItemContainer}
            />
          </View>
          <View style={styles.blockItems}>
            <ListItemEl
              onPress={() => {}}
              leftIcon={{ name: 'drafts', color: '#8E8E93' }}
              title={strings('settings.emailLabel')}
              titleNumberOfLines={2}
              switchButton
              onSwitch={bool => console.log('settings.emailLabel', bool)}
              switchOnTintColor="#4CD964"
              switched={has('notify_with_email', results) ? results.notify_with_email : false}
              hideChevron
              rightTitleStyle={styles.listItemRightTitle}
              titleStyle={styles.listItemTitle}
              titleContainerStyle={styles.listItemTitleContainer}
              containerStyle={styles.listItemContainer}
            />
            <ListItemEl
              onPress={() => {}}
              leftIcon={{ name: 'home', color: '#8E8E93' }}
              title={strings('settings.smsLabel')}
              titleNumberOfLines={2}
              switchButton
              onSwitch={bool => console.log('settings.smsLabel', bool)}
              switchOnTintColor="#4CD964"
              switched={has('notify_with_sms', results) ? results.notify_with_sms : false}
              hideChevron
              rightTitleStyle={styles.listItemRightTitle}
              titleStyle={styles.listItemTitle}
              titleContainerStyle={styles.listItemTitleContainer}
              containerStyle={styles.listItemContainer}
            />
            <ListItemEl
              onPress={() => {}}
              leftIcon={{ name: 'notifications', color: '#8E8E93' }}
              title={strings('settings.notificationLabel')}
              titleNumberOfLines={2}
              switchButton
              onSwitch={bool => console.log('settings.notificationLabel', bool)}
              switchOnTintColor="#4CD964"
              switched={false}
              hideChevron
              rightTitleStyle={styles.listItemRightTitle}
              titleStyle={styles.listItemTitle}
              titleContainerStyle={styles.listItemTitleContainer}
              containerStyle={styles.listItemContainer}
            />
            <ListItemEl
              onPress={() => {}}
              leftIcon={{ name: 'event-note', color: '#8E8E93' }}
              title={strings('settings.invitesLabel')}
              titleNumberOfLines={2}
              switchButton
              onSwitch={bool => console.log('settings.invitesLabel', bool)}
              switchOnTintColor="#4CD964"
              switched={has('notify_with_calendar_event', results) ? results.notify_with_calendar_event : false}
              hideChevron
              rightTitleStyle={styles.listItemRightTitle}
              titleStyle={styles.listItemTitle}
              titleContainerStyle={styles.listItemTitleContainer}
              containerStyle={styles.listItemContainer}
            />
            <ListItemEl
              onPress={() => {}}
              leftIcon={{
                name: 'airline-seat-recline-extra',
                color: '#8E8E93'
              }}
              title={strings('settings.wheelchairLabel')}
              titleNumberOfLines={2}
              switchButton
              onSwitch={bool => console.log('wheelchairLabel', bool)}
              switchOnTintColor="#4CD964"
              switched={has('wheelchair_user', results) ? results.wheelchair_user : false}
              hideChevron
              rightTitleStyle={styles.listItemRightTitle}
              titleStyle={styles.listItemTitle}
              titleContainerStyle={styles.listItemTitleContainer}
              containerStyle={styles.listItemContainer}
            />
          </View>
          <View style={styles.blockItems}>
            <ListItemEl
              onPress={() => {}}
              title={strings('settings.paymentsLabel')}
              titleNumberOfLines={2}
              chevronColor="#C7C7CC"
              rightTitleStyle={styles.listItemRightTitle}
              titleStyle={styles.listItemTitle}
              titleContainerStyle={styles.listItemTitleContainer}
              containerStyle={styles.listItemContainer}
            />
            <ListItemEl
              onPress={() => {}}
              title={strings('settings.ridesLabel')}
              titleNumberOfLines={2}
              chevronColor="#C7C7CC"
              rightTitleStyle={styles.listItemRightTitle}
              titleStyle={styles.listItemTitle}
              titleContainerStyle={styles.listItemTitleContainer}
              containerStyle={styles.listItemContainer}
            />
          </View>
          <View style={styles.blockItems}>
            <ListItemEl
              onPress={() => {}}
              title={strings('settings.privacyLabel')}
              titleNumberOfLines={2}
              chevronColor="#C7C7CC"
              rightTitleStyle={styles.listItemRightTitle}
              titleStyle={styles.listItemTitle}
              titleContainerStyle={styles.listItemTitleContainer}
              containerStyle={styles.listItemContainer}
            />
            <ListItemEl
              onPress={() => {}}
              title={strings('settings.termsLabel')}
              titleNumberOfLines={2}
              chevronColor="#C7C7CC"
              rightTitleStyle={styles.listItemRightTitle}
              titleStyle={styles.listItemTitle}
              titleContainerStyle={styles.listItemTitleContainer}
              containerStyle={styles.listItemContainer}
            />
            <ListItemEl
              onPress={() => {}}
              title={strings('settings.faqsLabel')}
              titleNumberOfLines={2}
              chevronColor="#C7C7CC"
              rightTitleStyle={styles.listItemRightTitle}
              titleStyle={styles.listItemTitle}
              titleContainerStyle={styles.listItemTitleContainer}
              containerStyle={styles.listItemContainer}
            />
            <ListItemEl
              onPress={() => {}}
              title={strings('settings.locationInfoLabel')}
              titleNumberOfLines={2}
              chevronColor="#C7C7CC"
              rightTitleStyle={styles.listItemRightTitle}
              titleStyle={styles.listItemTitle}
              titleContainerStyle={styles.listItemTitleContainer}
              containerStyle={styles.listItemContainer}
            />
          </View>
        </ScrollView>
      </View>
    );
  }
}

Settings.propTypes = {
  // navigation: PropTypes.object.isRequired,
  network: PropTypes.object.isRequired,
  sessionData: PropTypes.object.isRequired,
  passengerView: PropTypes.object.isRequired,
  passegerViewEmpty: PropTypes.func.isRequired,
  receivePassegerView: PropTypes.func.isRequired
};

Settings.defaultProps = {};

const select = ({ session, ui, network }) => ({
  network,
  sessionData: session.result,
  passengerView: ui.passengerView
});

const bindActions = {
  passegerViewEmpty,
  receivePassegerView
};

export default connect(select, bindActions)(Settings);
