import React, { PureComponent } from 'react';
import { View, Text, Image, TouchableWithoutFeedback, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import moment from 'moment-timezone';
import { debounce, isEqual } from 'lodash';
import { color } from 'theme';

import { getOrders, clearOrdersList, initialOrdersList } from 'actions/orders';
import { setActiveBooking } from 'actions/booking';

import { strings } from 'locales';
import config from 'config';

import { ListView, Icon } from 'components';
import styles from './styles';
import mapStyles from './mapStyles';

import { getLabelColor, getOrdersStatuses } from '../../util';

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

  componentDidUpdate({ meta: metaProps, ordersParams: ordersParamsProps }) {
    const { meta, ordersParams } = this.props;
    if (!isEqual(ordersParams, ordersParamsProps)) {
      this.getOrders();
    }

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

  getOrders = debounce((nextPageRequired = false) => {
    const { getOrders, type, idsType, items, meta, passengerId, ordersParams, initialOrdersList } = this.props;
    const { loading } = this.state;

    if (!loading && (!items.length || items.length < meta.total || !nextPageRequired)) {
      this.setState({ loading: true });

      if (!nextPageRequired) {
        initialOrdersList(idsType || type);
      }

      const params = {
        page: ((nextPageRequired && meta.current) || 0) + 1,
        order: 'scheduledAt',
        status: getOrdersStatuses(type || 'active'),
        reverse: true,
        mapSize: this.mapSize.size,
        ...ordersParams
      };

      if (idsType) {
        params[`${idsType}PassengerIds`] = [passengerId];
      }

      getOrders(params, idsType || type, nextPageRequired).then(() => this.setState({ loading: false }));
    }
  }, 750);

  renderItem = ({ item }) => (
    <TouchableWithoutFeedback key={item.id} onPress={() => this.goToOrderDetails(item.id)}>
      <View style={styles.orderWrapper}>
        <View>
          <View style={styles.orderMap}>
            <Image
              source={{ uri: `${item.staticMap}&${mapStyles}&key=${config.googleAPIKey}` }}
              style={[{ width: this.mapSize.width, height: this.mapSize.height }, styles.orderMap]}
            />
          </View>
        </View>
        <View style={styles.orderDetails}>
          <View style={styles.row}>
            <Text style={styles.orderDate} numberOfLines={1}>{moment(item.scheduledAt).format('lll')}</Text>
            <View style={[styles.orderLabel, styles[`${getLabelColor(item.indicatedStatus)}Label`]]}>
              <Text style={[styles.orderLabelText, styles[`${getLabelColor(item.indicatedStatus)}LabelText`]]}>
                {strings(`order.status.${item.indicatedStatus}`).toUpperCase()}
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
                    color={color.secondaryText}
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

  onEndReached = () => this.getOrders(true);

  render() {
    const { loading } = this.state;
    const { items } = this.props;

    return (
      <ListView
        typeSections={false}
        items={items}
        renderItem={this.renderItem}
        loading={loading}
        refreshing={loading}
        onEndReached={this.onEndReached}
      />
    );
  }
}

const mapState = (state, props) => ({
  ordersParams: state.orders.meta,
  items: state.orders[props.idsType || props.type].items,
  meta: state.orders[props.idsType || props.type].meta,
  passengerId: state.session.user.memberId
});

const mapDispatch = ({
  getOrders,
  setActiveBooking,
  initialOrdersList,
  clearOrdersList
});

export default connect(mapState, mapDispatch)(OrdersList);
