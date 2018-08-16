import React from 'react';
import { View, Text, Dimensions, Image, TouchableWithoutFeedback, Linking, Platform } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment-timezone';
import RNFetchBlob from 'react-native-fetch-blob';
import { Answers } from 'react-native-fabric';

import { Icon, PointList, JourneyDetails, Divider, RatingLabel, Button, CarImage } from 'components';

import { COMPLETED_STATUSES, FINAL_STATUSES, IN_PROGRESS_STATUS, DRIVER_ON_WAY } from 'utils/orderStatuses';
import { getFormatPrice, isIphoneX, getHeight, timeFormat } from 'utils';

import { onLayoutPointList } from 'actions/app/statuses';
import { color } from 'theme';
import { strings } from 'locales';

import { vehiclesData, paymentTypeLabels, receiptPaymentTypes, OTcars } from 'containers/shared/bookings/data';
import { getReceiptUrl } from 'containers/Receipt/utils';

import SlidingUpPanel from './SlidingUpPanel';

import { orderPanelStyles } from './styles';

const OrderDetails = ({
  app, order, references, driver, vehicles, visible, onActivate, onClose, navigation, onLayoutPointList, token
}) => {
  const height = Dimensions.get('window').height;
  const { statuses: { params: { connectBar } } } = app;

  const isDriverExist = driver && driver.info && !!driver.info.name;
  const isDriverPhoneExist = driver && driver.info && driver.info.phoneNumber;

  const callDriver = () => {
    Answers.logCustom('user clicks on call driver button', { phoneNumber: driver.info.phoneNumber });
    Linking.openURL(`tel:${driver.info.phoneNumber}`);
  };

  const goToRateDriver = () => {
    navigation.navigate('RateDriver');
  };

  const openReceipt = () => {
    if (Platform.OS === 'android') {
      navigation.navigate('Receipt', { orderId: order.id });
    } else {
      RNFetchBlob.config({
        indicator: true,
        path: `${RNFetchBlob.fs.dirs.CacheDir}/Receipt#${order.id}.pdf`
      })
        .fetch('POST', getReceiptUrl(order.id), {
          Authorization: `Bearer ${token}`
        })
        .then(res => RNFetchBlob.ios.openDocument(res.path()));
    }
  };

  const shouldShowReceiptBtn = () =>
    receiptPaymentTypes.includes(order.paymentMethod)
    && order.indicatedStatus === 'billed';

  const renderHeader = () => (
    <View style={orderPanelStyles.headerWrapper}>
      <View>
        <Text style={orderPanelStyles.header}>Order Details</Text>
        <View style={orderPanelStyles.subHeader}>
          <Text style={orderPanelStyles.subHeaderTitle}>Service ID:</Text>
          {order.serviceId && <Text style={orderPanelStyles.serviceId}>{order.serviceId}</Text>}
        </View>
      </View>
      {shouldShowReceiptBtn() &&
        <Button
          size="sm"
          onPress={openReceipt}
          styleContent={orderPanelStyles.receiptBtn}
          style={orderPanelStyles.receiptBtnWrapper}
        >
          <Icon name="receipt" size={18} />
          <Text style={orderPanelStyles.receiptBtnText}>{strings('order.button.receipt')}</Text>
          <Icon name="chevron" size={16} color={color.white} />
        </Button>
      }
    </View>
  );

  const renderOption = ({ title, value, icon, onPress, chevron }, i, arr) => (
    <View key={title} style={orderPanelStyles.listOption}>
      <TouchableWithoutFeedback onPress={onPress}>
        <View style={orderPanelStyles.row}>
          {icon && <Icon name={icon} color={color.pixelLine} />}

          <View style={orderPanelStyles.titleContainer}>
            <Text style={orderPanelStyles.title}>{title}</Text>
            <Text style={orderPanelStyles.name}>{value}</Text>
          </View>

          {chevron && <Icon name="chevron" color={color.pixelLine} width={10} />}
        </View>
      </TouchableWithoutFeedback>
      {i + 1 < arr.length && <Divider style={orderPanelStyles.divider} />}
    </View>
  );

  const renderAdditionalDetails = () => {
    const options = [{ title: 'Order for', value: order.passenger, icon: 'avatar' }];

    if (!order.asap && order.scheduledAt) {
      const scheduledAt = moment(order.scheduledAt).format(`D MMM YYYY ${timeFormat()}`);
      options.push({ title: 'Future order', value: scheduledAt, icon: 'futureOrder' });
    }

    if (order.messageToDriver) {
      options.push({ title: 'Message for driver', value: order.messageToDriver, icon: 'message' });
    }

    if (order.travelReason) {
      options.push({ title: 'Trip reason', value: order.travelReason, icon: 'rides' });
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
        <Text style={[orderPanelStyles.title]}>{vehicleData.label}</Text>

        <CarImage
          size="small"
          type={vehicleData.name}
          style={orderPanelStyles.carImage}
        />

        <Text style={[orderPanelStyles.name, orderPanelStyles.priceLabel]}>
          {getFormatPrice(order.fareQuote) || getFormatPrice(vehicle.price) || strings('app.label.byMeter')}
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
        <View style={orderPanelStyles.flex}>
          <Text style={orderPanelStyles.title}>Driver</Text>
          <Text style={orderPanelStyles.name}>{driver.info.name}</Text>
        </View>

        {driver.info.rating && <RatingLabel label={driver.info.rating} />}
      </View>
    </View>
  );

  const renderReferences = () => (
    <View style={orderPanelStyles.activeContainer}>
      <View style={[orderPanelStyles.listOption, orderPanelStyles.listOptionReferenceHeader]}>
        <Text style={orderPanelStyles.title}>{strings('order.text.bookingHeader')}</Text>
      </View>
      <View style={[orderPanelStyles.listItem, orderPanelStyles.listItemReference]}>
        {references.map(({ bookingReferenceName, value }, i, arr) => (
          renderOption({ title: bookingReferenceName, value }, i, arr)
        ))}
      </View>
    </View>
  );

  const renderBackdropComponent = () => (
    <View style={{ paddingBottom: isDriverExist ? 150 : 155 }}>
      {isDriverExist && renderDriverRating()}
      {renderJourneyDetails()}
      {renderAdditionalDetails()}
      {references && renderReferences()}
    </View>
  );

  const renderCallBtn = () => (isDriverPhoneExist &&
    <TouchableWithoutFeedback onPress={callDriver}>
      <View style={[orderPanelStyles.roundContainer, orderPanelStyles.callButton]}>
        <Icon name="call" color={color.white} size={18} />
      </View>
    </TouchableWithoutFeedback>
  );

  const renderRateBtn = () => (
    <TouchableWithoutFeedback onPress={goToRateDriver}>
      <View style={[orderPanelStyles.roundContainer, orderPanelStyles.rateButton]}>
        <Icon name="starEmpty" color={color.white} size={20} strokeWidth="2.5" />
      </View>
    </TouchableWithoutFeedback>
  );

  const renderDriver = () => (
    <View style={orderPanelStyles.driverContainer}>
      {driver.info.imageUrl
        ? <Image
          source={{ uri: driver.info.imageUrl }}
          style={orderPanelStyles.roundContainer}
          resizeMode="contain"
        />
        : <Icon name={OTcars.includes(order.vehicleType) ? 'OT' : 'Gett'} size={46} />
      }

      <View style={orderPanelStyles.titleContainer}>
        <Text style={orderPanelStyles.driverCarInfo} numberOfLines={2}>
          {driver.info.vehicle && driver.info.vehicle.color} {driver.info.vehicle && driver.info.vehicle.model}
        </Text>
        <Text style={orderPanelStyles.driverLicense} numberOfLines={1}>
          {strings('order.label.carReg')}: {driver.info.vehicle && driver.info.vehicle.licensePlate}
        </Text>
      </View>

      {(COMPLETED_STATUSES.includes(order.status) || order.status === IN_PROGRESS_STATUS)
        ? renderRateBtn()
        : !FINAL_STATUSES.includes(order.status) && renderCallBtn()
      }
    </View>
  );

  const renderActiveItem = () => (
    <View style={orderPanelStyles.activeContainer}>
      <View style={[orderPanelStyles.listItem, orderPanelStyles.activeItem, { height: isDriverExist ? 108 : 'auto' }]}>
        <Icon
          style={!visible ? { transform: [{ rotate: '180deg' }] } : {}}
          name="arrowDown"
          color={color.pixelLine}
          width={34}
        />

        {isDriverExist && renderDriver()}
      </View>
    </View>
  );

  const topIPhone = isIphoneX() ? 34 : 20;
  const bottomIPhone = isIphoneX() ? 12 : 0;
  const connectBarTop = getHeight(connectBar) > 0 ? (getHeight(connectBar) - topIPhone) : 0;

  return (
    <SlidingUpPanel
      visible
      showBackdrop={false}
      draggableRange={{
        top: height - 60 - (70 + topIPhone),
        bottom: (isDriverExist ? 128 : 59) + bottomIPhone + connectBarTop
      }}
      height={isDriverExist ? 120 : 54}
      backdropComponent={renderBackdropComponent()}
      header={renderHeader()}
      closeButton={<Icon name="arrow" />}
      onActivate={onActivate}
      onClose={onClose}
      opened={visible}
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
  vehicles: PropTypes.object,
  references: PropTypes.object
};

OrderDetails.defaultProps = {
  driver: {},
  visible: false,
  onActivate: () => {},
  onClose: () => {}
};

const mapState = ({ app, booking, session }) => ({
  app,
  order: booking.currentOrder,
  references: booking.currentOrder.references,
  vehicles: booking.vehicles,
  driver: booking.currentOrder.driverDetails,
  token: session.token
});

export default connect(mapState, { onLayoutPointList })(OrderDetails);
