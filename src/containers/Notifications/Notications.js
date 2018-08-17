import React, { PureComponent } from 'react';
import { View, Text, TouchableWithoutFeedback } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { strings } from 'locales';

import { getNotifications, clearNotificationsList } from 'actions/notifications';
import { setActiveBooking } from 'actions/booking';

import { ListView } from 'components';

import { withTheme } from 'providers';

import sortItems from './utils';
import { goBackFromSettings, getLabelType } from '../Orders/utils';

import styles from './styles';

class Notifications extends PureComponent {
  static propTypes = {
    getNotifications: PropTypes.func.isRequired,
    setActiveBooking: PropTypes.func.isRequired,
    clearNotificationsList: PropTypes.func.isRequired,
    sections: PropTypes.array.isRequired
  }

  state = {
    loading: false
  };

  componentDidMount() {
    this.requestNotifications();
  }

  componentWillUnmount() {
    this.props.clearNotificationsList();
  }

  goToNotificationDetails = (id) => {
    const { setActiveBooking, navigation } = this.props;

    if (id) {
      setActiveBooking(id)
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

  renderItem = ({ item }) => (
    <TouchableWithoutFeedback key={item.id} onPress={() => this.goToNotificationDetails(item.bookingId)}>
      <View style={[styles.notificationWrapper, { backgroundColor: this.props.theme.color.bgPrimary }]}>
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
      <View style={[styles.container, { backgroundColor: theme.color.bgSettings }]}>
        <ListView
          typeSections
          items={sections}
          loading={loading}
          renderItem={this.renderItem}
          renderSectionHeader={this.renderSectionHeader}
        />
      </View>
    );
  }
}

const mapState = state => ({
  sections: sortItems(state.notifications.items)
});

const mapDispatch = ({
  getNotifications,
  setActiveBooking,
  clearNotificationsList
});

export default connect(mapState, mapDispatch, null, { pure: false })(withTheme(Notifications));
