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
    label: strings('paymentCard.label.cvv'),
    text: strings('paymentCard.text.cvv'),
    image: assets.cvv
  },
  expirationDate: {
    label: strings('paymentCard.label.expirationDate'),
    text: strings('paymentCard.text.expirationDate'),
    image: assets.expirationDate
  }
};

export const prepareCardDeails = (data = {}) => (
  [
    {
      label: strings('paymentCard.label.cardType'),
      text: getValue(data.kind)
    },
    {
      label: strings('paymentCard.label.cardNumber'),
      text: `**** **** **** ${getValue(data.last4)}`
    },
    {
      label: strings('paymentCard.label.expirationDate'),
      text: `${getValue(data.expirationMonth)} / ${getValue(data.expirationYear)}`
    },
    {
      label: strings('paymentCard.label.cardHolder'),
      text: getValue(data.holderName)
    }
  ]
);
export const prepareCardEditor = (data = {}, handlers = {}) => (
  [
    {
      label: strings('paymentCard.label.cardType'),
      text: capitalize(data.kind),
      onPress: handlers.goToPaymentCardTypes
    }
  ]
);
export const prepareCardEditorInputs = (data = {}, handlers = {}) => (
  [
    {
      allowmask: true,
      label: strings('paymentCard.label.cardNumber'),
      value: getValue(data.cardNumber),
      onChangeText: handlers.handleMaskInputChange('cardNumber'),
      mask: '[0000000000000999999]',
      keyboardType: 'numeric',
      error: data.error && data.error.cardNumber
    },
    {
      allowmask: true,
      label: strings('paymentCard.label.expirationDate'),
      value: (data.expirationMonthText && data.expirationYear &&
          `${data.expirationMonthText}${data.expirationYear}`) || '',
      onChangeText: handlers.handleExpirationDate,
      mask: '[00] / [0000]',
      allowHelp: true,
      helpPress: () => handlers.onHelpPress('expirationDate'),
      keyboardType: 'numeric',
      placeholder: strings('paymentCard.placeholder.expirationDateFormat'),
      placeholderTextColor: '#8e8e93',
      error: data.error && (data.error.expirationMonth || data.error.expirationYear || data.error.expirationDate)
    },
    {
      allowmask: true,
      label: strings('paymentCard.label.cvv'),
      value: getValue(data.cvv),
      onChangeText: handlers.handleMaskInputChange('cvv'),
      mask: '[0009]',
      allowHelp: true,
      helpPress: () => handlers.onHelpPress('cvv'),
      keyboardType: 'numeric',
      error: data.error && data.error.cvv
    },
    {
      label: strings('paymentCard.label.cardHolder'),
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
  message: strings('fieldValidation.common')
};

export const validationRules = {
  cardNumber: {
    presence,
    length: {
      minimum: 13,
      maximum: 19,
      message: strings('fieldValidation.cardNumber.length')
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
      message: strings('fieldValidation.expirationYear.length')
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
      message: strings('fieldValidation.cvv.length')
    }
  },
  holderName: {
    presence,
    format: {
      pattern: '[a-z ]+',
      flags: 'i',
      message: strings('fieldValidation.cardHolder.format')
    }
  }
};
