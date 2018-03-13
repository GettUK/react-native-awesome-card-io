import { strings } from 'locales';

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
      onPress: handlers.goToEditProfile,
    },
    {
      title: strings('settings.label.phone'),
      rightTitle: passenger.phone || ''
    },
    {
      title: strings('settings.label.email'),
      rightTitle: passenger.email || ''
    },
    {
      title: strings('settings.label.cartype'),
      rightTitle: passenger.defaultVehicle || strings('settings.none')
    }
  ];
}

export function prepareAddressesBlock(data = {}, handlers = {}) {
  const { passenger } = data;

  return [
    {
      leftIconName: 'home',
      title: strings('label.home'),
      rightTitle: passenger.homeAddress && passenger.homeAddress.line || strings('settings.none'),
      onPress: () => handlers.goToAddressEditor('home')
    },
    {
      leftIconName: 'work',
      title: strings('label.work'),
      rightTitle: passenger.workAddress && passenger.workAddress.line || strings('settings.none'),
      onPress: () => handlers.goToAddressEditor('work')
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
      switched: passenger.notifyWithEmail || false
    },
    {
      leftIconName: 'sms',
      title: strings('settings.label.sms'),
      switchButton: true,
      switched: passenger.notifyWithSms || false
    },
    {
      leftIconName: 'push',
      title: strings('settings.label.notification'),
      switchButton: true
    },
    {
      leftIconName: 'calendar',
      title: strings('settings.label.invites'),
      switchButton: true,
      switched: passenger.notifyWithCalendarEvent || false
    },
    {
      leftIconName: 'wheelchair',
      title: strings('settings.label.wheelchair'),
      switchButton: true,
      switched: passenger.wheelchairUser || false
    }
  ];
}

export function prepareHistoryBlock(data = {}, handlers = {}) {
  return [
    {
      title: strings('settings.label.payments')
    },
    {
      title: strings('settings.label.rides')
    }
  ];
}

export function prepareInfoBlock(data = {}, handlers = {}) {
  return [
    {
      title: strings('settings.label.privacy')
    },
    {
      title: strings('settings.label.terms')
    },
    {
      title: strings('settings.label.faqs')
    },
    {
      title: strings('settings.label.locationInfo')
    }
  ];
}

export function prepareLogoutBlock(data = {}, handlers = {}) {
  return [
    {
      title: strings('settings.label.logout'),
      onPress: handlers.onLogout,
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
