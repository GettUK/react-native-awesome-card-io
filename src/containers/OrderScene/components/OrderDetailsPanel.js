import React, { Fragment } from 'react';
import { View, Text, Dimensions, Image, TouchableWithoutFeedback, Linking, Platform } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import RNFetchBlob from 'react-native-fetch-blob';
import { Answers } from 'react-native-fabric';

import { Icon, PointList, JourneyDetails, Divider, RatingLabel, Button, CarImage } from 'components';

import {
  COMPLETED_STATUSES,
  FINAL_STATUSES,
  IN_PROGRESS_STATUS,
  DRIVER_ON_WAY
} from 'utils/orderStatuses';
import { getFormatPrice, isIphoneX, getHeight } from 'utils';

import { onLayoutPointList } from 'actions/app/statuses';
import {
  changeFields,
  changeAddress,
  getVehicles,
  createBooking,
  saveFlight,
  setReferenceErrors,
  validateReferences,
  saveAvailableCarsScroll,
  updateBooking
} from 'actions/booking';
import { getPassengerData } from 'actions/passenger';
import { color } from 'theme';
import { strings } from 'locales';

import { vehiclesData, paymentTypeLabels, OTcars, receiptPaymentTypes } from 'containers/shared/bookings/data';
import { getReceiptUrl } from 'containers/Receipt/utils';

import { withTheme } from 'providers';

import BookingController from 'containers/BookingController';

import SlidingUpPanel from './SlidingUpPanel';

import { orderPanelStyles } from './styles';

import { shouldCallDispatcher } from '../utils';

const height = Dimensions.get('window').height;
const topIPhone = isIphoneX() ? 34 : 20;
const bottomIPhone = isIphoneX() ? 12 : 0;

const shouldShowReceiptBtn = order =>
  receiptPaymentTypes.includes(order.paymentMethod) && order.indicatedStatus === 'billed';

class OrderDetails extends BookingController {
  componentDidUpdate(prevProps) {
    super.componentDidUpdate(prevProps);

    const { booking: { bookingForm: bookingFormProps } } = prevProps;

    if (this.isFutureOrderEdit()) this.requestVehiclesOnOrderChange(bookingFormProps);
  }

  callDriver = () => {
    const { booking: { currentOrder } } = this.props;
    const { driverDetails: driver } = currentOrder;
    Answers.logCustom('user clicks on call driver button', { phoneNumber: driver.info.phoneNumber });
    Linking.openURL(`tel:${driver.info.phoneNumber}`);
  };

  callDispatcher = () => {
    const { booking: { currentOrder } } = this.props;
    Answers.logCustom('user clicks on call fleet button', { phoneNumber: currentOrder.vendorPhone });
    Linking.openURL(`tel:${currentOrder.vendorPhone}`);
  };

  goToRateDriver = () => this.props.navigation.navigate('RateDriver');

  renderReferences = () => {
    const { booking: { currentOrder }, theme } = this.props;
    const { references } = currentOrder;

    return (
      <View style={orderPanelStyles.activeContainer}>
        <View
          style={[
            orderPanelStyles.listOption,
            orderPanelStyles.listOptionReferenceHeader,
            { backgroundColor: theme.color.bgSettings }
          ]}
        >
          <Text style={orderPanelStyles.title}>{strings('order.text.bookingReference')}</Text>
        </View>
        <View
          style={[
            orderPanelStyles.listItem,
            orderPanelStyles.listItemReference,
            { backgroundColor: theme.color.bgPrimary }
          ]}
        >
          {references.map(({ bookingReferenceName, value }, i, arr) => (
            this.renderOption({ title: bookingReferenceName, value, chevron: false }, i, arr)
          ))}
        </View>
      </View>
    );
  };

