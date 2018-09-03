import React, { PureComponent } from 'react';
import { View, Text, TouchableWithoutFeedback } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { strings } from 'locales';

import { getNotifications, clearNotificationsList, markAsRead } from 'actions/notifications';
import { setActiveBooking } from 'actions/booking';

import { ListView } from 'components';

import { withTheme } from 'providers';

import sortItems from './utils';
import { goBackFromSettings, getLabelType } from '../Orders/utils';

import styles from './styles';

const VIEWED_IDS = {};
let PREV_LENGTH = 0;

class Notifications extends PureComponent {
  static propTypes = {
    getNotifications: PropTypes.func.isRequired,
    setActiveBooking: PropTypes.func.isRequired,
    clearNotificationsList: PropTypes.func.isRequired,
    sections: PropTypes.array.isRequired
  }

  viewabilityConfig = {
    minimumViewTime: 10,
    viewAreaCoveragePercentThreshold: 60
  };

  state = {
    loading: false
  };

  componentDidMount() {
    this.requestNotifications();

    this.interval = setInterval(() => {
      const newLength = Object.keys(VIEWED_IDS).length;
      if (newLength > PREV_LENGTH) {
        this.props.markAsRead(VIEWED_IDS);
        PREV_LENGTH = newLength;
      }
    }, 1000);
  }

  componentWillUnmount() {
    this.props.clearNotificationsList();

    clearInterval(this.interval);
  }

  handleViewableItemsChanged = (viewableItems) => {
    viewableItems.forEach((item) => {
      if (item.key && !VIEWED_IDS[item.key]) {
        VIEWED_IDS[item.key] = item.key;
      }
    });
  }

  goToNotificationDetails = ({ bookingId }) => {
    const { setActiveBooking, navigation } = this.props;

    if (bookingId) {
      setActiveBooking(bookingId)
        .then(goBackFromSettings(navigation));
    }
  };

  requestNotifications = () => {
    const { getNotifications } = this.props;
    const { loading } = this.state;

    if (!loading) {
      this.setState({ loading: true });

      getNotifications()
        .then(() => this.setState({ loading: false }));
    }
  };

  renderSectionHeader = ({ index, section }) => (
    <Text
      key={index}
      style={[styles.sectionHeader, { color: this.props.theme.color.secondaryText }]}
    >
      {section.section}
    </Text>
  )

  renderStatusBar = item => (
    item.indicatedStatus &&
      <View
        style={[
          styles.notificationLabel,
          { backgroundColor: this.props.theme.color[`${getLabelType(item.indicatedStatus)}Light`] }
        ]}
      >
        <Text
          style={[
            styles.notificationLabelText,
            { color: this.props.theme.color[getLabelType(item.indicatedStatus)] }
          ]}
        >
          {strings(`order.status.${item.indicatedStatus}`).toUpperCase()}
        </Text>
      </View>
  )

  getItemStyle = (itemId) => {
    const { theme, readMessagesIds } = this.props;
    return ([
      styles.notificationWrapper,
      {
        backgroundColor: readMessagesIds[itemId]
          ? theme.color.bgPrimary
          : theme.formattedColor.success.opacity(0.5)
      }
    ]);
  };

  renderItem = ({ item }) => (
    <TouchableWithoutFeedback
      key={item.id}
      onPress={() => this.goToNotificationDetails(item)}
    >
      <View style={this.getItemStyle(item.id)}>
        <View style={styles.notificationDetails}>
          {item.title &&
            <View style={styles.rowMarginBottom}>
              <Text style={[styles.bodyText, { color: this.props.theme.color.primaryText }]}>
                {item.title}
              </Text>
            </View>}

          {item.body &&
            <View style={styles.rowMarginBottom}>
              <Text numberOfLines={5} style={{ color: this.props.theme.color.primaryText }}>
                {item.body}
              </Text>
            </View>}

          <View style={styles.row}>
            <Text
              style={[styles.notificationDate, { color: this.props.theme.color.secondaryText }]}
              numberOfLines={1}
            >
              {item.timestampDate}
            </Text>

            {this.renderStatusBar(item)}
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  )

  render() {
    const { sections, theme } = this.props;
    const { loading } = this.state;

    return (
      <View style={styles.container}>
        <ListView
          listViewStyle={{ backgroundColor: theme.color.bgSettings }}
          typeSections
          items={sections}
          loading={loading}
          renderItem={this.renderItem}
          renderSectionHeader={this.renderSectionHeader}
          viewabilityConfig={this.viewabilityConfig}
          onViewableItemsChanged={({ viewableItems }) => this.handleViewableItemsChanged(viewableItems)}
        />
      </View>
    );
  }
}

const mapState = ({ notifications: { items, readMessagesIds } }) => ({
  sections: sortItems(items),
  readMessagesIds
});

const mapDispatch = ({
  getNotifications,
  setActiveBooking,
  clearNotificationsList,
  markAsRead
});

export default connect(mapState, mapDispatch, null, { pure: false })(withTheme(Notifications));
