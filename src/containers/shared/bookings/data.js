import { find, keyBy, without } from 'lodash';

// Payment Types, available for booking in 'app' realm. Array to ensure order
export const paymentTypes = [
  'account',
  'company_payment_card',
  'passenger_payment_card',
  'cash'
];

export const paymentTypeLabels = {
  'passenger_payment_card': 'Passenger\'s card',
  'personal_payment_card': 'Passenger\'s Personal card',
  'business_payment_card': 'Passenger\'s Business card',
  'account': 'Account',
  'cash': 'Cash',
  'company_payment_card': 'Company Payment Card'
};

export function selectedPaymentType({ passenger, paymentTypes, defaultPaymentType } = {}) {
  if ((defaultPaymentType === 'passenger_payment_card') && passenger) {
    const cards = passenger.paymentCards;

    if (cards && cards.length > 0) {
      const card = find(cards, 'default') || cards[0];
      return `${card.type}_payment_card:${card.id}`;
    }
  }

  // if there is no passenger selected, pre-populate with one of the available
  // payment types, even if default payment type for company is `passenger_payment_card`.
  const availableType = without(paymentTypes, 'passenger_payment_card')[0];
  return defaultPaymentType === 'passenger_payment_card' ? availableType : defaultPaymentType;
}

export function isCashAllowed(vehicleName) {
  return ['BlackTaxi', 'BlackTaxiXL', 'OTBlackTaxi', 'OTBlackTaxiXL'].includes(vehicleName);
}

export function paymentTypeToAttrs(value) {
  // a value of form 'personal_payment_card:13' represents a payment method 'personal_payment_card'
  // with a payment card with id 13
  const match = value && value.match(/^((?:personal|business)_payment_card):(\d+)$/);

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
}];

export const vehiclesData = keyBy(allVehicles, 'name');