  renderOption = ({ title, value, icon, onPress, chevron = true, modalComponent }, i, arr) => {
    const { theme } = this.props;
    return (
      <View key={title} style={orderPanelStyles.listOption}>
        {modalComponent}
        <TouchableWithoutFeedback onPress={onPress}>
          <View style={orderPanelStyles.row}>
            {icon && <Icon name={icon} color={color.pixelLine} />}

            <View style={orderPanelStyles.titleContainer}>
              <Text style={orderPanelStyles.title}>{title}</Text>
              <Text style={[orderPanelStyles.name, { color: theme.color.primaryText }]}>{value}</Text>
            </View>

            {chevron && <Icon name="chevron" color={color.pixelLine} width={10} />}
          </View>
        </TouchableWithoutFeedback>
        {i + 1 < arr.length && <Divider style={orderPanelStyles.divider} />}
      </View>
    );
  };

  getOptions = () => {
    const { booking: { currentOrder } } = this.props;
    const options = [{
      title: 'Order for',
      value: currentOrder.passenger,
      icon: 'avatar',
      chevron: false
    }];

    if (currentOrder.messageToDriver) {
      options.push({
        title: 'Message for driver',
        value: currentOrder.messageToDriver,
        icon: 'message',
        chevron: false
      });
    }

    if (currentOrder.travelReason) {
      options.push({
        title: 'Trip reason',
        value: currentOrder.travelReason,
        icon: 'rides',
        chevron: false
      });
    }

    if (currentOrder.paymentMethod) {
      options.push({
        title: 'Payment method',
        value: paymentTypeLabels[currentOrder.paymentMethod],
        icon: 'paymentMethod',
        chevron: false
      });
    }

    return options;
  };

  renderAdditionalDetails = () => {
    const { theme } = this.props;
    const options = this.isFutureOrderEdit()
      ? this.getAdditionalDetailsItems({ isOrderEditing: true })
      : this.getOptions();

    return (
      <View key="details" style={orderPanelStyles.activeContainer}>
        <View style={[orderPanelStyles.listItem, { backgroundColor: theme.color.bgPrimary }]}>
          {options.map(this.renderOption)}
        </View>
      </View>
    );
  };

