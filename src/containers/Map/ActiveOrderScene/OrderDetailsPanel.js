import React from 'react';
import { View, Text, Dimensions, Image, TouchableWithoutFeedback, Linking } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment-timezone';

import assets from 'assets';

import { Icon, PointList, JourneyDetails, Divider, RatingLabel } from 'components';

import { FINAL_STATUSES, IN_PROGRESS_STATUS, DRIVER_ON_WAY } from 'utils/orderStatuses';
import { getFormatPrice, isIphoneX } from 'utils';

import { onLayoutPointList } from 'actions/app/statuses';
import { strings } from 'locales';

import { vehiclesData, paymentTypeLabels } from 'containers/shared/bookings/data';

import SlidingUpPanel from './SlidingUpPanel';

import { orderPanelStyles } from './styles';

const OrderDetails = ({ order, driver, vehicles, visible, onActivate, onClose, navigation, onLayoutPointList }) => {
  const height = Dimensions.get('window').height;

  const isDriverExist = driver && driver.info && !!driver.info.name;

  const callDriver = () => {
    Linking.openURL(`tel:${driver.info.phoneNumber}`);
  };

  const goToRateDriver = () => {
    navigation.navigate('RateDriver');
  };

  const renderHeader = () => (
    <View>
      <Text style={orderPanelStyles.header}>Order Details</Text>
      <View style={orderPanelStyles.subHeader}>
        <Text style={orderPanelStyles.subHeaderTitle}>Service ID:</Text>
        {order.serviceId && <Text style={orderPanelStyles.serviceId}>{order.serviceId}</Text>}
      </View>
    </View>
  );

  const renderOption = ({ title, value, icon, onPress, chevron }, i, arr) => (
    <View key={title} style={orderPanelStyles.listOption}>
      <TouchableWithoutFeedback onPress={onPress}>
        <View style={orderPanelStyles.row}>
          <Icon name={icon} color="#c6c5cd" />

          <View style={orderPanelStyles.titleContainer}>
            <Text style={orderPanelStyles.title}>{title}</Text>
            <Text style={orderPanelStyles.name}>{value}</Text>
          </View>

          {chevron && <Icon name="chevron" color="#c6c5cd" width={10} />}
        </View>
      </TouchableWithoutFeedback>
      {i + 1 < arr.length && <Divider style={orderPanelStyles.divider} />}
    </View>
  );

  const renderAdditionalDetails = () => {
    const options = [{ title: 'Order for', value: order.passenger, icon: 'avatar' }];

    if (!order.asap && order.scheduledAt) {
      const scheduledAt = moment(order.scheduledAt).format('D MMM YYYY HH:mm a');
      options.push({ title: 'Future order', value: scheduledAt, icon: 'futureOrder' });
    }

    if (order.messageToDriver) {
      options.push({ title: 'Message for driver', value: order.messageToDriver, icon: 'message' });
    }

    if (order.travelReason) {
      options.push({ title: 'Trip reason', value: order.travelReason, icon: 'tripReason' });
    }

    if (order.paymentMethod) {
      options.push({ title: 'Payment method', value: paymentTypeLabels[order.paymentMethod], icon: 'paymentMethod' });
    }

    return (
      <View key="details" style={orderPanelStyles.activeContainer}>
        <View style={orderPanelStyles.listItem}>
          {options.map(renderOption)}
        </View>
      </View>
    );
  };

  const renderCarItem = () => {
    const vehicleType = order.vehicleType;
    const vehicleData = vehiclesData[vehicleType] || { label: 'Unknown' };

    const vehicle = vehicles.data.find(item => item.name === vehicleType) || {};

    return (
      <View key="car" style={orderPanelStyles.row}>
        <Text style={[orderPanelStyles.title, { width: 100 }]}>{vehicleData.label}</Text>

        <Image
          style={{ width: 90 }}
          source={assets.carTypes[vehicleData.name]}
          resizeMode="contain"
        />

        <Text style={[orderPanelStyles.name, orderPanelStyles.priceLabel]}>
          {getFormatPrice(order.fareQuote) || getFormatPrice(vehicle.price) || strings('label.byMeter')}
        </Text>
      </View>
    );
  };

  const renderPointList = () => {
    const data = {
      pickupAddress: order.pickupAddress,
      destinationAddress: order.destinationAddress,
      stops: order.stopAddresses
    };
    return (
      <PointList
        onLayout={onLayoutPointList}
        allowAddingStops={false}
        style={orderPanelStyles.pointList}
        data={data}
      />
    );
  };

  const renderJourneyDetails = () => (
    <View key="journey" style={orderPanelStyles.activeContainer}>
      <View style={orderPanelStyles.listItem}>
        {renderPointList()}
        <Divider style={orderPanelStyles.divider} />
        {order.status === DRIVER_ON_WAY && [
            <JourneyDetails
              key="journeyDetails"
              style={orderPanelStyles.journeyDetails}
              time={`${driver.eta || 'N/A'} min`}
              timeLabel="eta"
              distance={`${driver.distance.value || '0.00'} ${driver.distance.unit || 'mi'}`}
            />,
            <Divider key="divider" style={orderPanelStyles.divider} />
          ]
        }
        {renderCarItem()}
      </View>
    </View>
  );

  const renderDriverRating = () => (
    <View style={orderPanelStyles.activeContainer}>
      <View style={[orderPanelStyles.listItem, orderPanelStyles.row]}>
        <View>
          <Text style={orderPanelStyles.title}>Driver</Text>
          <Text style={orderPanelStyles.name}>{driver.info.name}</Text>
        </View>

        {driver.info.rating && <RatingLabel label={driver.info.rating} />
        }
      </View>
    </View>
  );

  const renderBackdropComponent = () => (
    <View style={{ paddingBottom: isDriverExist ? 150 : 155 }}>
      {isDriverExist && renderDriverRating()}
      {renderJourneyDetails()}
      {renderAdditionalDetails()}
    </View>
  );

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
      <View style={[orderPanelStyles.listItem, orderPanelStyles.activeItem, { height: isDriverExist ? 100 : 'auto' }]}>
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
  const bottomIPhone = isIphoneX() ? 12 : 0;

  return (
    <SlidingUpPanel
      visible
      showBackdrop={false}
      draggableRange={{
        top: height - 60 - (70 + topIPhone),
        bottom: (isDriverExist ? 120 : 59) + bottomIPhone
      }}
      height={isDriverExist ? 112 : 54}
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

const mapState = ({ booking }) => ({
  order: booking.currentOrder,
  vehicles: booking.vehicles,
  driver: booking.currentOrder.driverDetails
});

export default connect(mapState, { onLayoutPointList })(OrderDetails);
