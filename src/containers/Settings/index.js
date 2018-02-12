import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ScrollView, View } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';
import { has, join, isEmpty, isNull, isEqual, capitalize } from 'lodash/fp';
import {
  passegerViewEmpty,
  receivePassegerView
} from 'actions/ui/passenger-view';
import { Icon } from 'components';
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
            <ListItem
              onPress={() => {}}
              avatar={
                has('avatar_url', results) &&
                !isEmpty(results.avatar_url) && (
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
                )
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
            <ListItem
              onPress={() => {}}
              title={strings('settings.label.phone')}
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
            <ListItem
              onPress={() => {}}
              title={strings('settings.label.email')}
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
            <ListItem
              onPress={() => {}}
              title={strings('settings.label.cartype')}
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
            <ListItem
              onPress={() => {}}
              leftIcon={<Icon name="home" size={24} color="#8e8e93" />}
              title={strings('settings.label.home')}
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
            <ListItem
              onPress={() => {}}
              leftIcon={<Icon name="work" size={24} color="#8e8e93" />}
              title={strings('settings.label.work')}
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
            <ListItem
              onPress={() => {}}
              title={strings('settings.label.addresses')}
              titleNumberOfLines={2}
              chevronColor="#C7C7CC"
              rightTitleStyle={styles.listItemRightTitle}
              titleStyle={styles.listItemTitle}
              titleContainerStyle={styles.listItemTitleContainer}
              containerStyle={styles.listItemContainer}
            />
          </View>
          <View style={styles.blockItems}>
            <ListItem
              onPress={() => {}}
              leftIcon={<Icon name="email" size={24} color="#8e8e93" />}
              title={strings('settings.label.email')}
              titleNumberOfLines={2}
              switchButton
              onSwitch={bool => console.log('settings.label.email', bool)}
              switchOnTintColor="#4CD964"
              switched={
                has('notify_with_email', results) ?
                  results.notify_with_email :
                  false
              }
              hideChevron
              rightTitleStyle={styles.listItemRightTitle}
              titleStyle={styles.listItemTitle}
              titleContainerStyle={styles.listItemTitleContainer}
              containerStyle={styles.listItemContainer}
            />
            <ListItem
              onPress={() => {}}
              leftIcon={<Icon name="sms" size={24} color="#8e8e93" />}
              title={strings('settings.label.sms')}
              titleNumberOfLines={2}
              switchButton
              onSwitch={bool => console.log('settings.label.sms', bool)}
              switchOnTintColor="#4CD964"
              switched={
                has('notify_with_sms', results) ?
                  results.notify_with_sms :
                  false
              }
              hideChevron
              rightTitleStyle={styles.listItemRightTitle}
              titleStyle={styles.listItemTitle}
              titleContainerStyle={styles.listItemTitleContainer}
              containerStyle={styles.listItemContainer}
            />
            <ListItem
              onPress={() => {}}
              leftIcon={<Icon name="push" size={24} color="#8e8e93" />}
              title={strings('settings.label.notification')}
              titleNumberOfLines={2}
              switchButton
              onSwitch={bool =>
                console.log('settings.label.notification', bool)
              }
              switchOnTintColor="#4CD964"
              switched={false}
              hideChevron
              rightTitleStyle={styles.listItemRightTitle}
              titleStyle={styles.listItemTitle}
              titleContainerStyle={styles.listItemTitleContainer}
              containerStyle={styles.listItemContainer}
            />
            <ListItem
              onPress={() => {}}
              leftIcon={<Icon name="calendar" size={24} color="#8e8e93" />}
              title={strings('settings.label.invites')}
              titleNumberOfLines={2}
              switchButton
              onSwitch={bool => console.log('settings.label.invites', bool)}
              switchOnTintColor="#4CD964"
              switched={
                has('notify_with_calendar_event', results) ?
                  results.notify_with_calendar_event :
                  false
              }
              hideChevron
              rightTitleStyle={styles.listItemRightTitle}
              titleStyle={styles.listItemTitle}
              titleContainerStyle={styles.listItemTitleContainer}
              containerStyle={styles.listItemContainer}
            />
            <ListItem
              onPress={() => {}}
              leftIcon={<Icon name="wheelchair" size={24} color="#8e8e93" />}
              title={strings('settings.label.wheelchair')}
              titleNumberOfLines={2}
              switchButton
              onSwitch={bool => console.log('settings.label.wheelchair', bool)}
              switchOnTintColor="#4CD964"
              switched={
                has('wheelchair_user', results) ?
                  results.wheelchair_user :
                  false
              }
              hideChevron
              rightTitleStyle={styles.listItemRightTitle}
              titleStyle={styles.listItemTitle}
              titleContainerStyle={styles.listItemTitleContainer}
              containerStyle={styles.listItemContainer}
            />
          </View>
          <View style={styles.blockItems}>
            <ListItem
              onPress={() => {}}
              title={strings('settings.label.payments')}
              titleNumberOfLines={2}
              chevronColor="#C7C7CC"
              rightTitleStyle={styles.listItemRightTitle}
              titleStyle={styles.listItemTitle}
              titleContainerStyle={styles.listItemTitleContainer}
              containerStyle={styles.listItemContainer}
            />
            <ListItem
              onPress={() => {}}
              title={strings('settings.label.rides')}
              titleNumberOfLines={2}
              chevronColor="#C7C7CC"
              rightTitleStyle={styles.listItemRightTitle}
              titleStyle={styles.listItemTitle}
              titleContainerStyle={styles.listItemTitleContainer}
              containerStyle={styles.listItemContainer}
            />
          </View>
          <View style={styles.blockItems}>
            <ListItem
              onPress={() => {}}
              title={strings('settings.label.privacy')}
              titleNumberOfLines={2}
              chevronColor="#C7C7CC"
              rightTitleStyle={styles.listItemRightTitle}
              titleStyle={styles.listItemTitle}
              titleContainerStyle={styles.listItemTitleContainer}
              containerStyle={styles.listItemContainer}
            />
            <ListItem
              onPress={() => {}}
              title={strings('settings.label.terms')}
              titleNumberOfLines={2}
              chevronColor="#C7C7CC"
              rightTitleStyle={styles.listItemRightTitle}
              titleStyle={styles.listItemTitle}
              titleContainerStyle={styles.listItemTitleContainer}
              containerStyle={styles.listItemContainer}
            />
            <ListItem
              onPress={() => {}}
              title={strings('settings.label.faqs')}
              titleNumberOfLines={2}
              chevronColor="#C7C7CC"
              rightTitleStyle={styles.listItemRightTitle}
              titleStyle={styles.listItemTitle}
              titleContainerStyle={styles.listItemTitleContainer}
              containerStyle={styles.listItemContainer}
            />
            <ListItem
              onPress={() => {}}
              title={strings('settings.label.locationInfo')}
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