  renderCarItem = () => {
    const { booking: { currentOrder, vehicles }, theme } = this.props;
    const vehicleType = currentOrder.vehicleType;
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

        <Text style={[orderPanelStyles.name, orderPanelStyles.priceLabel, { color: theme.color.primaryText }]}>
          {getFormatPrice(currentOrder.fareQuote) || getFormatPrice(vehicle.price) || strings('app.label.byMeter')}
        </Text>
      </View>
    );
  };

  renderPointList = ({ style }) => {
    const { onLayoutPointList } = this.props;
    const order = this.getOrder();
    const props = this.isFutureOrderEdit()
      ? {
        onAddressPress: this.openAddressModal,
        onStopAdd: this.showStopPointsModal,
        noItemMargin: false,
        destinationStyleModifier: { marginTop: 0 },
        allowAddingStops: true,
        allowEditing: true
      }
      : {
        allowAddingStops: false,
        allowEditing: false
      };

    return (
      <PointList
        {...props}
        onLayout={onLayoutPointList}
        style={style}
        data={order}
        stopAsList
        noItemMargin={false}
      />
    );
  };

  renderJourneyDetails = () => {
    const { booking: { currentOrder }, theme } = this.props;
    const { driverDetails: driver } = currentOrder;

    return (
      <Fragment>
        {this.isFutureOrderEdit() &&
          this.renderPickUpTime({ style: orderPanelStyles.pickUpTimeWrapper, title: 'Future order', disableNow: true })
        }
        <View key="journey" style={orderPanelStyles.activeContainer}>
          <View style={[orderPanelStyles.listItem, { backgroundColor: theme.color.bgPrimary }]}>
            {this.renderPointList({ style: orderPanelStyles.pointList })}
            <Divider style={orderPanelStyles.divider} />
            {currentOrder.status === DRIVER_ON_WAY && [
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
            {this.isFutureOrderEdit() ? this.renderCars({ style: orderPanelStyles.noVehicles }) : this.renderCarItem()}
          </View>
        </View>
      </Fragment>
    );
  };

  renderCallFleetBtn = () => (
    <TouchableWithoutFeedback onPress={this.callDispatcher}>
      <View style={orderPanelStyles.activeContainer}>
        <View style={orderPanelStyles.listItem}>
          <View style={[orderPanelStyles.driverContainer, orderPanelStyles.fleetContainer]}>
            <Icon name="dispatcher" color={color.white} size={30} strokeWidth="2.5" />
            <Text style={orderPanelStyles.callDispatcherText}>{strings('order.button.callDispatcherFull')}</Text>
            <Icon name="chevron" color={color.pixelLine} width={20} />
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );

  renderDriverRating = () => {
    const { booking: { currentOrder }, theme } = this.props;
    const { driverDetails: driver } = currentOrder;

    return (
      <View style={orderPanelStyles.activeContainer}>
        <View style={[orderPanelStyles.listItem, orderPanelStyles.row, { backgroundColor: theme.color.bgPrimary }]}>
          <View style={orderPanelStyles.flex}>
            <Text style={orderPanelStyles.title}>Driver</Text>
            <Text style={[orderPanelStyles.name, { color: theme.color.primaryText }]}>{driver.info.name}</Text>
          </View>

          {driver.info.rating && <RatingLabel label={driver.info.rating} />}
        </View>
      </View>
    );
  };

  renderBackdropComponent = () => {
    const { booking: { currentOrder } } = this.props;
    const { driverDetails: driver, references } = currentOrder;
    const isDriverExist = driver && driver.info && !!driver.info.name;

    return (
      <View style={{ paddingBottom: isDriverExist ? 150 : 155 }}>
        {isDriverExist && this.renderDriverRating()}
        {shouldCallDispatcher(currentOrder) ? this.renderCallFleetBtn() : null}
        {this.renderJourneyDetails()}
        {this.renderAdditionalDetails()}
        {references && references.length > 0 && this.renderReferences()}
      </View>
    );
  };

  openReceipt = () => {
    const { navigation, booking: { currentOrder }, session: { token } } = this.props;
    if (Platform.OS === 'android') {
      navigation.navigate('Receipt', { orderId: currentOrder.id });
    } else {
      RNFetchBlob.config({
        indicator: true,
        path: `${RNFetchBlob.fs.dirs.CacheDir}/Receipt#${currentOrder.id}.pdf`
      })
        .fetch('POST', getReceiptUrl(currentOrder.id), {
          Authorization: `Bearer ${token}`
        })
        .then(res => RNFetchBlob.ios.openDocument(res.path()));
    }
  };

  renderHeader = () => {
    const { booking: { currentOrder } } = this.props;
    return (
      <View style={[orderPanelStyles.headerWrapper]}>
        {shouldCallDispatcher(currentOrder)
          ? (
            <View style={orderPanelStyles.headerNoInfoWrapper}>
              <Text style={orderPanelStyles.headerNoInfoText}>{strings('order.text.noDriverInfo')}</Text>
            </View>
          )
          : (
            <View>
              <Text style={orderPanelStyles.header}>Order Details</Text>
              <View style={orderPanelStyles.subHeader}>
                <Text style={orderPanelStyles.subHeaderTitle}>Service ID:</Text>
                {currentOrder.serviceId &&
                  <Text style={orderPanelStyles.serviceId} adjustsFontSizeToFit minimumFontScale={0.5}>
                    {currentOrder.serviceId}
                  </Text>
                }
              </View>
            </View>
          )}
        {shouldShowReceiptBtn(currentOrder) &&
          <Button
            size="sm"
            onPress={this.openReceipt}
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
  };

  renderRateBtn = () => (
    <TouchableWithoutFeedback onPress={this.goToRateDriver}>
      <View style={[orderPanelStyles.roundContainer, orderPanelStyles.rateButton]}>
        <Icon name="starEmpty" color={color.white} size={20} strokeWidth="2.5" />
      </View>
    </TouchableWithoutFeedback>
  );

  renderCallBtn = () => {
    const { booking: { currentOrder } } = this.props;
    const { driverDetails: driver } = currentOrder;
    const isDriverPhoneExist = driver && driver.info && driver.info.phoneNumber;
    return (isDriverPhoneExist &&
      <TouchableWithoutFeedback onPress={this.callDriver}>
        <View style={[orderPanelStyles.roundContainer, orderPanelStyles.callButton]}>
          <Icon name="call" color={color.white} size={18} />
        </View>
      </TouchableWithoutFeedback>
    );
  };

  renderDriver = () => {
    const { booking: { currentOrder }, theme } = this.props;
    const { driverDetails: driver } = currentOrder;

    return (
      <View style={orderPanelStyles.driverContainer}>
        {driver.info.imageUrl
          ? <Image
            source={{ uri: driver.info.imageUrl }}
            style={orderPanelStyles.roundContainer}
            resizeMode="contain"
          />
          : <Icon name={OTcars.includes(currentOrder.vehicleType) ? 'OT' : 'Gett'} size={46} />
        }

        <View style={orderPanelStyles.titleContainer}>
          <Text style={orderPanelStyles.driverCarInfo} numberOfLines={2}>
            {driver.info.vehicle && driver.info.vehicle.color} {driver.info.vehicle && driver.info.vehicle.model}
          </Text>
          <Text style={[orderPanelStyles.driverLicense, { color: theme.color.primaryText }]} numberOfLines={1}>
            {strings('order.label.carReg')}: {driver.info.vehicle && driver.info.vehicle.licensePlate}
          </Text>
        </View>

        {(COMPLETED_STATUSES.includes(currentOrder.status) || currentOrder.status === IN_PROGRESS_STATUS)
          ? this.renderRateBtn()
          : !FINAL_STATUSES.includes(currentOrder.status) && this.renderCallBtn()
        }
      </View>
    );
  };

  renderActiveItem = () => {
    const { visible, theme, booking: { currentOrder } } = this.props;
    const { driverDetails: driver } = currentOrder;
    const isDriverExist = driver && driver.info && !!driver.info.name;

    return (
      <View style={orderPanelStyles.activeContainer}>
        <View style={[
          orderPanelStyles.listItem,
          orderPanelStyles.activeItem,
          { height: isDriverExist ? 108 : 'auto', backgroundColor: theme.color.bgPrimary }
        ]}>
          <Icon
            style={!visible ? { transform: [{ rotate: '180deg' }] } : {}}
            name="arrowDown"
            color={theme.color.pixelLine}
            width={34}
          />

          {isDriverExist && this.renderDriver()}
        </View>
      </View>
    );
  };

  renderContent() {
    const {
      app: { statuses: { params: { connectBar } } }, booking: { currentOrder }, visible, onActivate, onClose
    } = this.props;
    const { driverDetails: driver } = currentOrder;
    const connectBarTop = getHeight(connectBar) > 0 ? (getHeight(connectBar) - topIPhone) : 0;
    const isDriverExist = driver && driver.info && !!driver.info.name;

    return (
      <SlidingUpPanel
        visible
        showBackdrop={false}
        draggableRange={{
          top: height - 60 - (70 + topIPhone),
          bottom: (isDriverExist ? 128 : 59) + bottomIPhone + connectBarTop
        }}
        height={isDriverExist ? 120 : 54}
        backdropComponent={this.renderBackdropComponent()}
        header={this.renderHeader()}
        closeButton={<Icon name="arrow" />}
        onActivate={onActivate}
        onClose={onClose}
        opened={visible}
      >
        {this.renderActiveItem()}
      </SlidingUpPanel>
    );
  }

  render() {
    return super.render(this.renderContent);
  }
}

OrderDetails.propTypes = {
  navigation: PropTypes.object,
  visible: PropTypes.bool,
  onActivate: PropTypes.func,
  onClose: PropTypes.func
};

OrderDetails.defaultProps = {
  visible: false,
  onActivate: () => {},
  onClose: () => {}
};

const mapState = ({ app, session, booking, passenger }) => ({
  app,
  session,
  booking,
  passenger
});

const bindActions = {
  onLayoutPointList,
  changeFields,
  changeAddress,
  getVehicles,
  createBooking,
  getPassengerData,
  setReferenceErrors,
  validateReferences,
  saveFlight,
  saveAvailableCarsScroll,
  updateBooking
};

export default connect(mapState, bindActions)(withTheme(OrderDetails));
