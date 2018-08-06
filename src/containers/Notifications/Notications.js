import React, { PureComponent } from 'react';
import { View, Text, TouchableWithoutFeedback } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { strings } from 'locales';

import { getNotifications, clearNotificationsList } from 'actions/notifications';
import { setActiveBooking } from 'actions/booking';

import { ListView } from 'components';

import sortItems from './util';
import { goBackFromSettings } from '../Orders/util';

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
    <Text key={index} style={styles.sectionHeader}>{section.section}</Text>
  )

  renderItem = ({ item }) => (
    <TouchableWithoutFeedback key={item.id} onPress={() => this.goToNotificationDetails(item.booking_id)}>
      <View style={styles.notificationWrapper}>
        <View style={styles.notificationDetails}>

          {item.title &&
            <View style={styles.rowMarginBottom}>
              <Text style={styles.bodyText}>
                {item.title}
              </Text>
            </View>}

          {item.body &&
            <View style={styles.rowMarginBottom}>
              <Text numberOfLines={5}>
                {item.body}
              </Text>
            </View>}

          <View style={styles.row}>
            <Text style={styles.notificationDate} numberOfLines={1}>{item.timestampDate}</Text>
            {item.indicatedStatus && <View style={[styles.notificationLabel, styles[`${item.labelColor}Label`]]}>
              <Text style={[styles.notificationLabelText, styles[`${item.labelColor}LabelText`]]}>
                {strings(`order.status.${item.indicatedStatus}`).toUpperCase()}
              </Text>
            </View>}
          </View>

        </View>
      </View>
    </TouchableWithoutFeedback>
  )

  render() {
    const { sections } = this.props;
    const { loading } = this.state;

    return (
      <View style={styles.container}>
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

export default connect(mapState, mapDispatch)(Notifications);
