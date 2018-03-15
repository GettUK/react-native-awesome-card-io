import React from 'react';
import { View, Text, Dimensions, Image, TouchableWithoutFeedback } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import assets from 'assets';

import { Icon, PointList, JourneyDetails, CarItem } from 'components';

import { vehiclesData } from 'containers/shared/bookings/data';

import SlidingUpPanel from './SlidingUpPanel';

import { orderPanelStyles } from './styles';

const OrderDetails = ({ map, vehicles, visible, onActivate, onClose }) => {
  const height = Dimensions.get('window').height;

  renderHeader = () => {
    return (
      <Text style={orderPanelStyles.header}>Order Details</Text>
    );
  }

  renderCloseButton = () => {
    return <Icon name='arrow' />
  }

  renderJourneyDetails = () => {
    return (<View key='journey' style={orderPanelStyles.activeContainer}>
        <JourneyDetails
          loading={vehicles.loading}
          time={vehicles.duration}
          distance={vehicles.distance}
        />
      </View>
    );
  }

  renderCarItem = () => {
    const { vehicleName } = map.fields;
    const vehicleData = vehiclesData[vehicleName] || { label: 'Unknown' };

    const vehicle = vehicles.data.find(item => item.name === vehicleName) || {};

    return (<View key='car' style={orderPanelStyles.activeContainer}>
        <View style={[orderPanelStyles.listItem, orderPanelStyles.listContainer, orderPanelStyles.row]}>
          <Text style={[orderPanelStyles.title, { width: 100 }]}>
            {vehicleData.label}
          </Text>

          <Image
            style={{ width: 90 }}
            source={assets.carTypes[vehicleData.name]}
            resizeMode='contain'
          />

          <Text style={[orderPanelStyles.name, { width: 100, textAlign: 'right' }]}>
            {vehicle.price ? `£${vehicle.price}` : 'By meter'}
          </Text>
        </View>
      </View>
    );
  }

  renderOption = ({ icon, title, value, onPress }) => {
    return (<View key={title} style={orderPanelStyles.activeContainer}>
      <TouchableWithoutFeedback onPress={onPress}>
        <View style={[orderPanelStyles.listItem, orderPanelStyles.row, { paddingVertical: 10 }]}>
          <Icon name='pickUpField' color='#c6c5cd' />

          <View style={orderPanelStyles.titleContainer}>
            <Text style={orderPanelStyles.title}>{title}</Text>
            <Text style={orderPanelStyles.name}>{value}</Text>
          </View>

          <Icon name='chevron' color='#c6c5cd' width={10} />
        </View>
      </TouchableWithoutFeedback>
    </View>)
  }

  renderDriverRating = () => {
    return (
      <View style={orderPanelStyles.activeContainer}>
        <View style={[orderPanelStyles.listItem, orderPanelStyles.row]}>
          <View>
            <Text style={orderPanelStyles.title}>Driver</Text>
            <Text style={orderPanelStyles.name}>Kevin Willis</Text>
          </View>

          <View style={orderPanelStyles.rating}>
            <Text style={orderPanelStyles.ratingLabel}>4.4</Text>
          </View>
        </View>
      </View>
    );
  }

  renderBackdropComponent = () => {
    const options = [
      { title: 'Order for', value: 'Artem Korenev' },
      { title: 'Future order', value: '2 Feb 2018 02:34 pm' },
      { title: 'Message for driver', value: 'I would like to have a seat belt on back seat' },
      { title: 'Trip reason', value: 'Work' }
    ];

    return (
      <View style={{ paddingBottom: 120 }}>
        {renderDriverRating()}

        <View style={orderPanelStyles.activeContainer}>
          <PointList
            style={orderPanelStyles.pickUpBtn}
            data={{ ...map.fields }}
          />
        </View>

        {renderJourneyDetails()}
        {renderCarItem()}

        {options.map(renderOption)}
      </View>
    );
  }

  renderActiveItem = () => {
    return (
      <View style={orderPanelStyles.activeContainer}>
        <View style={[orderPanelStyles.listItem, orderPanelStyles.activeItem]}>
          <Icon
            style={!visible ? { transform: [{ rotate: '180deg' }] } : {}}
            name='arrowDown'
            color='#c6c5cd'
            width={34}
          />

          <View style={orderPanelStyles.driverContainer}>
            <Image source={assets.aupairLarge} style={orderPanelStyles.roundContainer} resizeMode='contain' />

            <View style={orderPanelStyles.titleContainer}>
              <Text style={orderPanelStyles.driverTitle} numberOfLines={1}>
                Mersedes-Benz E200
              </Text>
              <Text style={orderPanelStyles.driverSubtitle} numberOfLines={1}>
                Black color, BD 51 SMR
              </Text>
            </View>

            <View style={[orderPanelStyles.roundContainer, orderPanelStyles.callButton]}>
              <Icon name='phone' color='#fff' />
            </View>
          </View>
        </View>
      </View>
    );
  }

  return (
    <SlidingUpPanel
      visible
      showBackdrop = {false}
      draggableRange = {{
        top: height - 60 - 60,
        bottom: 148
      }}
      height = {116}
      backdropComponent={renderBackdropComponent()}
      header={renderHeader()}
      closeButton={<Icon name='arrow' />}
      onActivate = {onActivate}
      onClose = {onClose}
    >
      {renderActiveItem()}
    </SlidingUpPanel>
  );
};

OrderDetails.propTypes = {
  visible: PropTypes.bool,
  onActivate: PropTypes.func,
  onClose: PropTypes.func
};

OrderDetails.defaultProps = {
  visible: false,
  onActivate: () => {},
  onClose: () => {}
};

const mapState = ({ ui, bookings }) => ({
  map: ui.map,
  vehicles: bookings.formData.vehicles
});

export default connect(mapState)(OrderDetails);
