export default function getPassengerPayload(data, memberId) {
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
}
