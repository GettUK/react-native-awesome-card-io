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

  if (addresses.length) {
    addresses.forEach((item) => {
      if (item && item[`${type}Message`]) {
        message = `${messagePrefixes[type]} ${item[`${type}Message`]}`;
      }
    });
  }

  return message;
};

export const formatMessage = message => (
  message.pickupMessage && message.destinationMessage
    ? `${message.pickupMessage}\n${message.destinationMessage}`
    : message.pickupMessage || message.destinationMessage
);
