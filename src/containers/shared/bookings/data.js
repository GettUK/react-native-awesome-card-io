import { find, keyBy, without } from 'lodash';

// Payment Types, available for booking in 'app' realm. Array to ensure order
export const paymentTypes = [
  'account',
  'company_payment_card',
  'passenger_payment_card',
  'cash'
];

export const paymentTypeLabels = {
  passenger_payment_card: 'Passenger\'s card',
  personal_payment_card: 'Passenger\'s Personal card',
  business_payment_card: 'Passenger\'s Business card',
  account: 'Account',
  cash: 'Cash',
  company_payment_card: 'Company Payment Card'
};

export function preparePaymentLabel({ payment, cards }) {
  let label = paymentTypeLabels[payment];

  if (payment.includes('payment_card')) {
    const currentCard = find(cards, 'default') || cards[0];

    label = `${label} ends with ${currentCard.last4}`;
  }

  return label;
}

export function preparePaymentType({ payment, cards }) {
  const card = find(cards, 'default') || cards[0];
  return payment.includes('payment_card')
    ? `${payment}${card ? `:${card.id}` : ''}`
    : payment;
}

export function isCashAllowed(vehicleName) {
  return ['BlackTaxi', 'BlackTaxiXL', 'OTBlackTaxi', 'OTBlackTaxiXL'].includes(vehicleName);
}

export function paymentTypeToAttrs(value) {
  // a value of form 'personal_payment_card:13' represents a payment method 'personal_payment_card'
  // with a payment card with id 13
  const match = value && value.match(/^((?:personal|business|passenger)_payment_card):(\d+)$/);

  if (match) {
    const [paymentMethod, paymentCardId] = match.slice(1);

    return { paymentType: value, paymentMethod, paymentCardId: +paymentCardId };
  } else if (value) {
    return { paymentType: value, paymentMethod: value, paymentCardId: null };
  }

  return { paymentType: null, paymentMethod: null, paymentCardId: null };
}

export const vehicleEditableStatuses = ['order_received'];

export const allVehicles = [{
  name: 'Standard',
  label: 'Standard'
}, {
  name: 'BlackTaxi',
  label: 'Black Taxi'
}, {
  name: 'OTBlackTaxi',
  label: 'Black Taxi'
}, {
  name: 'BlackTaxiXL',
  label: 'Black Taxi XL'
}, {
  name: 'OTBlackTaxiXL',
  label: 'Black Taxi XL'
}, {
  name: 'Exec',
  label: 'Executive'
}, {
  name: 'MPV',
  label: 'People Carrier'
}, {
  name: 'Courier',
  label: 'Courier'
}, {
  name: 'Special',
  label: 'Special'
}, {
  name: 'Porsche',
  label: 'Porsche'
}];

export const vehiclesData = keyBy(allVehicles, 'name');
