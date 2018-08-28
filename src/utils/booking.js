export const getPassengerPayload = (data, memberId) => {
  const { passenger: dataPassenger, passengers } = data;
  const passenger = dataPassenger || (memberId && passengers.find(passenger => passenger.id === memberId));

  if (passenger) {
    const { id, firstName, lastName, phone, costCentre } = passenger;

    return {
      passengerId: id,
      passengerName: `${firstName} ${lastName}`,
      passengerPhone: phone,
      costCentre
    };
  }

  return {};
};

export const messagePrefixes = {
  pickup: 'Pick up:',
  destination: 'Destination:'
};

export const separateMessage = (messageToDriver) => {
  let messages = [];

  if (messageToDriver) {
    messages = messageToDriver.split(/\n|\r/g);
  }

  const pickupMessage = messages.find(message => message.startsWith(messagePrefixes.pickup)) || '';
  const destinationMessage = messages.find(message => message.startsWith(messagePrefixes.destination)) || '';

  return {
    pickupMessage,
    destinationMessage
  };
};

export const getFavouriteAddressMessage = (addresses, type) => {
  let message = '';

  if (addresses && addresses[`${type}Message`]) {
    message = `${messagePrefixes[type]} ${addresses[`${type}Message`]}`;
  }

  return message;
};

export const formatMessage = message => (
  message.pickupMessage && message.destinationMessage
    ? `${message.pickupMessage}\n${message.destinationMessage}`
    : message.pickupMessage || message.destinationMessage
);

export const bookingFieldsToReset = [
  'stops', 'destinationAddress',
  'vehiclePrice', 'vehicleValue', 'vehicleName',
  'travelReasonId', 'flight',
  'id', 'status', 'internationalFlag', 'specialRequirements',
  'vehicleVendorId', 'serviceType', 'messageToDriver', 'schedule'
];

export const isEnoughOrderData = bookingForm =>
  bookingForm.pickupAddress && bookingForm.pickupAddress.countryCode &&
  bookingForm.destinationAddress && bookingForm.destinationAddress.countryCode &&
  !!bookingForm.passengerId;

export const getStopPoints = bookingForm => (bookingForm.stops
  ? bookingForm.stops.map(stop => ({
    address: stop,
    name: bookingForm.passengerName,
    passengerId: bookingForm.passengerId,
    phone: bookingForm.passengerPhone
  }))
  : null);
