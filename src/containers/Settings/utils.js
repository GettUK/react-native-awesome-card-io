import { strings } from 'locales';

import styles from './style';

function prepareName({ firstName = '', lastName = '' }) {
  return `${firstName} ${lastName}`;
}

function prepareInitials({ firstName = '', lastName = '' }) {
  return `${(firstName).charAt(0)}${(lastName).charAt(0)}`.toUpperCase();
}

export function prepareProfileBlock(results = {}, handlers = {}) {
  return [
    {
      title: prepareName(results),
      avatar: results.avatarUrl || null,
      titleAvatar: prepareInitials(results)
    },
    {
      title: strings('settings.label.phone'),
      rightTitle: results.phone || ''
    },
    {
      title: strings('settings.label.email'),
      rightTitle: results.email || ''
    },
    {
      title: strings('settings.label.cartype'),
      rightTitle: results.defaultVehicle || strings('settings.none')
    }
  ];
}

export function prepareAddressesBlock(results = {}, handlers = {}) {
  return [
    {
      leftIconName: 'home',
      title: strings('label.home'),
      rightTitle: results.homeAddress && results.homeAddress.line || strings('settings.none')
    },
    {
      leftIconName: 'work',
      title: strings('label.work'),
      rightTitle: results.workAddress && results.workAddress.line || strings('settings.none')
    },
    {
      title: strings('settings.label.addresses')
    }
  ];
}

export function prepareSwitchersBlock(results = {}, handlers = {}) {
  return [
    {
      leftIconName: 'email',
      title: strings('settings.label.email'),
      switchButton: true,
      switched: results.notifyWithEmail || false
    },
    {
      leftIconName: 'sms',
      title: strings('settings.label.sms'),
      switchButton: true,
      switched: results.notifyWithSms || false
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
      switched: results.notifyWithCalendarEvent || false
    },
    {
      leftIconName: 'wheelchair',
      title: strings('settings.label.wheelchair'),
      switchButton: true,
      switched: results.wheelchairUser || false
    }
  ];
}

export function prepareHistoryBlock(results = {}, handlers = {}) {
  return [
    {
      title: strings('settings.label.payments')
    },
    {
      title: strings('settings.label.rides')
    }
  ];
}

export function prepareInfoBlock(results = {}, handlers = {}) {
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

export function prepareLogoutBlock(results = {}, handlers = {}) {
  return [
    {
      title: strings('settings.label.logout'),
      onPress: handlers.onLogout,
      showRightIcon: false,
      titleStyle: styles.listLabelCentered
    }
  ];
}
