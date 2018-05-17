import React, { PureComponent } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, Platform } from 'react-native';
import { connect } from 'react-redux';
import moment from 'moment-timezone';
import findKey from 'lodash/findKey';

import assets from 'assets';

import { getOrders, clearList } from 'actions/orders';
import { setActiveBooking } from 'actions/booking';

import { Icon } from 'components';
import { formatPrice } from 'utils';
import styles from './styles';

function getOrdersStatuses(type) {
  const statuses = {
    // eslint-disable-next-line max-len
    active: ['creating', 'locating', 'on_the_way', 'arrived', 'in_progress', 'order_received', 'customer_care', 'processing'],
    previous: ['completed', 'cancelled', 'rejected', 'billed']
  };
  return statuses[type];
}

function getLabelColor(status) {
  const colors = {
    yellow: ['arrived', 'creating', 'in_progress', 'locating', 'on_the_way', 'processing', 'order_received'],
    red: ['rejected', 'customer_care', 'cancelled'],
    green: ['completed', 'billed']
  };

  return findKey(colors, s => s.includes(status));
}

class OrdersList extends PureComponent {
  state = {
    pagination: {
      current: 0,
      total: 0
    },
    loading: false
  };

  componentDidMount() {
    this.getOrders();

    if (this.props.meta) {
      this.updateCounter(this.props.meta);
    }
  }

  componentDidUpdate({ meta: metaProps }) {
    const { meta } = this.props;

    if (meta && (!metaProps || meta.total !== metaProps.total)) {
      this.updateCounter(meta);
    }
  }

  componentWillUnmount() {
    this.props.clearList();
  }

  goToOrderDetails = (id) => {
    const { setActiveBooking, navigation } = this.props;
    setActiveBooking(id)
      .then(() => {
        navigation.state.params.onBack({ fromSettings: navigation.state.params.fromSettings });

        navigation.goBack(null);
      });
  };

  updateCounter = (meta) => {
    const { navigation } = this.props;

    navigation.setParams({ count: meta.total });
  };

  getOrders = () => {
    const { getOrders, type, idsType, items, meta, passengerId } = this.props;
    const { loading } = this.state;

    if (!loading && (!items.length || (items.length < meta.total))) {
      this.setState({ loading: true });

      const params = {
        page: meta.current + 1,
        order: 'scheduledAt',
        status: getOrdersStatuses(type || 'active'),
        reverse: true
      };

      if (idsType) {
        params[`${idsType}PassengerIds`] = [passengerId];
      }

      getOrders(params, idsType || type).then(() => this.setState({ loading: false }));
    }
  };

  renderItem = ({ item }) => (
      <View key={item.id} style={styles.orderWrapper}>
        <View>
          <View style={styles.orderMap}>
            <Image source={assets.orderMap} />
          </View>
          <View style={styles.orderLabels}>
            <View style={[styles.orderLabel, styles[`${getLabelColor(item.status)}Label`]]}>
              <Text style={styles.orderLabelText}>{item.status}</Text>
            </View>
            {item.totalCost > 0 &&
              <View style={[styles.orderLabel, styles.blackLabel]}>
                <Text style={styles.orderLabelText}>{formatPrice(item.totalCost)}</Text>
              </View>
            }
          </View>
        </View>
        <View style={styles.orderDetails}>
          <Text style={styles.orderDate}>{moment(item.scheduledAt).format('lll')}</Text>
          <View style={[styles.orderAddress, styles.orderAddressGap]}>
            <View style={styles.iconContainer}>
              <Icon name="pickUpField" size={16} style={styles.orderAddressIcon} />
              <Icon style={[styles.connector, styles.pickUpConnector]} height={12} name="dottedLine" />
            </View>
            <Text numberOfLines={1} style={styles.flex}>{item.pickupAddress.line}</Text>
          </View>
          {item.stopAddresses && item.stopAddresses.length > 0 &&
            item.stopAddresses.map((address, i) => (
              <View key={i} style={[styles.orderAddress, styles.orderAddressGap]}>
                <View style={styles.iconContainer}>
                  <Icon
                    name="pickUpField"
                    color="#74818f"
                    size={12}
                    style={[styles.orderAddressIcon, styles.orderStopAddressIcon]}
                  />
                  <Icon style={styles.connector} height={12} name="dottedLine" />
                </View>
                <Text numberOfLines={1} style={styles.flex}>{address.line}</Text>
              </View>
            ))
          }
          <View style={styles.orderAddress}>
            <Icon name="destinationMarker" width={16} style={styles.orderAddressIcon} />
            <Text numberOfLines={1} style={styles.flex}>{item.destinationAddress && item.destinationAddress.line}</Text>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => this.goToOrderDetails(item.id)}
          activeOpacity={0.6}
          style={styles.goToDetailsBtn}
        >
          <Text style={styles.goToDetailsText}>Details</Text>
          <View style={styles.goToDetailsIcon}>
            <Icon name="arrow" size={14} color="#5389df" />
          </View>
        </TouchableOpacity>
      </View>
  );

  keyExtractor = item => String(item.id);

  render() {
    const { loading } = this.state;

    return (
      <View style={styles.flex}>
        <FlatList
          data={this.props.items}
          style={styles.orders}
          keyExtractor={this.keyExtractor}
          renderItem={this.renderItem}
          onEndReached={this.getOrders}
          ListFooterComponent={loading && Platform.OS === 'ios' &&
            <Text style={{ textAlign: 'center' }}>Loading...</Text>
          }
          refreshing={loading}
        />

        {loading && Platform.OS === 'android' &&
          <View style={styles.loaderWrapper}>
            <View style={styles.loader}>
              <Text style={styles.loaderLabel}>Loading...</Text>
            </View>
          </View>
        }
      </View>
    );
  }
}

const mapState = (state, props) => ({
  items: state.orders[props.idsType || props.type].items,
  meta: state.orders[props.idsType || props.type].meta,
  passengerId: state.session.result.memberId
});

const mapDispatch = ({
  getOrders,
  setActiveBooking,
  clearList
});

export default connect(mapState, mapDispatch)(OrdersList);
