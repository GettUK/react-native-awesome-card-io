import React from 'react';
import PropTypes from 'prop-types';
import { ScrollView, StyleSheet } from 'react-native';

import { CarItem } from 'components';
import { vehiclesData } from 'containers/shared/bookings/data';

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12
  }
});

const AvailableCars = ({ availableVehicles, onCarSelect, booking, onScroll, scrollRef, onContentSizeChange }) => (
  <ScrollView
    horizontal
    contentContainerStyle={styles.container}
    showsHorizontalScrollIndicator={false}
    onScroll={onScroll}
    onContentSizeChange={onContentSizeChange}
    scrollEventThrottle={200}
    ref={scrollRef}
  >
    {
      availableVehicles.map((vehicle) => {
        const vehicleData = vehiclesData[vehicle.name] || { label: 'Unknown' };
        return (
          <CarItem
            onChange={onCarSelect}
            key={vehicle.name}
            name={vehicle.name}
            eta={vehicle.eta}
            label={vehicleData.label}
            price={vehicle.price}
            serviceType={vehicle.serviceType}
            active={vehicle.name === booking.vehicleName}
            isETADisabled={booking.scheduledType === 'later'}
          />
        );
      })
    }
  </ScrollView>
);

AvailableCars.propTypes = {
  availableVehicles: PropTypes.array,
  onCarSelect: PropTypes.func,
  booking: PropTypes.object
};

export default AvailableCars;
