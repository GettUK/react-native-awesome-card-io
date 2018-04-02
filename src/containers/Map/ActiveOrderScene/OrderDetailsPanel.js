import React from 'react';
import { View, Text, Dimensions, Image, TouchableWithoutFeedback, Linking } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';

import assets from 'assets';

import { Icon, PointList, JourneyDetails } from 'components';

import { FINAL_STATUSES, IN_PROGRESS_STATUS } from 'utils/orderStatuses';
import { formatPrice, isIphoneX } from 'utils';

import { vehiclesData, paymentTypeLabels } from 'containers/shared/bookings/data';

import SlidingUpPanel from './SlidingUpPanel';

import { orderPanelStyles } from './styles';

const OrderDetails = ({ order, driver, vehicles, visible, onActivate, onClose, navigation }) => {
  const height = Dimensions.get('window').height;

  const isDriverExist = driver && driver.info && !!driver.info.name;

  const callDriver = () => {
    Linking.openURL(`tel:${driver.info.phoneNumber}`);
  };

  const goToRateDriver = () => {
    navigation.navigate('RateDriver');
  };

  const renderHeader = () => <Text style={orderPanelStyles.header}>Order Details</Text>;

  const renderJourneyDetails = () => (
    <View key="journey" style={orderPanelStyles.activeContainer}>
      <JourneyDetails
        loading={vehicles.loading}
        time={driver.eta ? `${driver.eta} min` : vehicles.duration}
        distance={driver.distance
          ? `${driver.distance.value || '0.00'} ${driver.distance.unit || 'mi'}`
          : order.travelDistance
        }
      />
    </View>
  );

  const renderCarItem = () => {
    const vehicleType = order.vehicleType;
    const vehicleData = vehiclesData[vehicleType] || { label: 'Unknown' };

    const vehicle = vehicles.data.find(item => item.name === vehicleType) || {};

    return (<View key="car" style={orderPanelStyles.activeContainer}>
        <View style={[orderPanelStyles.listItem, orderPanelStyles.listContainer, orderPanelStyles.row]}>
          <Text style={[orderPanelStyles.title, { width: 100 }]}>
            {vehicleData.label}
          </Text>

          <Image
            style={{ width: 90 }}
            source={assets.carTypes[vehicleData.name]}
            resizeMode="contain"
          />

          <Text style={[orderPanelStyles.name, { width: 100, textAlign: 'right' }]}>
            {vehicle.price ? formatPrice(vehicle.price) : 'By meter'}
          </Text>
        </View>
      </View>
    );
  };

  const renderOption = ({ title, value, onPress }) => (<View key={title} style={orderPanelStyles.activeContainer}>
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={[orderPanelStyles.listItem, orderPanelStyles.row, { paddingVertical: 10 }]}>
        <Icon name="pickUpField" color="#c6c5cd" />

        <View style={orderPanelStyles.titleContainer}>
          <Text style={orderPanelStyles.title}>{title}</Text>
          <Text style={orderPanelStyles.name}>{value}</Text>
        </View>

        <Icon name="chevron" color="#c6c5cd" width={10} />
      </View>
    </TouchableWithoutFeedback>
  </View>);

  const renderDriverRating = () => (
    <View style={orderPanelStyles.activeContainer}>
      <View style={[orderPanelStyles.listItem, orderPanelStyles.row]}>
        <View>
          <Text style={orderPanelStyles.title}>Driver</Text>
          <Text style={orderPanelStyles.name}>{driver.info.name}</Text>
        </View>

        <View style={orderPanelStyles.rating}>
          <Text style={orderPanelStyles.ratingLabel}>{driver.info.rating}</Text>
        </View>
      </View>
    </View>
  );

  const renderPointList = () => {
    const data = {
      pickupAddress: order.pickupAddress,
      destinationAddress: order.destinationAddress,
      stops: order.stopAddresses
    };
    return (
      <PointList
        allowAddingStops={false}
        style={[orderPanelStyles.pickUpBtn, !isDriverExist ? orderPanelStyles.shadowLessPointList : {}]}
        data={data}
      />
    );
  };

  const renderBackdropComponent = () => {
    const options = [{ title: 'Order for', value: order.passenger }];

    if (!order.asap && order.scheduledAt) {
      options.push({ title: 'Future order', value: moment(order.scheduledAt).format('D MMM YYYY HH:mm a') });
    }

    if (order.messageToDriver) {
      options.push({ title: 'Message for driver', value: order.messageToDriver });
    }

    if (order.travelReason) {
      options.push({ title: 'Trip reason', value: order.travelReason });
    }

    if (order.paymentMethod) {
      options.push({ title: 'Payment method', value: paymentTypeLabels[order.paymentMethod] });
    }

    return (
      <View style={{ paddingBottom: 120 }}>
        {isDriverExist && renderDriverRating()}

        <View style={orderPanelStyles.activeContainer}>
          {renderPointList()}
        </View>

        {renderJourneyDetails()}
        {renderCarItem()}

        {options.map(renderOption)}
      </View>
    );
  };

  const renderCallBtn = () => (
    <TouchableWithoutFeedback onPress={callDriver}>
      <View style={[orderPanelStyles.roundContainer, orderPanelStyles.callButton]}>
        <Icon name="phone" color="#fff" />
      </View>
    </TouchableWithoutFeedback>
  );

  const renderRateBtn = () => (
    <TouchableWithoutFeedback onPress={goToRateDriver}>
      <View style={[orderPanelStyles.roundContainer, orderPanelStyles.rateButton]}>
        <Icon name="star" color="#fff" />
      </View>
    </TouchableWithoutFeedback>
  );

  const renderDriver = () => (
    <View style={orderPanelStyles.driverContainer}>
      <Image
        source={driver.info.imageUrl ? { uri: driver.info.imageUrl } : assets.aupairLarge}
        style={orderPanelStyles.roundContainer}
        resizeMode="contain"
      />

      <View style={orderPanelStyles.titleContainer}>
        <Text style={orderPanelStyles.driverTitle} numberOfLines={1}>
          {driver.info.vehicle ? driver.info.vehicle.model : 'Unknown'}
        </Text>
        <Text style={orderPanelStyles.driverSubtitle} numberOfLines={1}>
          {driver.info.vehicle ? `${driver.info.vehicle.color}, ${driver.info.vehicle.licensePlate || ''}` : 'Unknown'}
        </Text>
      </View>

      {(FINAL_STATUSES.includes(order.status) || order.status === IN_PROGRESS_STATUS)
        ? renderRateBtn()
        : renderCallBtn()
      }
    </View>
  );

  const renderActiveItem = () => (
    <View style={orderPanelStyles.activeContainer}>
      <View style={[orderPanelStyles.listItem, orderPanelStyles.activeItem, { height: isDriverExist ? 108 : 'auto' }]}>
        <Icon
          style={!visible ? { transform: [{ rotate: '180deg' }] } : {}}
          name="arrowDown"
          color="#c6c5cd"
          width={34}
        />

        {isDriverExist && renderDriver()}
      </View>
    </View>
  );

  const topIPhone = isIphoneX() ? 34 : 20;

  return (
    <SlidingUpPanel
      visible
      showBackdrop={false}
      draggableRange={{
        top: height - 60 - (60 + topIPhone),
        bottom: isDriverExist ? 148 : 80
      }}
      height={ isDriverExist ? 116 : 54}
      backdropComponent={renderBackdropComponent()}
      header={renderHeader()}
      closeButton={<Icon name="arrow" />}
      onActivate={onActivate}
      onClose={onClose}
    >
      {renderActiveItem()}
    </SlidingUpPanel>
  );
};

OrderDetails.propTypes = {
  navigation: PropTypes.object,
  visible: PropTypes.bool,
  onActivate: PropTypes.func,
  onClose: PropTypes.func,
  order: PropTypes.object,
  driver: PropTypes.object,
  vehicles: PropTypes.object
};

OrderDetails.defaultProps = {
  driver: {},
  visible: false,
  onActivate: () => {},
  onClose: () => {}
};

const mapState = ({ bookings }) => ({
  order: bookings.currentOrder,
  vehicles: bookings.formData.vehicles,
  driver: bookings.currentOrder.driverDetails
});

export default connect(mapState)(OrderDetails);
