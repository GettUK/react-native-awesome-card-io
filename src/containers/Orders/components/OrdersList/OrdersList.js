import React, { PureComponent } from 'react';
import { View, Text, Image, FlatList, TouchableWithoutFeedback, Platform, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import moment from 'moment-timezone';
import findKey from 'lodash/findKey';

import { getOrders, clearOrdersList } from 'actions/orders';
import { setActiveBooking } from 'actions/booking';

import { strings } from 'locales';

import { Icon } from 'components';
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
    blue: ['arrived', 'creating', 'in_progress', 'locating', 'on_the_way', 'order_received'],
    red: ['rejected', 'customer_care', 'cancelled', 'processing'],
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
    this.props.clearOrdersList();
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

  // eslint-disable-next-line class-methods-use-this
  get mapSize() {
    const width = Dimensions.get('window').width - 30;
    const height = 140;
    return {
      size: `${width}x${height}`,
      width,
      height
    };
  }

  getOrders = () => {
    const { getOrders, type, idsType, items, meta, passengerId } = this.props;
    const { loading } = this.state;

    if (!loading && (!items.length || (items.length < meta.total))) {
      this.setState({ loading: true });

      const params = {
        page: meta.current + 1,
        order: 'scheduledAt',
        status: getOrdersStatuses(type || 'active'),
        reverse: true,
        mapSize: this.mapSize.size
      };

      if (idsType) {
        params[`${idsType}PassengerIds`] = [passengerId];
      }

      getOrders(params, idsType || type).then(() => this.setState({ loading: false }));
    }
  };

  renderItem = ({ item }) => (
    <TouchableWithoutFeedback key={item.id} onPress={() => this.goToOrderDetails(item.id)}>
      <View style={styles.orderWrapper}>
        <View>
          <View style={styles.orderMap}>
            <Image
              source={{ uri: item.staticMap }}
              style={{ width: this.mapSize.width, height: this.mapSize.height }}
            />
          </View>
        </View>
        <View style={styles.orderDetails}>
          <View style={styles.row}>
            <Text style={styles.orderDate} numberOfLines={1}>{moment(item.scheduledAt).format('lll')}</Text>
            <View style={[styles.orderLabel, styles[`${getLabelColor(item.status)}Label`]]}>
              <Text style={[styles.orderLabelText, styles[`${getLabelColor(item.status)}LabelText`]]}>
                {strings(`order.statuses.${item.status}`).toUpperCase()}
              </Text>
            </View>
          </View>
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
      </View>
    </TouchableWithoutFeedback>
  );

  keyExtractor = item => String(item.id);

  renderList = () => (
    <FlatList
      data={this.props.items}
      style={styles.orders}
      keyExtractor={this.keyExtractor}
      renderItem={this.renderItem}
      onEndReached={this.getOrders}
      ListFooterComponent={this.state.loading && Platform.OS === 'ios' &&
        <Text style={{ textAlign: 'center' }}>{strings('label.loading')}</Text>
      }
      refreshing={this.state.loading}
    />
  )

  renderAndroidLoadingLabel = () => (
    <View style={styles.loaderWrapper}>
      <View style={styles.loader}>
        <Text style={styles.loaderLabel}>{strings('label.loading')}</Text>
      </View>
    </View>
  )

  render() {
    const { loading } = this.state;
    const { items } = this.props;

    return (
      <View style={[styles.flex, styles.centered]}>
        {(items && items.length) || loading
          ? this.renderList()
          : <Text style={styles.emptyLabel}>{strings('label.emptyResult')}</Text>
        }

        {loading && Platform.OS === 'android' && this.renderAndroidLoadingLabel()}
      </View>
    );
  }
}

const mapState = (state, props) => ({
  items: state.orders[props.idsType || props.type].items,
  meta: state.orders[props.idsType || props.type].meta,
  passengerId: state.session.user.memberId
});

const mapDispatch = ({
  getOrders,
  setActiveBooking,
  clearOrdersList
});

export default connect(mapState, mapDispatch)(OrdersList);
