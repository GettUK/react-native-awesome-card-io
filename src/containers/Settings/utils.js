import { Linking } from 'react-native';

import { strings } from 'locales';

import { vehiclesData } from 'containers/shared/bookings/data';

import styles from './style';

function prepareName({ firstName = '', lastName = '' }) {
  return `${firstName} ${lastName}`;
}

export function prepareInitials({ firstName = '', lastName = '' }) {
  return `${(firstName).charAt(0)}${(lastName).charAt(0)}`.toUpperCase();
}

export function prepareProfileBlock(data = {}, handlers = {}) {
  const { passenger } = data;
  return [
    {
      title: prepareName(passenger),
      avatar: passenger.avatar || passenger.avatarUrl || null,
      titleAvatar: prepareInitials(passenger),
      onPress: handlers.goToEditProfile
    },
    {
      title: strings('settings.label.phone'),
      rightTitle: passenger.phone || '',
      onPress: handlers.goToPhoneEditor
    },
    {
      title: strings('settings.label.email'),
      rightTitle: passenger.email || '',
      onPress: handlers.goToEmailEditor
    },
    {
      title: strings('settings.label.cartype'),
      rightTitle: passenger.defaultVehicle ? vehiclesData[passenger.defaultVehicle].label : strings('settings.none'),
      onPress: handlers.goToCarTypesEditor
    }
  ];
}

export function prepareAddressesBlock(data = {}, handlers = {}) {
  const { passenger } = data;

  return [
    {
      leftIconName: 'home',
      title: strings('label.home'),
      rightTitle: (passenger.homeAddress && passenger.homeAddress.line) || strings('settings.none'),
      onPress: () => handlers.openAddressModal('home')
    },
    {
      leftIconName: 'work',
      title: strings('label.work'),
      rightTitle: (passenger.workAddress && passenger.workAddress.line) || strings('settings.none'),
      onPress: () => handlers.openAddressModal('work')
    },
    {
      title: strings('settings.label.addresses'),
      onPress: handlers.goToAddressesList
    }
  ];
}

export function prepareSwitchersBlock(data = {}, handlers = {}) {
  const { passenger } = data;

  return [
    {
      leftIconName: 'email',
      title: strings('settings.label.email'),
      switchButton: true,
      switched: passenger.notifyWithEmail || false,
      onSwitch: v => handlers.handleToggleChange('notifyWithEmail', v)
    },
    {
      leftIconName: 'sms',
      title: strings('settings.label.sms'),
      switchButton: true,
      switched: passenger.notifyWithSms || false,
      onSwitch: v => handlers.handleToggleChange('notifyWithSms', v)
    },
    {
      leftIconName: 'push',
      title: strings('settings.label.notification'),
      switchButton: true,
      switched: passenger.notifyWithPush || false,
      onSwitch: v => handlers.handleToggleChange('notifyWithPush', v)
    },
    {
      leftIconName: 'calendar',
      title: strings('settings.label.invites'),
      switchButton: true,
      switched: passenger.notifyWithCalendarEvent || false,
      onSwitch: v => handlers.handleToggleChange('notifyWithCalendarEvent', v)
    },
    {
      leftIconName: 'wheelchair',
      title: strings('settings.label.wheelchair'),
      switchButton: true,
      switched: passenger.wheelchairUser || false,
      onSwitch: v => handlers.handleToggleChange('wheelchairUser', v)
    }
  ];
}

export function prepareHistoryBlock(_, handlers = {}) {
  return [
    {
      title: strings('settings.label.payments'),
      onPress: handlers.goToMyPayments
    },
    {
      title: strings('settings.label.rides'),
      onPress: handlers.goToMyRides
    }
  ];
}

export function prepareInfoBlock({ customerServicePhone }, handlers = {}) {
  return [
    {
      title: strings('settings.label.privacy'),
      onPress: () => handlers.goToInfoPage('privacy')
    },
    {
      title: strings('settings.label.terms'),
      onPress: () => handlers.goToInfoPage('terms')
    },
    {
      title: strings('settings.label.contactUs'),
      onPress: () => Linking.openURL(`tel:${customerServicePhone}`)
    }
  ];
}

export function prepareLogoutBlock({ isLoading = false }, handlers = {}) {
  return [
    {
      title: strings('settings.label.logout'),
      onPress: handlers.onLogout,
      isLoading,
      showRightIcon: false,
      titleStyle: styles.listLabelCentered
    }
  ];
}

export const emptyAddress = {
  line: '',
  lat: 0,
  lng: 0,
  postalCode: '',
  countryCode: '',
  timezone: '',
  city: ''
};

export const emptyFavouriteAddress = {
  name: '',
  pickupMessage: '',
  destinationMessage: '',
  address: emptyAddress
};

const validateName = {
  presence: {
    allowEmpty: false
  },
  length: {
    maximum: 30,
    message: strings('validation.name.length')
  }
};

export const validationRules = {
  firstName: validateName,
  lastName: validateName,
  email: {
    presence: {
      allowEmpty: false
    },
    email: {
      message: strings('validation.email.format')
    }
  },
  phone: {
    presence: {
      allowEmpty: false
    },
    length: {
      is: 10,
      message: strings('validation.phone.length')
    }
  }
};

export const addressValidationRules = {
  name: {
    presence: { allowEmpty: false },
    length: { maximum: 32 }
  },
  'address.line': { presence: { allowEmpty: false } },
  'address.lat': { presence: { allowEmpty: false, message: 'Address not found. Please check the address entered.' } },
  'address.countryCode': {
    presence: { allowEmpty: false, message: 'Sorry, this address is not supported by our system' }
  },
  pickupMessage: { length: { maximum: 100 } },
  destinationMessage: { length: { maximum: 100 } }
};
