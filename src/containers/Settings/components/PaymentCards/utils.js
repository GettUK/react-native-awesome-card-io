import { capitalize, split } from 'lodash';
import { strings } from 'locales';

import assets from 'assets';

export const getValue = value => value || '';

export const extractedDate = (formatted) => {
  const splited = split(formatted, ' / ', 2);

  return { month: getValue(splited[0]), year: getValue(splited[1]) };
};

export const helpInfo = {
  cvv: {
    label: strings('settings.payment.cvv'),
    text: 'A three-digit code on your credit card, you can find this on the back of your card.',
    image: assets.cvv
  },
  expirationDate: {
    label: strings('settings.payment.expirationDate'),
    text: 'You should be able to find this date on the front of your card, under the card number',
    image: assets.expirationDate
  }
};

export const prepareCardDeails = (data = {}) => (
  [
    {
      label: strings('settings.payment.cardType'),
      text: getValue(data.kind)
    },
    {
      label: strings('settings.payment.cardNumber'),
      text: `**** **** **** ${getValue(data.last4)}`
    },
    {
      label: strings('settings.payment.expirationDate'),
      text: `${getValue(data.expirationMonth)} / ${getValue(data.expirationYear)}`
    },
    {
      label: strings('settings.payment.cardHolder'),
      text: getValue(data.holderName)
    }
  ]
);
export const prepareCardEditor = (data = {}, handlers = {}) => (
  [
    {
      label: strings('settings.payment.cardType'),
      text: capitalize(data.kind),
      onPress: handlers.goToPaymentCardTypes
    }
  ]
);
export const prepareCardEditorInputs = (data = {}, handlers = {}) => (
  [
    {
      allowmask: true,
      label: strings('settings.payment.cardNumber'),
      value: getValue(data.cardNumber),
      onChangeText: handlers.handleMaskInputChange('cardNumber'),
      mask: '[0000000000000999999]',
      keyboardType: 'numeric',
      error: data.error && data.error.cardNumber
    },
    {
      allowmask: true,
      label: strings('settings.payment.expirationDate'),
      value: (data.expirationMonth && data.expirationYear &&
          `${data.expirationMonth}${data.expirationYear}`) || '',
      onChangeText: handlers.handleExpirationDate,
      mask: '[00] / [0000]',
      allowHelp: true,
      helpPress: () => handlers.onHelpPress('expirationDate'),
      keyboardType: 'numeric',
      placeholder: strings('settings.payment.expirationDateFormat'),
      placeholderTextColor: '#8e8e93',
      error: data.error && (data.error.expirationMonth || data.error.expirationYear || data.error.expirationDate)
    },
    {
      allowmask: true,
      label: strings('settings.payment.cvv'),
      value: getValue(data.cvv),
      onChangeText: handlers.handleMaskInputChange('cvv'),
      mask: '[0009]',
      allowHelp: true,
      helpPress: () => handlers.onHelpPress('cvv'),
      keyboardType: 'numeric',
      error: data.error && data.error.cvv
    },
    {
      label: strings('settings.payment.cardHolder'),
      value: getValue(data.holderName),
      onChangeText: handlers.handleInputChange('holderName'),
      error: data.error && data.error.holderName
    }
  ]
);

export const cardTypes = [
  {
    id: 1,
    name: 'personal'
  },
  {
    id: 2,
    name: 'business'
  }
];

const presence = {
  message: strings('settings.validation.common')
};

export const validationRules = {
  cardNumber: {
    presence,
    length: {
      minimum: 13,
      maximum: 19,
      message: strings('settings.validation.cardNumber.length')
    }
  },
  expirationMonth: {
    presence,
    numericality: { onlyInteger: true, greaterThanOrEqualTo: 1, lessThanOrEqualTo: 12 }
  },
  expirationYear: {
    presence,
    length: {
      is: 4,
      message: strings('settings.validation.expirationYear.length')
    }
  },
  expirationDate: {
    presence,
    expired: {}
  },
  cvv: {
    presence,
    length: {
      minimum: 3,
      maximum: 4,
      message: strings('settings.validation.cvv.length')
    }
  },
  holderName: {
    presence,
    format: {
      pattern: '[a-z ]+',
      flags: 'i',
      message: strings('settings.validation.cardHolder.format')
    }
  }
};
