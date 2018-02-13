import React, { PureComponent } from 'react';
import { View, Text, Image, FlatList } from 'react-native';
import { Icon } from 'components';
import moment from 'moment';
import assets from 'assets';
import { getOrders } from 'actions/app/orders';

import styles from './styles';
import { connect } from 'react-redux';

function getOrdersStatuses(type) {
  const statuses = {
    active: ['creating', 'locating', 'on_the_way', 'arrived', 'in_progress', 'order_received', 'customer_care', 'processing'],
    previous: ['completed', 'cancelled', 'rejected', 'billed']
  };
  return statuses[type];
}

function getLabelColor(status) {
  switch (status) {
    case 'arrived':
    case 'creating':
    case 'in_progress':
    case 'locating':
    case 'on_the_way':
    case 'processing':
    case 'order_received': {
      return 'yellow'
    }

    case 'rejected':
    case 'customer_care':
    case 'cancelled': {
      return 'red'
    }

    case 'completed':
    case 'billed': {
      return 'green'
    }
  }
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
    this.getOrders()
  }

  getOrders = () => {
    const { getOrders, type, items } = this.props;
    const { pagination, loading } = this.state;
    if (!loading && (items.length < pagination.total || !pagination.total) ) {
      this.setState({ loading: true });
      getOrders({ page: pagination.current + 1, status: getOrdersStatuses(type) })
        .then(res => {
          this.setState({ pagination: res.pagination, loading: false });
          this.props.navigation.setParams({ count: res.pagination.total });
        })
        .catch(() => {
          this.setState({ loading: false })
        });
    }
  };

  renderItem = ({ item }) => {
    return (
      <View key={item.id} style={styles.orderWrapper}>
        <View>
          <View style={styles.orderMap}>
            <Image source={assets.orderMap} />
          </View>
          <View style={styles.orderLabels}>
            <View style={[styles.orderLabel, styles[`${this.getLabelColor(item.status)}Label`]]}>
              <Text style={styles.orderLabelText}>{item.status}</Text>
            </View>
            {item.totalCost &&
              <View style={[styles.orderLabel, styles.blackLabel]}>
                <Text style={styles.orderLabelText}>£{item.totalCost}</Text>
              </View>
            }
          </View>
        </View>
        <View style={styles.orderDetails}>
          <Text style={styles.orderDate}>{moment(item.scheduledAt).format('lll')}</Text>
          <View style={[styles.orderAddress, styles.orderAddressGap]}>
            <Icon name="pickUpField" size={16} style={styles.orderAddressIcon} />
            <Text numberOfLines={1} style={styles.flex}>{item.pickupAddress.line}</Text>
          </View>
          {item.stopAddresses && item.stopAddresses.length > 0 &&
            item.stopAddresses.map((address, i) => (
              <View key={i} style={[styles.orderAddress, styles.orderAddressGap]}>
                <Icon
                  name="pickUpField"
                  color="#74818f"
                  size={10}
                  style={[styles.orderAddressIcon, styles.orderStopAddressIcon]}
                />
                <Text numberOfLines={1} style={styles.flex}>{address.line}</Text>
              </View>
            ))
          }
          <View style={styles.orderAddress}>
            <Icon name="pickUpField" color="#f00" size={16} style={styles.orderAddressIcon} />
            <Text numberOfLines={1} style={styles.flex}>{item.destinationAddress.line}</Text>
          </View>
        </View>
      </View>
    );
  };

  render() {
    const { loading } = this.state;
    const keyExtractor = item => item.id;
    return (
      <FlatList
        data={this.props.items}
        style={styles.orders}
        keyExtractor={keyExtractor}
        renderItem={this.renderItem}
        onEndReachedThreshold={0}
        onEndReached={this.getOrders}
        ListFooterComponent={loading && <Text style={{ textAlign: 'center' }}>Loading...</Text>}
        refreshing={loading}
      />
    );
  }
}

const mapState = (state, props) => ({
  items: state.app.orders.items.filter(i => getOrdersStatuses(props.type).includes(i.status))
});

const mapDispatch = (dispatch) => ({
  getOrders(params) {
    return getOrders(dispatch, params);
  }
});

export default connect(mapState, mapDispatch)(OrdersList);
