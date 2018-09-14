import React from 'react';
import PropTypes from 'prop-types';
import { ScrollView, StyleSheet } from 'react-native';

import { CarItem } from 'components';
import { vehiclesData } from 'containers/shared/bookings/data';

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
    paddingTop: 5
  }
});

const AvailableCars = ({ availableVehicles, onCarSelect, booking, onScroll, scrollRef }) => (
  <ScrollView
    horizontal
    contentContainerStyle={styles.container}
    showsHorizontalScrollIndicator={false}
    onScroll={onScroll}
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
            localPrice={vehicle.localPrice}
            localCurrencySymbol={vehicle.localCurrencySymbol}
            serviceType={vehicle.serviceType}
            active={vehicle.name === (booking.vehicleName ? booking.vehicleName : booking.vehicleType)}
            isETADisabled={booking.scheduledType === 'later' || !booking.asap}
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
