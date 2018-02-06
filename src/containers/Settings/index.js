import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ScrollView, View } from 'react-native';
import { ListItem as ListItemEl, Avatar } from 'react-native-elements';
import { strings } from 'locales';
import styles from './style';

class Settings extends Component {
  componentDidMount() {}
  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container}>
          <View style={styles.blockItems}>
            <ListItemEl
              onPress={() => {}}
              avatar={<Avatar
                rounded
                medium
                source={{uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg'}}
                title="Artem Korenev"
              />}
              title="Artem Korenev"
              titleNumberOfLines={2}
              chevronColor="#C7C7CC"
              rightTitleStyle={styles.listItemRightTitle}
              titleStyle={[styles.listItemTitle, styles.avatarTitle]}
              titleContainerStyle={styles.listItemTitleContainer}
              containerStyle={[styles.listItemContainer, styles.avatarContainer]}
            />
            <ListItemEl
              onPress={() => {}}
              title={strings('settings.phoneLabel')}
              titleNumberOfLines={2}
              rightTitle="+372-849-11-22"
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
              rightTitle="akorenev@sphereinc.com"
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
              rightTitle="Black Taxi"
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
              rightTitle="Street: 89 Daystar City: Teha"
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
              rightTitle="Street: 1341 Randy City: St. H"
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
              switched
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
              switched={false}
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
              switched
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
              switched
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
              switched={false}
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
  ui: PropTypes.object.isRequired
};

Settings.defaultProps = {};

const select = ({ ui }) => ({
  ui
});

const bindActions = {};

export default connect(select, bindActions)(Settings);
